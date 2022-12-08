<template>
<<<<<<< HEAD
  <div class="container">
    <el-card>
      <!-- 顶部提示 -->

      <el-row>
        <el-col class="top_title">
          <span>说明：目前支持学科和关键字条件筛选</span>
          <el-button type="success" size="small" icon="el-icon-edit" @click="$router.push('new')">新增试题</el-button>
        </el-col>
      </el-row>
      <!-- 顶部提示 end -->
      <!-- 顶部搜索表单 -->
      <el-form ref="form" :model="query" label-width="80px">
        <el-row>
          <!-- 学科 -->
          <el-col :span="6">
            <el-form-item label="学科">
              <el-select style="width:100%;" v-model="query.subjectID" placeholder="请选择" @change="onSubjectChange">
                <el-option v-for="(item, index) in subjects" :key="index" :label="item.subjectName" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 目录 -->
          <el-col :span="6">
            <el-form-item label="目录">
              <el-select style="width:100%;" v-model="query.catalogID" placeholder="请选择" @change="onDirectoryChange">
                <el-option v-for="(item, index) in directory" :key="index" :label="item.directoryName" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 标签 -->
          <el-col :span="6">
            <el-form-item label="标签">
              <el-select style="width:100%;" v-model="query.tags" placeholder="请选择" @change="onDirectoryChange">
                <el-option v-for="(item, index) in tagList" :key="index" :label="item.tagName" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 关键字 -->
          <el-col :span="6">
            <el-form-item label="关键字">
              <el-input v-model="query.keyword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <!-- 试题类型 -->
          <el-col :span="6">
            <el-form-item label="试题类型">
              <el-select style="width:100%;" v-model="query.questionType" placeholder="请选择" @change="onDirectoryChange">
                <el-option v-for="(v, k, i) in questionType" :key="i" :label="v" :value="k"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 难度 -->
          <el-col :span="6">
            <el-form-item label="难度">
              <el-select style="width:100%;" v-model="query.difficulty" placeholder="请选择" @change="onDirectoryChange">
                <el-option v-for="(v, k, i) in difficulty" :key="i" :label="v" :value="k"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 方向 -->
          <el-col :span="6">
            <el-form-item label="方向">
              <el-select style="width:100%;" v-model="query.direction" placeholder="请选择" @change="onDirectoryChange">
                <el-option v-for="(item, index) in direction" :key="index" :label="item" :value="item"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 录入人 -->
          <el-col :span="6">
            <el-form-item label="录入人">
              <el-select style="width:100%;" v-model="query.creatorID" placeholder="请选择" @change="onDirectoryChange">
                <el-option v-for="(item, index) in userList" :key="index" :label="item.username" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 题目备注 -->
          <el-col :span="6">
            <el-form-item label="题目备注">
              <el-input v-model="query.remarks"></el-input>
            </el-form-item>
          </el-col>
          <!-- 企业简称 -->
          <el-col :span="6">
            <el-form-item label="企业简称">
              <el-input v-model="query.shortName"></el-input>
            </el-form-item>
          </el-col>
          <!-- 城市 -->
          <el-col :span="6">
            <el-form-item class="city-box" label="城市">
              <el-select class="city-1" v-model="query.province" placeholder="请选择" @change="onProvinceChange">
                <el-option v-for="(v, k, i) in province" :key="i" :label="v" :value="v"> </el-option>
              </el-select>

              <el-select class="city-2" v-model="query.city" placeholder="请选择" @change="onDirectoryChange">
                <el-option v-for="(v, k, i) in citys" :key="i" :label="v" :value="v"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="text-align: right;">
            <el-button size="small" @click="clearAll">清除</el-button>
            <el-button size="small" type="primary" @click="getBaseQuestionList"> 搜索</el-button>
          </el-col>
        </el-row>
      </el-form>

      <!-- 顶部搜索表单 end -->
      <el-alert :title="'数据一共' + counts + '条'" type="info" show-icon :closable="false"> </el-alert>
      <!-- 表格区域  -->
      <template>
        <el-table :data="questionList" style="width: 100%">
          <el-table-column prop="number" label="试题编号" width="180"> </el-table-column>
          <el-table-column prop="subject" label="学科" width="180"> </el-table-column>
          <el-table-column prop="catalog" label="目录"> </el-table-column>
          <el-table-column prop="address" label="题型">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.questionType === '1'">单选</span>
                <span v-else-if="scope.row.questionType === '2'">多选</span>
                <span v-else>简答</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="题干">
            <template slot-scope="scope">
              <div v-html="scope.row.question"></div>
            </template>
          </el-table-column>
          <el-table-column prop="addDate" label="录入时间" width='200px' align='center'>
            <template slot-scope="scope">
              {{ scope.row.addDate }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="难度">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.difficulty === '1'">简单</span>
                <span v-else-if="scope.row.difficulty === '2'">一般</span>
                <span v-else>困难</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="creator" label="录入人"> </el-table-column>
          <el-table-column label="操作" width="180" align='center'>
            <template slot-scope="scope">
              <div>
                <el-button @click="preview(scope.row)" plain size="small" type="primary" icon="el-icon-view" circle></el-button>
                <el-button @click="toEdit(scope.row)" plain size="small" type="success" icon="el-icon-edit" circle></el-button>
                <el-button @click="removeQuestion(scope.row)" plain size="small" type="danger" icon="el-icon-delete" circle></el-button>
                <el-button @click="choiceAdd(scope.row)" plain size="small" type="warning" icon="el-icon-star-off" circle></el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 表格区域 end -->

      <!-- 分页功能 -->
      <el-pagination
        style="text-align: right; margin-top: 20px; margin-bottom: 15px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-sizes="[2,5, 10, 20, 30]"
        :page-size="query.pagesize"
        layout="prev, pager, next, sizes, jumper"
        background
        :total="counts"
      >
      </el-pagination>
      <!-- 分页功能 end-->

      <!-- 预览组件 -->
      <questions-preview :dialogVisible="dialogVisible" @close="dialogVisible = false" :questionItem="questionItem"></questions-preview>
    </el-card>
  </div>
</template>

<script>
import questionsPreview from '../components/questions-preview'
// 题库接口
import { baseQuestionList, baseDetailList, removeQuestionList, choiceAdd } from '@/api/hmmm/questions'
// 导入城市和区域/县
import { provinces, citys } from '@/api/hmmm/citys'
// 标签接口
import { getTagList } from '@/api/hmmm/tags'
// 用户列表
import { list } from '@/api/base/users.js'
// 学科接口
import { getSubjects } from '@/api/hmmm/subjects'
// 目录接口
import { getDirectorys } from '@/api/hmmm/directorys'
export default {
  data () {
    return {
      // 预览时传入子组件的试题
      questionItem: {},
      // 试题预览
      dialogVisible: false,
      // 数据总数
      counts: 0,
      // 题库列表
      questionList: [],
      // 区域列表
      citys: [],
      // 城市列表
      province: provinces(),
      // 标签列表
      tagList: [],
      // 录入人列表
      userList: [],
      // 方向
      direction: ['o2o', '外包服务', '企业服务', '互联网金融', '企业咨询', '互联网', '电子商务', '其他'],
      // 试题类型
      difficulty: {
        1: '简单',
        2: '一般',
        3: '困难'
      },
      // 难度
      questionType: {
        1: '单选',
        2: '多选',
        3: '简答'
      },
      // 二级目录列表
      directory: [],
      // 学科列表
      subjects: [],
      // 查询信息
      query: {
        page: 1, //	否	1	当前页数
        pagesize: 5, // 每页显示多少  /** */
        subjectID: null, // 学科
        difficulty: null, // 难度
        questionType: null, // 试题难度
        tags: null, // 标签名称
        province: null, // 企业所在地省份
        city: null, // 企业所在城市
        keyword: null, // 关键字
        remarks: null, //	题目备注
        shortName: null, // 企业简称
        direction: null, // 	方向
        creatorID: null, // 录入人
        catalogID: null // 目录
      }
    }
  },
  methods: {
    //  去修改试题的页面
    toEdit (row) {
      this.$router.push({
        path: 'new',
        query: {
          id: row.id
        }
      })
    },
    //  预览
    async preview (item) {
      // 显示对话框
      const { data } = await baseDetailList({ id: item.id })
      data.questionType = item.questionType
      data.subject = item.subject
      this.dialogVisible = true
      // 传入试题
      this.questionItem = data
    },

    //  清除全部
    clearAll () {
      for (const key in this.query) {
        if (key === 'page' || key === 'pagesize') {
          continue
        }
        this.query[key] = null
      }
      this.tagList = this.directory = []
      // 更新题库列表
      this.getBaseQuestionList()
    },

    //  加入精选
    async choiceAdd (item) {
      const result = await this.$confirm('此操作将该题目加入精选, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).catch(err => err)
      // 如果确认就加入精选 否则什么都不做
      if (result === 'confirm') {
        const data = await choiceAdd({
          id: item.id,
          choiceState: 1
        })
        if (data.status === 200) {
          this.$message.success('加入精选成功')
        }
        // 更新题库列表
        this.getBaseQuestionList()
      }
    },

    //  当页码发生变化
    handleSizeChange (val) {
      this.query.pagesize = val
      this.getBaseQuestionList()
    },

    //  当前页发生变化
    handleCurrentChange (val) {
      this.query.page = val
      this.getBaseQuestionList()
    },

    //  删除题库中的题
    async removeQuestion (item) {
      // 提示框
      const result = await this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果确认删除执行删除逻辑
      if (result === 'confirm') {
        const data = await removeQuestionList(item)
        // 如果状态码是200表示删除成功
        if (data.status === 200) {
          return this.$message.success('删除成功')
        }
      }
      this.getBaseQuestionList()
    },

    //  获取题库列表
    async getBaseQuestionList () {
      const { data: res } = await baseQuestionList(this.query)
      this.counts = res.counts
      res.items.forEach(item => {
       item.addDate = this.$dayjs(item.addDate).format('YYYY-MM-DD hh:mm:ss')
      })
      this.questionList = res.items
    },

    //  当市级发生变化时触发的函数
    onProvinceChange (val) {
      this.query.city = ''
      this.citys = citys(val)
    },

    //  获取录入人
    async getCreator () {
      try {
        const { data: res } = await list({ page: 1, pagesize: 100, keyword: '' })
        this.userList = res.list
      } catch (error) {}
    },

    //  目录选择框发生变化后触发的函数
    onDirectoryChange (val) {
      // 获取标签
      this.getTagList()
    },

    //  学科选择框发生变化后，获取目录列表
    async onSubjectChange (val) {
      this.query.tags = null
      this.query.catalogID = null
      const { data: res } = await getDirectorys({ subjectID: val })
      this.directory = res.items
      this.tagList = []
    },

    //  获取学科列表
    async getgetSubjects () {
      try {
        const { data: res } = await getSubjects({ page: 1, pagesize: 100 })
        this.subjects = res.items
      } catch (error) {}
    },

    //  获取标签列表
    async getTagList () {
      const { data: res } = await getTagList({
        subjectID: this.query.subjectID
      })
      this.tagList = res.items
    }
  },
  mounted () {
    // 获取题库
    this.getBaseQuestionList()
    // 获取用户列表/ 录入人
    this.getCreator()
    // 获取学科列表
    this.getgetSubjects()
    // 获取标签
    // this.getTagList()
  }, 
  components: {
    questionsPreview
  }
}
</script>

<style scoped lang="scss">
.el-card {
  margin: 10px;
  .top_title {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 12px;
      color: pink;
    }
  }
  .city-1 {
    width: 45%;
    margin-right: 5%;
  }
  .city-2 {
    width: 50%;
  }
  .el-input__inner {
    width: 100%;
  }
}
</style>
=======
  <div class='container'>题组管理</div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>
>>>>>>> 759667730197835a878690b89b384df622d555d8
