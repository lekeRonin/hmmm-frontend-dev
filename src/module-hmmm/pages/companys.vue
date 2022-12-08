<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 卡片视图部分 -->
      <el-card class="box-card">
        <!-- 标签和输入框部分 -->
        <el-form ref="form" :model="queryInfo" label-width="80px">
          <!-- ------------------------------------------------------第一行-------------------------------------------------- -->
          <el-row>
            <!-- 标签名称部分 -->
            <el-col :span="6">
              <el-form-item label="标签名称" prop="tags">
                <el-input style="width: 100%" placeholder="请输入" v-model="queryInfo.tags"></el-input>
              </el-form-item>
            </el-col>
            <!-- 城市部分 -->
            <el-col :span="6">
              <el-form-item label="城市" prop="province">
                <el-select style="width: 100%;margin-right:4%" placeholder="请选择" v-model="queryInfo.province" @change="getCityInfo">
                  <el-option v-for="(item, index) in provinceOptions" :key="index" :label="item" :value="index"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 地区部分 -->
            <el-col :span="6">
              <el-form-item label="地区" prop="city">
                <el-select style="width: 100%" placeholder="请选择" v-model="queryInfo.city">
                  <el-option v-for="(item, index) in cityOptions" :key="index" :label="item" :value="index"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 企业简称 -->
            <el-col :span="6">
              <el-form-item label="企业简称" prop="shortName">
                <el-input style="width: 100%" placeholder="请输入" v-model="queryInfo.shortName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- ------------------------------------------------------第二行---------------------------------------------------- -->
          <el-row>
            <!-- 状态部分 -->
            <el-col :span="6">
              <el-form-item label="状态" prop="state">
                <el-select style="width: 100%" placeholder="请选择" v-model="queryInfo.state">
                  <el-option label="启用" :value="1"> </el-option>
                  <el-option label="禁止" :value="0"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 清除和搜索按钮 -->
            <el-col :span="6" style="padding-left:40px">
              <el-button size="small" @click="clearInfo">清除</el-button>
              <el-button size="small" type="primary" @click="searchInfo">搜索</el-button>
            </el-col>
            <!-- 新增用户按钮 -->
            <el-col :span="12" style="text-align:right">
              <el-button size="small" style="margin-left: 10px;" type="success" icon="el-icon-edit" @click="addUser">新增用户</el-button>
            </el-col>
          </el-row>
        </el-form>

        <!-- 消息文案部分 -->
        <el-alert :title="`共${counts}条数据`" type="info" show-icon :closable="false"> </el-alert>
        <!-- table表格部分 -->
        <el-table v-loading="loading" element-loading-text="给我一点时间" :data="companyTableData" stripe style="width: 100%">
          <el-table-column align="center" prop="id" label="序号"> </el-table-column>
          <el-table-column align="center" prop="number" label="企业编号"> </el-table-column>
          <el-table-column align="center" prop="shortName" label="企业简称"> </el-table-column>
          <el-table-column align="center" prop="tags" label="标签"> </el-table-column>
          <el-table-column align="center" prop="creatorID" label="创建者"> </el-table-column>
          <el-table-column align="center" prop="addDate" label="创建日期"> </el-table-column>
          <el-table-column align="center" prop="remarks" label="备注"> </el-table-column>
          <el-table-column align="center" prop="state" label="状态">
            <!-- "state === 1 ? ' 启用' : '状态 '" -->
            <template slot-scope="scope">
              {{ scope.row.state === 1 ? '启用' : '禁用' }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" >
            <template slot-scope="scope">
              <!-- 编辑按钮 -->
              <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row)"></el-button>
              <!-- 是否禁用按钮 -->
              <el-tooltip class="item" effect="dark" :content="scope.row.state === 1 ? '禁用' : '启用'" placement="top-start">
                <el-button
                  @click="changestatus(scope.row)"
                  plain
                  :type="scope.row.state === 1 ? 'warning' : 'success'"
                  :icon="scope.row.state === 1 ? 'el-icon-close' : 'el-icon-check'"
                  circle
                  size="mini"
                ></el-button>
              </el-tooltip>
              <!-- 删除按钮 -->
              <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="removeById(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页功能 -->
        <el-pagination
          style="text-align:right;margin-top:20px"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Number(page)"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="Number(pagesize)"
          layout="total,prev, pager, next, sizes,  jumper"
          :total="counts"
        >
        </el-pagination>
        <!-- 新增用户弹框 -->
        <el-dialog title="新增用户" :visible.sync="addDialogVisible" width="50%" @close="closeAdd">
          <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="120px" class="demo-ruleForm" style="width: 80%; margin-left: 10px;">
            <!-- 企业名称部分 -->
            <el-form-item label="企业名称" prop="shortName">
              <el-input v-model="addForm.shortName"></el-input>
            </el-form-item>
            <!-- 所属公司部分 -->
            <el-form-item label="所属公司" prop="company">
              <el-input v-model="addForm.company"></el-input>
              <p>https://www.tianyancha.com （在此可查询所属公司全称及简称）</p>
            </el-form-item>
            <!-- 城市地区部分 -->
            <el-form-item label="城市地区" prop="province">
              <!-- 城市 -->
              <el-select v-model="addForm.province" placeholder="请选择" @change="addgetCityInfoMessage" class="btnselete" style="width: 49%; margin-right: 10px;">
                <el-option v-for="(item, index) in provinceOptions" :key="index" :label="item" :value="index"> </el-option>
              </el-select>
              <!-- 地区 -->
              <el-select v-model="addForm.city" placeholder="请选择" @change="getAraeInfoMessage" style="width: 49%;">
                <el-option v-for="(item, index) in cityOptions" :key="index" :label="item" :value="index"> </el-option>
              </el-select>
            </el-form-item>
            <!-- 方向部分 -->
            <el-form-item label="方向(企业标签)" prop="tags">
              <el-input v-model="addForm.tags"></el-input>
            </el-form-item>
            <!-- 备注部分 -->
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="addForm.remarks"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button class="btnright" @click="addDialogVisible = false">取 消</el-button>
            <el-button class="btnright" type="primary" @click="addCompany">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
      <!-- 编辑弹框 -->
      <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="50%" @close="closeEdit">
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="120px" class="demo-ruleForm" style="width: 80%; margin-left: 10px;">
          <!-- 企业名称部分 -->
          <el-form-item label="企业名称" prop="shortName">
            <el-input v-model="editForm.shortName"></el-input>
          </el-form-item>
          <!-- 所属公司部分 -->
          <el-form-item label="所属公司" prop="company">
            <el-input v-model="editForm.company"></el-input>
            <p>https://www.tianyancha.com （在此可查询所属公司全称及简称）</p>
          </el-form-item>
          <!-- 城市地区部分 -->
          <el-form-item label="城市地区" prop="province">
            <!-- 城市 -->
            <el-select v-model="editForm.province" placeholder="请选择" style="width: 49%; margin-right: 10px;" @change="editgetCityInfoMessage">
              <el-option v-for="(item, index) in provinceOptions" :key="index" :label="item" :value="index"> </el-option>
            </el-select>
            <!-- 地区 -->
            <el-select v-model="editForm.city" placeholder="请选择" style="width: 49%;" @change="getAraeInfoMessage">
              <el-option v-for="(item, index) in cityOptions" :key="index" :label="item" :value="index"> </el-option>
            </el-select>
          </el-form-item>
          <!-- 方向部分 -->
          <el-form-item label="方向(企业标签)" prop="tags">
            <el-input v-model="editForm.tags"></el-input>
          </el-form-item>
          <!-- 备注部分 -->
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="editForm.remarks"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button class="btnright" @click="editDialogVisible = false">取 消</el-button>
          <el-button class="btnright" type="primary" @click="editCompany">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { list, add, detail, update, remove, disabled } from '@/api/hmmm/companys.js'
