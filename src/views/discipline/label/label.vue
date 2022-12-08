<template>
<div>
<el-card>
<el-row>
  <el-col :span="18">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="标签名称">
              <el-input v-model="formInline.tag" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="formInline.state" placeholder="请选择">
                <el-option label="启用" :value="1" />
                <el-option label="禁用" :value="0" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="clearFn">清除</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-row type="flex" justify="end">
            <el-button v-if="id&&name" @click="$router.back()">返回学科</el-button>
            <el-button type="success" @click="addTag">
              <template>
                <i class="el-icon-edit" />
                <span>新增标签</span>
              </template>
            </el-button>
          </el-row>
        </el-col>

</el-row>
  <el-alert
        style="margin-bottom: 15px;"
        :title="`数据一共${page.total}条`"
        type="info"
        show-icon
        :closable="false"
      />
   <el-table :data="tableData" style="width:100%">
        <el-table-column type="index" label="序号" />
        <el-table-column prop="subjectName" label="所属学科" />
        <el-table-column prop="tagName" label="标签名称" />
        <el-table-column :formatter="formatCreator" prop="creatorID" label="创建者" />
        <el-table-column :formatter="formatAddDate" prop="addDate" label="创建日期" />
        <!-- <el-table-column prop="totals" label="面试题数量" /> -->
        <el-table-column :formatter="formatState" prop="state" label="状态" />
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="handleisdisplay(row)">{{ row.state ? '禁用' : '启用' }}</el-button>
            <el-button type="text" :disabled="row.state === 1" @click="editeTag(row.id)">修改</el-button>
            <el-button type="text" :disabled="row.state === 1" @click="delTag(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

<el-pagination
        style="margin-top:20px;text-align: right;"
        :current-page="page.page"
        :page-sizes="page.pagesizes"
        :page-size="page.pagesize"
        :total="page.total"
        layout=" prev, pager, next, sizes, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

 <!-- 新增弹框 -->
 <el-dialog :title="title" :visible="showDialog" @close="btnCancel">
      <el-form ref="tagForm" :model="tagForm" :rules="rules" label-width="80px">
        <el-form-item v-if="!id&&!name" label="所属学科" prop="subjectName">
          <el-select v-model="tagForm.subjectName" placeholder="请选择" style="width:100%">
            <el-option v-for="item in tableData" :key="item.id" :label="item.subjectName" :value="item.subjectName" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签名称" prop="tagName">
          <el-input v-model="tagForm.tagName" />
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <el-row slot="footer" type="flex" justify="end">
        <el-col>
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>

</div>

</template>

