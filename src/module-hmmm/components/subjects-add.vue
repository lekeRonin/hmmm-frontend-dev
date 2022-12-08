<template>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
  <div class='container'>添加学科对话框</div>
</template>

<script>
export default {}
<<<<<<< HEAD
=======
  <el-dialog :title="getTitle()" :visible="AddDialog" class='container' width="30%" @close="OnClose">
    <el-form label-width="80px" :model="addForm" :rules="rules" ref="addSubject">
      <el-form-item label="学科名称" prop="subjectName">
        <el-input placeholder="请输入学科名称" v-model="addForm.subjectName"></el-input>
      </el-form-item>
    </el-form>
    <el-switch
        style="display: block"
        v-model=" value"
        inactive-color="#ff4949"
        active-color="#13ce66"
        inactive-text="是否显示">
    </el-switch>

    <template #footer>
      <el-row type="flex" justify="center">
        <!-- <el-col> -->
          <el-button size="small" @click="OnClose">取消</el-button>
          <el-button type="primary" size="small" @click="OnConfirm">确定</el-button>
        <!-- </el-col> -->
      </el-row>
    </template>

  </el-dialog>
</template>

<script>
import { AddSubjects, SubjectsById, EditSubjects } from '@/api/hmmm/subjects'
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
    }
  },
  data () {
    return {
      addForm: {
        subjectName: ''
      },
      rules: {
        subjectName: [
          { required: true, message: '请输入添加学科的名称', trigger: 'blur' },
          { max: 8, message: '长度在不能超过 8 个字符', trigger: 'blur' }
        ]
      },
      value: true
    }
  },
  methods: {
    async OnConfirm () {
      try {
        await this.$refs.addSubject.validate()
        const data = {
          subjectName: this.addForm.subjectName,
          isFrontDisplay: this.value === true ? 1 : 2
        }
        if (this.addForm.id) {
          await EditSubjects({ ...data, id: this.userId })
        } else {
          await AddSubjects(data)
        }
        this.$message.success(`${this.addForm.id ? '修改' : '添加'}成功`)
        this.$parent.localList()
        this.OnClose()
      } catch (error) {
        console.log(error, '验证不通过')
      }
    },
    async OnClose () {
      await this.$emit('update:AddDialog', false)
      this.$refs.addSubject.resetFields()
      this.addForm = {
        subjectName: ''
      }
    },
    // 数据回显
    async getSubjectsById (id) {
      const { data } = await SubjectsById(id)
      this.addForm = data
      this.value = data.isFrontDisplay === 1
    },
    getTitle () {
      return `${this.addForm.id ? '修改' : '添加'}学科`
    }
  }
}
>>>>>>> 759667730197835a878690b89b384df622d555d8
=======
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
</script>

<style scoped lang='less'></style>