// 导入城市函数
import { provinces, citys } from '@/api/hmmm/citys.js'
export default {
  name: 'CompanysList',
  data () {
    return {
      loading: true,
      // 获取企业列表的请求参数
      queryInfo: {
        page: 1, // 当前页数
        pagesize: 10, // 页尺寸,每页显示多少数据
        tags: '',
        province: '',
        city: '',
        shortName: '',
        state: null
      },
      pagesize: '', // 页大小
      page: '', // 当前页码
      input: '',
      // 表格数据来源
      companyTableData: [],
      counts: 1, // 总条数
      provinceOptions: [], // 城市部分数据
      cityOptions: [], // 地区部分数据
      stateOptions: [],
      addDialogVisible: false, // 新增用户的显示与隐藏
      // 添加弹框的数据来源
      addForm: {
        isFamous: true,
        shortName: '',
        company: '',
        province: '',
        city: '',
        tags: '',
        remarks: ''
      },
      // 添加弹框的验证规则
      addFormRules: {
        shortName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        company: [{ required: true, message: '请输入所属公司', trigger: 'blur' }],
        province: [{ required: true, message: '请输入城市地区', trigger: 'blur' }],
        tags: [{ required: true, message: '请输入企业方向', trigger: 'blur' }],
        remarks: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      },
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        shortName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        company: [{ required: true, message: '请输入所属公司', trigger: 'blur' }],
        province: [{ required: true, message: '请输入城市地区', trigger: 'blur' }],
        tags: [{ required: true, message: '请输入企业方向', trigger: 'blur' }],
        remarks: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    // 获取企业权限列表
    this.getCompanysList()
    // 获取城市
    this.getprovinceList()
  },
  methods: {
    // 获取企业管理列表
    async getCompanysList () {
      try {
        const { data: res } = await list(this.queryInfo)
        // 赋值之前对时间进行处理
        res.items.forEach(item => {
          item.addDate = this.$dayjs(item.addDate).format('YYYY-MM-DD')
        })
        this.companyTableData = res.items
        this.counts = res.counts
        // console.log(res)
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    // 当前每页显示多少数据
    handleSizeChange (pagesize) {
      this.queryInfo.pagesize = pagesize
      this.getCompanysList()
    },
    // 当前多少页
    handleCurrentChange (page) {
      this.queryInfo.page = page
      this.getCompanysList()
    },

    // 获取城市
    getprovinceList () {
      this.provinceOptions = provinces()
      // console.log(this.provinceOptions)
    },

    // 城市选择框发生改变时触发,调用函数,获取城市所属地区
    getCityInfo (val) {
      // 获取当前城市city.
      const city = this.provinceOptions[this.queryInfo.province]
      // 在将city作为参数传递到函数citys当中,获取对应的地区
      this.cityOptions = citys(city)
      this.queryInfo.city = this.cityOptions[0]
      // console.log(this.cityOptions)
      // console.log(this.queryInfo.city)
    },

    // 点击清除
    clearInfo () {
      this.queryInfo.tags = ''
      this.queryInfo.province = ''
      this.queryInfo.city = ''
      this.queryInfo.shortName = ''
      this.queryInfo.state = null

      // 城市选择以后,点击清除,地区选择仍然可以修改,因为城市改变事件已经触发,地区选择里面已经有数据
      // 此时将地区绑定的数据清空即可
      this.cityOptions = []
      this.getCompanysList()
    },

    // 点击搜索
    searchInfo () {
      this.getCompanysList()
    },
    // 点击新增用户弹框出现
    addUser () {
      this.addDialogVisible = true
      this.cityOptions = []
      this.addForm.city = ''
    },

    // 城市框的change 事件 添加框的地区数据来源  添加和编辑绑定的同一个change事件,城市和地区联动
    addgetCityInfoMessage () {
      // 添加框
      // province 城市
      // city 地区
      const province = this.provinceOptions[this.addForm.province]
      this.cityOptions = citys(province) // 地区数组
      this.addForm.province = province // 城市
      this.addForm.city = this.cityOptions[0] // 地区第一项
      // console.log(this.cityOptions)
      // console.log(this.addForm.city)
    },
    // 地区的change事件
    getAraeInfoMessage () {
      this.addForm.city = this.cityOptions[this.addForm.city] // 地区
      // console.log(this.addForm.city)
      this.editForm.city = this.cityOptions[this.editForm.city] // 地区
      // console.log(this.editForm.city)
    },

    // 添加弹框的关闭事件,清除表单验证效果
    closeAdd () {
      this.$refs.addFormRef.resetFields()
      this.addForm.city = ' '
    },
    // 点击确认.确认添加
    addCompany () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        try {
          await add(this.addForm)
          // console.log(res)
          // 更新视图
          this.getCompanysList()
          this.$message.success('添加成功!')
        } catch (error) {
          this.$message.error('添加失败!')
        }
        // 关闭弹框
        this.addDialogVisible = false
      })
    },
    // 点击编辑.弹框出现,获取数据
    async showEditDialog (row) {
      this.editDialogVisible = true
      const { data: res } = await detail(row)
      this.editForm = res
      // console.log(this.editForm)
    },
    editgetCityInfoMessage () {
      // 编辑框
      const provinceedit = this.provinceOptions[this.editForm.province]
      this.cityOptions = citys(provinceedit)
      this.editForm.province = provinceedit // 城市
      this.editForm.city = this.cityOptions[0] // 地区
      // console.log(this.editForm.city)
    },
    // 编辑框的关闭事件
    closeEdit () {
      this.$refs.editFormRef.resetFields()
    },
    // 点击确认,确认修改
    async editCompany () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        try {
          this.editForm.isFamous = Boolean(this.editForm.isFamous)
          await update(this.editForm)
          // 更新视图
          this.getCompanysList()
          this.$message.success('更新成功')
          // console.log(res)
        } catch (error) {
          this.$message.error('更新失败!')
          // console.log(error)
        }
        this.editDialogVisible = false
      })
    },

    // 修改禁用状态
    async changestatus (row) {
      const confirmResult = await this.$confirm(`已成功${row.state === 1 ? '禁用' : '启用'}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('您取消了操作')
      }
      try {
        await disabled({
          id: row.id,
          state: row.state === 1 ? 0 : 1
        })
        row.state = row.state === 1 ? 0 : 1
        this.$message.success(`已成功${row.state == 1 ? '禁用' : '启用'}`)
      } catch (error) {
        this.$message('设置状态失败!')
      }
    },
    // 删除功能
    async removeById (row) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('您取消了操作')
      }
      try {
        await remove(row)
        this.getCompanysList()
        this.$message.success('删除成功!')
      } catch (error) {
        this.$message.error('删除失败!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-alert {
  margin: 20px 0;
}
.btnright {
  text-align: center;
}
</style>