<script>
import { formatDateTime } from '@/filters'
import { getSubjectsList, getTagList, addTag, getTagDetail, editeTag, delTag, postTagState } from '@/api/hmmm/tags'
export default {
  name: 'Label',
  data () {
    return {
      showDialog: false,
      title: '',
      tagForm: {
        subjectName: '',
        tagName: ''
      },
      rules: {
        subjectName: [{ required: true, message: '所属学科不能为空', trigger: 'change' }],
        tagName: [{ required: true, message: '标签名称不能为空', trigger: 'blur' }]
      },
      formInline: {
        tag: '',
        state: ''
      },
      page: {
        page: 1,
        pagesizes: [5, 10, 20, 50],
        pagesize: 10,
        total: 0
      },
      tableData: []
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    },
    name () {
      return this.$route.query.name
    }
  },
  async created () {
    if (this.name) {
      const res = await getSubjectsList(this.name)
      const subjectID = res.data.filter(item => item.label === this.name)[0].value
      this.getTagList({
        page: this.page.page,
        pagesize: this.page.pagesize,
        subjectID
      })
    }
    this.getTagList()
  },
  methods: {
    async getTagList (params) {
      const { data } = await getTagList(params)
      console.log(data)
      this.tableData = data.items
      this.page.total = data.counts
    },
    formatState (row, column, cellvalue, index) {
      return cellvalue ? '已启用' : '已禁用'
    },
    formatCreator (row, column, cellvalue, index) {
      return cellvalue === 2 ? '超级管理员' : '未知'
    },
    formatAddDate (row, column, cellvalue, index) {
      return formatDateTime(cellvalue)
    },
    clearFn () {
      this.formInline = {
        tag: '',
        state: ''
      }
    },
    onSubmit () {
      if (this.formInline.tag !== '' && this.formInline.state !== '') {
        this.getTagList({
          page: this.page.page,
          pagesize: this.page.pagesize,
          tagName: this.formInline.tag,
          state: this.formInline.state,
          subjectID: this.name ? this.id : null
        })
      } else if (this.formInline.tag === '' && this.formInline.state !== '') {
        this.getTagList({
          page: this.page.page,
          pagesize: this.page.pagesize,
          state: this.formInline.state,
          subjectID: this.name ? this.id : null
        })
      } else if (this.formInline.tag !== '' && this.formInline.state === '') {
        this.getTagList({
          page: this.page.page,
          pagesize: this.page.pagesize,
          tagName: this.formInline.tag,
          subjectID: this.name ? this.id : null
        })
      } else {
        this.getTagList({
          page: this.page.page,
          pagesize: this.page.pagesize,
          subjectID: this.name ? this.id : null
        })
      }
    },
    addTag () {
      this.title = '新增标签'
      this.showDialog = true
    },
    async editeTag (id) {
      this.title = '修改标签'
      const res = await getTagDetail(id)
      console.log(res)
      const subjectName = this.tableData.filter(item => item.subjectID === res.data.subjectID)[0].subjectName
      this.tagForm = { ...res.data, subjectName }
      this.showDialog = true
    },
    async delTag (id) {
      await delTag(id)
      this.getTagList({
        page: this.page.page,
        pagesize: this.page.pagesize,
        subjectID: this.name ? this.id : null
      })

      this.$message.success('删除标签成功')
    },
    btnCancel () {
      this.tagForm = {
        subjectName: '',
        tagName: ''
      }
      this.$refs.tagForm.resetFields()
      this.showDialog = false
      console.log(this.id)
    },
    btnOK () {
      this.$refs.tagForm.validate(async (isOK) => {
        if (isOK) {
          if (this.tagForm.id) {
            if (this.name) {
              await editeTag({ ...this.tagForm, subjectID: this.id })
            } else {
              const subjectID = this.tableData.filter(item => item.subjectName === this.tagForm.subjectName)[0].subjectID
              await editeTag({ ...this.tagForm, subjectID })
            }
            this.$message.success('编辑标签成功')
          } else {
            if (this.name) {
              await addTag({ ...this.tagForm, subjectID: this.id })
            } else {
              const subjectID = this.tableData.filter(item => item.subjectName === this.tagForm.subjectName)[0].subjectID
              await addTag({ ...this.tagForm, subjectID })
            }
            this.$message.success('新增标签成功')
          }
          if (this.name) {
            this.getTagList({
              page: this.page.page,
              pagesize: this.page.pagesize,
              subjectID: this.id
            })
          }
          this.getTagList()
          this.showDialog = false
        }
      })
    },
    handleSizeChange (val) {
      console.log(val, '-----')
      this.page.pagesize = val
      this.getTagList(this.page)
    },
    handleCurrentChange (val) {
      this.page.page = val
      this.getTagList(this.page)
    },
    async handleisdisplay (row) {
      this.tableData.forEach(item => {
        if (item.id === row.id) {
          item.state === 0 ? item.state = 1 : item.state = 0
        }
      })

      await postTagState(row)
    }

  }
}
</script>

<style  scoped lang="less">
  .el-dialog__header {
    background-color: #66b1ff;
  };
  //   /deep/.el-card{
  //    margin: 70px 20px 20px 23px;
  // }
</style>
