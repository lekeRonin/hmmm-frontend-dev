<template>
<<<<<<< HEAD
  <div class='container'>添加目录对话框</div>
</template>

<script>
export default {}
=======
  <div class='container'>
    <el-dialog :title="getTitle()" :visible="AddDialog" class='container' width="30%" @close="OnClose">
    <el-form  :model="addForm" :rules="rules"  ref="AddForm" label-width="120px">
      <el-form-item label="所属学科" v-show="this.nameValue ? false : true">
        <el-select v-model="addForm.subjectName" placeholder="请选择所属部门" style="width:100%">
          <el-option v-for="smple in SubjectsDta" :key="smple.id" :label="smple.label" :value="smple.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="目录名称" prop="directoryName">
        <el-input placeholder="请输入学科名称" v-model="addForm.directoryName" ></el-input>
      </el-form-item>

    </el-form>

    <template #footer>
      <el-row type="flex" justify="center">
        <!-- <el-col> -->
          <el-button size="small" @click="OnClose">取消</el-button>
          <el-button type="primary" size="small" @click="OnConfirm">确定</el-button>
        <!-- </el-col> -->
      </el-row>
    </template>

  </el-dialog>
  </div>
</template>

<script>
import { getSubjectsList } from '@/api/hmmm/subjects'
import { addDirectorys, EditDirectorys, getDirectorysById } from '@/api/hmmm/directorys'
export default {
  name: 'AddDialog',
  props: {
    AddDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: Number,
      default: null
    },
    // 从学科进入传递的值
    nameValue: {
      type: String,
      default: ''
    },
    subjectID: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      addForm: {
        subjectName: '',
        directoryName: ''
      },
      rules: {
        directoryName: [
          { required: true, message: '请输入添加学科的名称', trigger: 'blur' },
          { max: 8, message: '长度在不能超过 8 个字符', trigger: 'blur' }
        ]
      },
      SubjectsDta: []

    }
  },
  created () {
    this.getSubjectList()
  },
  methods: {
    async OnConfirm () {
      try {
        await this.$refs.AddForm.validate()
        const data = {
          subjectID: parseInt(this.subjectID) || this.addForm.subjectName,
          directoryName: this.addForm.directoryName
        }
        if (this.userId) {
          // console.log(data)
          await EditDirectorys({ ...data, id: this.userId })
        } else {
          await addDirectorys(data)
        }
        this.$message.success(`${this.userId ? '修改' : '添加'}成功`)
        this.$parent.localList()
        this.OnClose()
      } catch (error) {
        console.log(error, '验证不通过')
      }
    },
    async OnClose () {
      await this.$emit('update:AddDialog', false)
      this.$refs.AddForm.resetFields()
      this.addForm = {
        subjectName: '',
        directoryName: ''
      }
      if (this.userId) {
        this.$emit('clear')
      }
    },
    getTitle () {
      return `${this.userId ? '修改' : '添加'}学科`
    },
    async getSubjectList () {
      const res = await getSubjectsList()
      // console.log(res.data)
      this.SubjectsDta = res.data
    },
    async getDirectorysById (id) {
      const { data } = await getDirectorysById(id)
      this.addForm.directoryName = data.directoryName
      this.addForm.subjectName = data.subjectID
    }
  }
}
>>>>>>> 759667730197835a878690b89b384df622d555d8
</script>

<style scoped lang='less'></style>
