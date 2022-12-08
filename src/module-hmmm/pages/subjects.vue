<template>
<<<<<<< HEAD
  <div class='container'>学科管理</div>
</template>

<script>
export default {}
=======
  <div class='container'>
    <el-card>
      <PageTools :total="total">
        <template #left>
          <el-form :inline="true">
              <el-form-item label="学科名称">
                <el-input v-model="SearchName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" @click="SearchName = ''">清除</el-button>
                <el-button type="primary" size="small" @click="OnSearch">搜索</el-button>
             </el-form-item>
            </el-form>
        </template>
        <template #right>
          <el-button type="success" size="small" icon="el-icon-edit" @click="AddSubjects">新增学科</el-button>
        </template>
      </PageTools>
      <el-table
      :data="SubjectsData"
      style="width: 100%"
      >
      <el-table-column
      label="序号"
      type="index"
      >
    </el-table-column>
        <el-table-column
      label="学科名称"
      prop="subjectName"
      >
    </el-table-column>
        <el-table-column
      label="创建者"
      prop="username"
      >
    </el-table-column>
        <el-table-column
      label="创建日期"
      prop="addDate"
      width="180"
      :formatter="newDate"
      >
    </el-table-column>
        <el-table-column
      label="前台是否显示"
      prop="isFrontDisplay"
      :formatter="isFrontDisplayData"
      >
      <!-- <template v-slot="{row}">
        {{(row.isFrontDisplay | isFrontDisplayData)}}
      </template> -->
    </el-table-column>
        <el-table-column
      label="二级目录"
      prop="twoLevelDirectory"
      >
    </el-table-column>
        <el-table-column
      label="标签"
      prop="tags"
      >
    </el-table-column>
        <el-table-column
      label="题目数量"
      prop="totals"
      >
    </el-table-column>
    <el-table-column
      label="操作"
      width="250"
      fixed="right"
      >
      <template v-slot="{row}">
      <el-button size="mini" type="text" @click="$router.push(`/subjects/directorys?id=${row.id}&name=${row.subjectName}`)">学科分类</el-button>
      <el-button size="mini" type="text" @click="$router.push(`/subjects/directorys?id=${row.id}?name=${row.subjectName}`)">学科标签</el-button>
      <el-button size="mini" type="text" @click="OnEdit(row.id)">修改</el-button>
      <el-button size="mini" type="text" @click="OnDel(row.id)">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <el-pagination
            :current-page="pageInfo.page"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="pageInfo.pagesize"
            layout=" prev, pager, next, sizes, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
          />
        </el-row>
    </el-card>

    <subjectsAdd  ref="AddDialog" :AddDialog.sync="AddDialog" :userId="userId" ></subjectsAdd>
    </div>
</template>

<script>
import { getSubjects, DelSubjects } from '@/api/hmmm/subjects'
import subjectsAdd from '@/module-hmmm/components/subjects-add.vue'
export default {
  components: {
    subjectsAdd
  },
  data () {
    return {
      SearchName: '',
      SubjectsData: [
        {
          id: '',
          subjectName: '', // 学科名称
          username: '', // 创建者
          addDate: '',
          isFrontDisplay: 1, // 前台是否显示
          twoLevelDirectory: '', // 二级目录
          tags: 0, // 标签
          totals: 0 // 题目数量
        }
      ],
      pageInfo: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      AddDialog: false, // 添加学科弹出层
      userId: null // 修改时传入的id
    }
  },
  created () {
    this.localList()
  },
  methods: {
    handleSizeChange (newSize) {
      this.pageInfo.pagesize = newSize
      // console.log(newSize)
      this.localList()
    },
    handleCurrentChange (newPage) {
      this.pageInfo.page = newPage
      // console.log(newPage, 'newpage')
      this.localList()
    },
    async localList () {
      const { data } = await getSubjects(this.pageInfo)
      // console.log(data)
      // console.log(item.isFrontDisplay === 1 ? '是' : '否')
      // return item.isFrontDisplay === 1 ? '是' : '否'
      this.SubjectsData = data.items
      this.total = data.counts
    },
    async OnSearch () {
      const { data } = await getSubjects({ subjectName: this.SearchName })
      this.SubjectsData = data.items
      this.total = data.counts
      this.SearchName = ''
    },
    AddSubjects () {
      this.AddDialog = true
    },
    async OnEdit (id) {
      this.userId = id
      this.AddDialog = true
      this.$nextTick(async () => {
        await this.$refs.AddDialog.getSubjectsById(id)
      })
    },
    async OnDel (id) {
      try {
        await this.$confirm('此操作将永久删除该学科，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await DelSubjects(id)
        this.$message.success('删除成功')
        this.localList()
      } catch (error) {
        console.log(error)
        this.$message.success('删除失败')
      }
    },
    isFrontDisplayData (row, column, cellValue, index) {
      return cellValue === 1 ? '是' : '否'
    },
    // 格式化时间
    newDate (row, column, cellValue, index) {
      return this.formatDate(cellValue)
    },

    formatDate (numb) {
      const date = new Date(numb)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1 + '').padStart(2, '0')
      const day = (date.getDate() + '').padStart(2, '0')
      const hours = (date.getHours() + '').padStart(2, '0')
      const minuttes = (date.getMinutes() + '').padStart(2, '0')
      const seconds = (date.getSeconds() + '').padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minuttes}:${seconds}`
    }
  }

}
>>>>>>> 759667730197835a878690b89b384df622d555d8
</script>

<style scoped lang='less'></style>
