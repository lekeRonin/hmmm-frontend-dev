<template>
<<<<<<< HEAD
  <div class='container'>试题录入</div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>
=======
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
          <div slot="header">
            <span>试题录入</span>
          </div>
          <el-form ref="testForm" :model="testForm" :rules="testFormRules" label-width="120px">
        <el-form-item label="学科：" prop="subjectID">
            <el-select @change="selectSubject"  v-model="testForm.subjectID" placeholder="请选择">
            <el-option v-for="item in subjectsList" :key="item.id"  :label="item.subjectName" :value="item.id">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="目录：" prop="catalogID">
            <el-select v-model="testForm.catalogID" placeholder="请选择">
            <el-option v-for="item in directorysList" :key="item.value"  :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="企业：" prop="enterpriseID">
            <el-select v-model="testForm.enterpriseID" placeholder="请选择">
            <el-option v-for="item in companysList" :key="item.id" :label="item.shortName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-row type="flex">
        <el-form-item label="城市：" prop="province">
            <el-select v-model="testForm.province" placeholder="请选择" style="width:198px;margin-right:4px" @change="selectCity">
            <el-option v-for="item in provinces" :key="item" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item  ref="city"  class="citystyle" prop="city" :rules="{ required: true, message: '请选择地区', trigger: 'change' }">
            <el-select  v-model="testForm.city" placeholder="请选择"
            style="width:198px">
            <span v-if="testForm.province">
            <el-option :label="item" :value="item" v-for="item in cityslist" :key="item"></el-option>
            </span>
            <el-option v-else label="无数据" value="无数据"></el-option>
            </el-select>
        </el-form-item>
        </el-row>
        <el-form-item label="方向：" prop="direction">
            <el-select v-model="testForm.direction" placeholder="请选择">
            <el-option v-for="item in directions" :key="item" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="题型：" prop="questionType">
        <el-radio-group v-model="testForm.questionType" @change="questionChange">
            <el-radio label="单选"></el-radio>
            <el-radio label="多选"></el-radio>
            <el-radio label="简答"></el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item label="难度：" prop="difficulty">
        <el-radio-group v-model="testForm.difficulty">
            <el-radio label="简单"></el-radio>
            <el-radio label="一般"></el-radio>
            <el-radio label="困难"></el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item label="题干：" prop="question">
            <quill-editor
            v-model="testForm.question"
            :options="editorOption"
            ></quill-editor>
        </el-form-item>
        <el-form-item label="选项：">
            <!-- 选项单选组 -->
        <el-radio-group v-if="status" v-model="isCode" @change="isCodeChange">
            <el-row v-for="item in testForm.options" :key="item.code"  type="flex" class="radio">
                <el-radio :label="item.code">{{item.code}}：</el-radio>
                <el-input v-model="item.title"></el-input>
                <upload-img v-model="item.img" />
            </el-row>
        </el-radio-group>
        <!-- 多选组 -->
        <el-checkbox-group v-else  v-model="reCodelist" @change="reCodelistChange">
            <el-row type="flex" class="radio" v-for="item in testForm.options" :key="item.code">
                <el-checkbox :label=item.code>{{item.code}}：</el-checkbox>
                <el-input  v-model="item.title"></el-input>
                <upload-img v-model="item.img" />
            </el-row>
        </el-checkbox-group>
        </el-form-item>
        <el-form-item>
            <el-button  type="danger" size="small" :disabled="status" @click="addOptions">+增加选项与答案</el-button>
        </el-form-item>
        <el-form-item label="解析视频：">
            <el-input class="iptvideo"  v-model="testForm.videoURL"></el-input>
        </el-form-item>
        <el-form-item label="答案解析：" prop="answer">
            <quill-editor
            v-model="testForm.answer"
            :options="editorOption"
            ></quill-editor>
        </el-form-item>
        <el-form-item label="题目备注：">
            <el-input
            style="width:400px"
            type="textarea"
            :rows="4"
            v-model="testForm.remarks">
            </el-input>
        </el-form-item>
        <el-form-item label="试题标签">
            <el-select
                v-model="testForm.tags"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择试题标签">
                <el-option
                v-for="item in tagslist"
                :key="item.id"
                :label="item.subjectName"
                :value="item.subjectName">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="subject">确认提交</el-button>
        </el-form-item>
          </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
// 引入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

