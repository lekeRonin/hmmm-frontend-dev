<template>
  <div class="container">
    <el-card>
      <!-- 导航栏 -->
      <el-row>
        <el-col :span="18">
          <!-- 搜索框 -->
          <el-col :span="11">
            <el-form ref="subjectFrom" :model="queryList" label-width="80px">
              <el-form-item label="标签名称">
                <el-input
                  class="inputCol"
                  v-model="queryList.keyword"
                  placeholder="请根据文章标题搜索"
                ></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="queryList.state" placeholder="请选择">
                  <el-option label="已启用" :value="1"> </el-option>
                  <el-option label="已禁用" :value="0"> </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" class="left-fot">
            <el-button size="small" class="colInput" plain @click="resetInput"
              >清除</el-button
            >
            <el-button
              size="small"
              class="colInput"
              type="primary"
              @click="getArticleList"
              >搜索</el-button
            >
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-button
            class="colright"
            size="mini"
            type="success"
            icon="el-icon-edit"
            @click="addDialogVisible = true"
            >新增技巧</el-button
          >
        </el-col>
      </el-row>

      <!-- 消息文案 -->
      <el-alert
        :title="`数据一共 ${counts} 条`"
        :closable="false"
        type="info"
        show-icon
      >
      </el-alert>

      <!-- 表格区域 -->
      <el-table :data="articlesList" style="width: 100%;">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column label="文章标题" width="440">
          <template slot-scope="scope">
            {{ scope.row.title }}
            <i
              @click="video(scope.row.videoURL)"
              v-if="scope.row.videoURL"
              class="fa fa-film"
              aria-hidden="true"
            ></i>
          </template>
        </el-table-column>
        <el-table-column prop="visits" label="阅读数"> </el-table-column>
        <el-table-column prop="username" label="录入人"> </el-table-column>
        <el-table-column prop="createTime" label="录入时间"> </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            {{ scope.row.state == 1 ? "已启用" : "已禁用" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="previewArt(scope.row)"
              >预览</el-button
            >
            <el-button type="text" @click="editState(scope.row)">{{
              scope.row.state === 1 ? "禁用" : "启用"
            }}</el-button>
            <el-button
              type="text"
              :disabled="scope.row.state === 1"
              @click="editArt(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              :disabled="scope.row.state === 1"
              @click="deleteArt(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <pagination-add
        :page="queryList.page"
        :pagesize="queryList.pagesize"
        :counts="counts"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </el-card>

<!-- 添加弹框 -->
    <el-dialog title="添加文章" :visible.sync="addDialogVisible" width="40%" @close="resetAddArt">
      <!-- 表单区域 -->
      <el-form :model="articlesForm" :rules="articlesFormRules" ref="articlesFormRef" label-width="80px" class="demo-ruleForm">
        <el-form-item label="文章标题" prop="title" class="elform">
          <el-input v-model="articlesForm.title" placeholder="请输入文章标签"></el-input>
        </el-form-item>
        <el-form-item label="文章标题" prop="articleBody" class="elform">
          <quill-editor style="margin-left: 0px;" v-model="articlesForm.articleBody" ref="myQuillEditor"> </quill-editor>
        </el-form-item>
        <el-form-item label="视频地址" class="elform">
          <el-input v-model="articlesForm.videoURL" placeholder="请输入视频地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addArticlesFrom">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改弹框 -->
    <el-dialog title="添加文章" :visible.sync="editDialogVisible" width="40%" @close="resetEditArt">
      <!-- 表单区域 -->
      <el-form :model="editArticlesForm" :rules="articlesFormRules" ref="editArticlesFormRef" label-width="80px" class="demo-ruleForm">
        <el-form-item label="文章标题" prop="title" class="elform">
          <el-input v-model="editArticlesForm.title" placeholder="请输入文章标签"></el-input>
        </el-form-item>
        <el-form-item label="文章标题" prop="articleBody" class="elform">
          <quill-editor style="margin-left: 0px;" v-model="editArticlesForm.articleBody" ref="myQuillEditor"> </quill-editor>
        </el-form-item>
        <el-form-item label="视频地址" class="elform">
          <el-input v-model="editArticlesForm.videoURL" placeholder="请输入视频地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editArticlesFrom">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 预览框 -->
    <el-dialog title="预览文章" :visible.sync="previewDialogVisible" width="43%">
      <!-- 主体区域 -->
      <div class="preview-box">
        <div class="preview-title">{{ articlesInfo.title }}</div>
        <div class="preview-nav">
          <span>{{ articlesInfo.createTime }}</span>
          <span>{{ articlesInfo.username }}</span>
          <span class="el-icon-view"></span>
          <span>{{ articlesInfo.visits }}</span>
        </div>
        <div class="preview-content" v-html="articlesInfo.articleBody"></div>
      </div>
    </el-dialog>

    <!-- 视频区域 -->
    <div class="video" v-if="videoUrl">
      <div class="video-ico" @click="closeVideo()"><span class="el-icon-close"></span></div>
      <div class="video-box">
        <video autoplay :src="videoUrl"></video>
      </div>
    </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
import PaginationAdd from '../components/Pagination/pagination-add'
import Article from '@/api/hmmm/articles'

export default {
  name: 'Articles',
  components: {
    quillEditor,
    PaginationAdd
  },
  data () {
    return {
      // 预览对话的框
      previewDialogVisible: false,

      // 修改弹框的显示
      editDialogVisible: false,
      // 修改表的数据
      editArticlesForm: {
        title: '',
        articleBody: '',
        videoURL: null,
        id: ''
      },

      // 添加验证
      articlesFormRules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        articleBody: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },

      // 添加框数据
      articlesForm: {
        title: '',
        articleBody: '',
        videoURL: null
      },

      // 视频路径
      videoUrl: null,
      // 总条数
      counts: 0,
      // 面试文章总数据
      articlesList: [],
      // 请求数据参数
      queryList: {
        page: 1,
        pagesize: 10,
        keyword: '',
        state: null
      },
      // 新增弹框
      addDialogVisible: false,
      // 点击当前预览的数据
      articlesInfo: []
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    // 点击预览
    previewArt (row) {
      this.articlesInfo = row
      console.log(this.articlesInfo)
      this.previewDialogVisible = true
    },

    // 修改的重置
    resetEditArt () {
      this.$refs.editArticlesFormRef.resetFields()
    },

    // 点击删除
    async deleteArt (row) {
      const configRuselt = await this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (configRuselt !== 'confirm') {
        return this.$message('您取消了删除操作!')
      }
      try {
        const { data } = await Article.remove(row)
        console.log(data)
        this.$message.success('删除成功!')
        this.getArticleList()
      } catch (e) {
        this.$message.error('删除失败!')
      }
    },

    // 点击修改弹框显示
    editArt (row) {
      console.log(row)
      this.editArticlesForm.title = row.title
      this.editArticlesForm.articleBody = row.articleBody
      this.editArticlesForm.videoURL = row.videoURL
      this.editArticlesForm.id = row.id
      this.editDialogVisible = true
    },

    // 点击修改请求
    async editArticlesFrom () {
      try {
        await Article.update(this.editArticlesForm)
        this.$message.success('修改文章成功')
        this.editDialogVisible = false
        this.getArticleList()
      } catch (e) {
        this.$message.success('修改文章失败')
      }
    },

    // 点击添加请求
    async addArticlesFrom () {
      try {
        await Article.add(this.articlesForm)
        this.$message.success('新增文章成功')
        this.addDialogVisible = false
        this.getArticleList()
      } catch (e) {
        this.$message.success('新增文章失败')
      }
    },
    // 重置添加表单
    resetAddArt () {
      this.$refs.articlesFormRef.resetFields()
      this.articlesForm.articleBody = ''
      this.articlesForm.videoURL = ''
    },

    // 切换状态
    async editState (row) {
      try {
        await Article.changeState({
          id: row.id,
          state: row.state === 1 ? 0 : 1
        })
        this.$message.success('操作成功')
        row.state = row.state === 1 ? 0 : 1
      } catch (e) {
        this.$message.error('请求错误!')
      }
    },

    // 点击清除按钮清除
    resetInput () {
      this.queryList.keyword = ''
      this.queryList.state = null
      this.getArticleList()
    },

    // 点击表格图标显示
    closeVideo () {
      this.videoUrl = null
    },

    // 点击视频图标关闭
    video (row) {
      this.videoUrl = row
    },

    // 获取文章的列表
    async getArticleList () {
      try {
        const { data: { counts, items } } = await Article.list(this.queryList)
        console.log(counts, items)
        items.forEach(item => {
          item.createTime = this.$dayjs(item.createTime).format('YYYY-MM-DD hh:mm:ss')
        })
        this.articlesList = items
        this.counts = counts
      } catch (e) {
        console.log(e)
      }
    },

    // 一页多少条
    handleSizeChange (newSize) {
      this.queryList.pagesize = newSize
      this.getArticleList()
    },

    // 多少页
    handleCurrentChange (newPage) {
      this.queryList.page = newPage
      this.getArticleList()
    }
  }
}
</script>

<style scoped lang='scss'>
.ql-align-center {
  img {
    width: 700px;
  }
}

.preview-box {
  .preview-title {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .preview-nav {
    span {
      margin-right: 10px;
    }
  }
  .preview-content {
    margin-top: 10px;
    padding: 10px;
    background-color: #f5f5f5;
    border-top: 1px dashed #ccc;
  }
}

.elform {
  width: 100%;
}

.el-form-item__content {
  margin-left: 10px;
}

.video {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 9999;
  .video-ico {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translate(-50%, 0);
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 20px;
  }
  .video-box {
    width: 800px;
    height: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    video {
      width: 100%;
      height: 100%;
    }
  }
}

.left-fot {
  margin-left: 9px;
}
.el-row {
  margin-top: 10px;
}
.colInput {
  height: 35px;
}
.colright {
  float: right;
  height: 35px;
  margin-left: 10px;
}
.el-breadcrumb {
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.inputCol {
  width: 200px;
}
.el-form-item {
  display: inline-block;
}
.el-table {
  margin-top: 10px;
}
.el-pagination {
  float: right;
  margin-top: 20px;
}
.elform {
  width: 100%;
}

.el-form-item__content {
  margin-left: 10px;
}
.fa-film:before {
  color: #0245a8;
}
</style>
