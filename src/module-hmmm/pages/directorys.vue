<template>
<<<<<<< HEAD
  <div class='container'>目录管理</div>
</template>

<script>
export default {}
=======
  <div class='container'>
    <el-card>
      <PageTools :total="total">
        <template #left>
          <el-form :inline="true">
              <el-form-item label="目录名称">
                <el-input v-model="SearchName"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="state" placeholder="请选择">
                    <el-option
                    :label="`已${item.value}`"
                    :value="item.id"
                    v-for="item in baseApi.status" :key="item.id"></el-option>
                   <!-- <el-option label="已禁用" value="beijing"></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item >
                <el-button size="small" @click="OnClear">清除</el-button>
                <el-button type="primary" size="small" @click="OnSearch">搜索</el-button>
             </el-form-item>
            </el-form>
        </template>
        <template #right>

          <el-button type="text" size="small" icon="el-icon-back" @click="$router.back()" v-if="id">返回学科</el-button>
          <el-button type="success" size="small" icon="el-icon-edit" @click="AddDirectorys" >新增目录</el-button>
        </template>
      </PageTools>
      <el-table
      :data="directorysData"
      style="width: 100%"
      >
      <el-table-column
      label="序号"
      type="index"
      >
    </el-table-column>
    <el-table-column
      label="所属学科"
      prop="subjectName"
      >
    </el-table-column>
    <el-table-column
      label="目录名称"
      prop="directoryName"
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
      label="面试题数量"
      prop="totals"
      >
      </el-table-column>
    <el-table-column
      label="状态"
      prop="state"
      :formatter="StateData"
      >
      </el-table-column>
    <el-table-column
      label="操作"
      width="250"
      fixed="right"
      >
      <template v-slot="{row}">
      <el-button size="mini" type="text" @click="EditState(row)">{{row.state === 1 ? '禁用' : '启用'}}</el-button>
      <el-button size="mini" type="text" :disabled="row.state === 1" @click="OnEdit(row.id)">修改</el-button>
      <el-button size="mini" type="text" :disabled="row.state === 1" @click="OnDel(row.id)">删除</el-button>
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
    <DirectorysAdd :AddDialog.sync="AddDialog" ref="AddDirectorys" :userId="userId" @clear="clearUserId" :nameValue="this.name" :subjectID="this.id"></DirectorysAdd>
  </div>
</template>

<script>
import { getDirectorys, DelDirectorys, EditState } from '@/api/hmmm/directorys'
import baseApi from '@/api/base/baseApi'
import DirectorysAdd from '@/module-hmmm/components/directorys-add.vue'
export default {
  name: 'Directorys',
  components: {
    DirectorysAdd
  },
  data () {
    return {
      baseApi,
      SearchName: '',
      state: '', // 搜索状态
      directorysData: [
        {
          id: '',
          subjectName: '', // 所属学科
          subjectID: '', // 所属学科Id
          directoryName: '', // 目录名称
          username: '', // 创建者
          addDate: '', // 创建日期
          totals: '', // 面试题数量
          state: '' // 状态
        }
      ],
      pageInfo: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      AddDialog: false, // 新增目录弹出层
      userId: null, // 修改id
      id: this.$route.query.id, // 学科传递过来的数据
      name: this.$route.query.name
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
      const { data } = await getDirectorys(this.pageInfo)
      this.directorysData = data.items
      this.total = data.counts
    },
    StateData (row, column, cellValue, index) {
      return cellValue === 1 ? '已启用' : '已禁用'
    },
    async OnSearch () {
      // console.log(this.state === '2' ? 0 : 2)
      // console.log(this.SearchName)
      const state = this.state === '2' ? 0 : 1
      const res = {
        directoryName: this.SearchName,
        state
      }
      const { data } = await getDirectorys(res)
      this.directorysData = data.items
      // console.log(data)
      this.total = data.counts
    },
    // 清除搜索框
    OnClear () {
      this.state = ''
      this.SearchName = ''
      this.localList()
    },
    // 新增目录
    AddDirectorys () {
      this.AddDialog = true
    },
    // 删除
    async OnDel (id) {
      try {
        await this.$confirm('此操作将永久删除该目录，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await DelDirectorys(id)
        this.$message.success('删除成功')
        this.localList()
      } catch (error) {
        console.log(error)
        this.$message.success('删除失败')
      }
    },
    // 启动和禁用按钮
    async EditState (row) {
      const data = {
        id: row.id,
        state: row.state === 1 ? 0 : 1
      }
      console.log(data)
      await EditState(data)
      this.localList()
    },
    // 修改
    async OnEdit (id) {
      this.AddDialog = true
      this.userId = id
      this.$refs.AddDirectorys.getDirectorysById(id)
    },
    // 清除 userId
    clearUserId () {
      this.userId = null
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