// 引入上传图片插件
import uploadImg from '../components/questions-uploadImg.vue'
// 学科api
import { getSubjects as sublist } from '@/api/hmmm/subjects'
// 目录api
import { simple as direlist } from '@/api/hmmm/directorys'
// 企业api
import { list as complist } from '@/api/hmmm/companys'
// 城市api
import { provinces, citys } from '@/api/hmmm/citys'
// 试题标签 api
import { getTagList as alltaglist } from '@/api/hmmm/tags'
// 就业方向&
import { direction } from '@/api/hmmm/constants'
// 发送添加录入请求
import { add as addquestion } from '@/api/hmmm/questions'
export default {
  components: {
    quillEditor,
    uploadImg
  },
  data () {
    return {
      testForm: {
        subjectID: '', // 学科
        catalogID: '', // 目录
        enterpriseID: '', // 企业
        province: '', // 城市
        city: '', // 区
        direction: '', // 方向
        questionType: '单选', // 题型
        difficulty: '简单', // 难度
        question: '', // 题干
        options: [
          {
            code: 'A', // 选项编号
            title: '', // 选项描述
            isRight: false, // 是否选中
            img: '' // 图片解析路径
          },
          {
            code: 'B', // 选项编号
            title: '', // 选项描述
            isRight: false, // 是否选中
            img: '' // 图片解析路径
          },
          {
            code: 'C', // 选项编号
            title: '', // 选项描述
            isRight: false, // 是否选中
            img: '' // 图片解析路径
          },
          {
            code: 'D', // 选项编号
            title: '', // 选项描述
            isRight: false, // 是否选中
            img: '' // 图片解析路径
          }
        ],
        videoURL: '', // 解析视频
        answer: '', // 答案解析
        remarks: '', // 题目备注
        tags: '' // 试题标签
      },
      //   单选组 选中状态
      isCode: '',
      //   多选组收集选中代码
      reCodelist: [],
      testFormRules: {
        subjectID: [{ required: true, message: '请选择学科', trigger: 'change' }],
        catalogID: [{ required: true, message: '请选择目录', trigger: 'change' }],
        enterpriseID: [{ required: true, message: '请选择企业', trigger: 'change' }],
        province: [{ required: true, message: '请选择城市', trigger: 'change' }],
        direction: [{ required: true, message: '请选择方向', trigger: 'change' }],
        questionType: [{ required: true, message: '请选择题型', trigger: 'change' }],
        difficulty: [{ required: true, message: '请选择难度', trigger: 'change' }],
        question: [{ required: true, message: '请输入题干', trigger: 'blur' }],
        answer: [{ required: true, message: '请输入答案解析', trigger: 'blur' }]
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote'],
            ['code-block', 'image', 'link']
          ]
        }
      },
      //   学科列表
      subjectsList: [],
      //   选中学科 id
      subjectsId: '',
      //   目录列表
      directorysList: [],
      //   企业列表
      companysList: [],
      //   城市
      provinces: provinces(),
      //   城市地区
      citys,
      //  就业方向
      directions: direction,
      //   城市列表
      cityslist: [],
      //   试题标签列表
      tagslist: [],
      // 单选&多选&简答 状态
      status: true
    }
  },
  created () {
    //   渲染学科列表挂载下拉
    this.subjectList()
    // 渲染企业列表挂载下拉
    this.companyList()
  },
  methods: {
    // 学科列表
    async subjectList () {
      try {
        const { data } = await sublist()
        this.subjectsList = data.items
      } catch (err) { return err }
    },
    // 渲染目录列表
    async directoryList (id) {
      // console.log(id)
      try {
        const { data } = await direlist({ subjectID: id })
        this.directorysList = data
      } catch (err) { return err }
    },
    // 渲染企业管理列表
    async companyList () {
      try {
        const { data } = await complist()
        this.companysList = data.items
      } catch (err) { return err }
    },
    // 渲染试题标签列表
    async tagList (id) {
      try {
        const { data } = await alltaglist({ subjectID: id })
        this.tagslist = data.items
      } catch (err) { return err }
    },
    // 选择学科改变目录触发事件
    selectSubject (id) {
      // 渲染目录列表挂载下拉
      this.directoryList(id)
      // 渲染试题标签
      this.tagList(id)
    },
    // 选择城市change事件
    selectCity (val) {
      if (val) {
        this.cityslist = this.citys(val)
        this.$refs.testForm.validateField('city')
      }
    },
    // 改变单选组按钮状态
    isCodeChange (val) {
      this.testForm.options.forEach(item => {
        if (item.code === val) {
          item.isRight = true
        } else {
          item.isRight = false
        }
      })
    },
    // 多选组修改isRight状态
    reCodelistChange () {
      this.testForm.options.forEach(item => {
        if (this.reCodelist.includes(item.code)) {
          item.isRight = true
        } else {
          item.isRight = false
        }
      })
    },
    // 难度选择
    questionChange (val) {
      // 清空选项
      this.clearOption()
      if (val === '多选') {
        this.status = false
      } else {
        this.status = true
      }
    },
    // 清空选项
    clearOption () {
      // 清空单选选中的状态
      this.isCode = ''
      //   重新收集多选组,清空状态
      this.reCodelist = []
      //   清空多选isRight状态
      this.testForm.options.forEach(item => {
        item.isRight = false
        item.img = ''
        item.title = ''
      })
      this.status = true
    },
    // 提交录入
    subject () {
      this.$refs.testForm.validate(async valid => {
        if (!valid) return
        // console.log(this.testForm)
        // 将标签数组转换为字符串
        this.testForm.tags = this.testForm.tags.join('，')
        try {
          await addquestion(this.testForm)
          this.$message.success('添加成功')
          this.$refs.testForm.resetFields()
          // 清空选项
          this.clearOption()
          // 清空题目备注
          this.testForm.remarks = ''
          //   清空标签数组
          this.tagslist = []

        //   跳转 精选题库
        } catch (err) {
          console.log(err)
        }
      })
    },
    // 增加选项与答案
    addOptions () {
      const nowcode = this.testForm.options[this.testForm.options.length - 1].code
      if (nowcode === '~') {
        return this.$message.success('选项已达上限！')
      }
      const code = String.fromCharCode(nowcode.charCodeAt() + 1)
      this.testForm.options.push({
        code: code,
        img: '',
        isRight: false,
        title: ''
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-select {
   width: 400px;
}
.quill-editor{
min-height: 200px;
::v-deep.ql-container{
    height: 200px;
}
}
.radio{
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    &:last-child{
        margin-bottom: 0;
    }
    .el-radio{
    margin-right: 0;
}
}
 .el-input{
    ::v-deep.el-input__inner{
        width: 240px;
    }
}
.iptvideo{
       ::v-deep.el-input__inner{
        width: 400px;
    }
}
.el-checkbox-group{
    width: 29.9%;
}
.citystyle{
    ::v-deep.el-form-item__content{
        margin-left: 0 !important;
    }
}
</style>
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
