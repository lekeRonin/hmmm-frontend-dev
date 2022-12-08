<template>
<<<<<<< HEAD
  <el-card class="box-card">
    <el-form ref="form" :model="form">
      <el-form-item label="输入编号" label-width="80px">
        <el-input v-model="form.name" style="width='20px'"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="clearContents">清除</el-button>
        <el-button type="primary" size="small" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-alert
      :title="`数据一共 ${total} 条`"
      show-icon
      :closable="false"
    />

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="编号" width="200" align="center" />
      <el-table-column
        prop="questionType"
        label="题型"
        width="100"
        header-align="center"
        align="center"
      >
        <template v-slot="scope">
          <p v-if="scope.row.questionType === '1'">单选</p>
          <p v-else-if="scope.row.questionType === '2'">多选</p>
          <p v-else>简答</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="questionIDs"
        label="题目编号"
        header-align="center"
        align="center"
      >
        <template v-slot="scope">
          <div v-for="(item, index) in scope.row.questionIDs" :key="index">
            <el-button type="text" @click="btn(item.id)">{{ item.number }}</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="addTime" label="录入时间" align="center" />
      <el-table-column prop="totalSeconds" label="答题时间(s)" align="center" />
      <el-table-column prop="accuracyRate" label="正确率(%)" align="center" />
      <el-table-column prop="userName" label="录入人" align="center" />
      <el-table-column
        label="操作"
        width="120"
        header-align="center"
        align="center"
      >
        <template v-slot="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            circle
            size="mini"
            @click="delClick(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="page.pagesize"
        layout="prev, pager, next, sizes, total, jumper"
        :total="total"
      >
      </el-pagination>
    </el-row>

    <Preview :dialogVisible='dialogVisible' :questionItem=' questionItem'  @close="dialogVisible = false" />
  </el-card>
</template>

<script>
import { problemSets, delData, baseDetailList } from '@/api/hmmm/questions'
import Preview from '@/module-hmmm/components/questions-preview.vue'
export default {
  name: 'Randoms',
  components: {
    Preview
  },
  data () {
    return {
      dialogVisible: false,
      questionItem: {},
      list: [], // 接数据的
      page: {
        page: 1, // 当前页码
        pagesize: 10
      },
      total: 0, // 总数
      form: {
        name: ''
      }
    }
  },
  mounted () {
    this.loading()
  },
  methods: {
    // 渲染
    async loading () {
      const { data } = await problemSets(this.page)
      this.list = data.items
      this.total = data.counts
      // console.log(this.list)
    },
    // 删除
    async delClick (id) {
      try {
        await this.$confirm('您确定删除吗')
        await delData(id)
        this.$message.success('删除成功')
        this.loading()
      } catch (error) {
        console.log(error)
      }
    },
    // 分页
    handleSizeChange (val) {
      this.page.pagesize = val
      this.loading()
    },
    handleCurrentChange (val) {
      this.page.page = val
      this.loading()
    },
    // 清除
    clearContents () {
      this.form.name = ''
    },
    // 搜索
    async search () {
      const { data } = await problemSets({
        page: 1,
        pagesize: 10,
        keyword: this.form.name
      })
      this.total = data.counts
      this.list = data.items
      this.clearContents()
    },
    // 预揽
    async btn (id) {
      try {
        const { data } = await baseDetailList({ id })
        this.questionItem = data
        this.dialogVisible = true
      } catch (error) {
        this.$message.info('数据未找到')
        return error
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-input {
  width: 250px;
}
.el-form {
  display: flex;
  justify-content: space-between;
}
.el-alert {
  margin-bottom: 20px;
}
.el-row {
  position: relative;
  margin-top: 15px;
  height: 30px;
  .el-pagination {
    position: absolute;
    top: 0px;
    right: 0px;
  }
}
</style>
=======
  <div class='container'>精选题库</div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>
>>>>>>> 759667730197835a878690b89b384df622d555d8
