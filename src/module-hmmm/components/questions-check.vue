<template>
  <div class="container">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="close">
      <div>
        <el-radio v-model="checkData.chkState" label="1" @change="change">通过</el-radio>
        <el-radio v-model="checkData.chkState" label="2" @change="change">拒绝</el-radio>
        <p>审核意见:</p>
        <el-row>
          <el-input type="textarea" placeholder="请输入内容" :rows="2" resize="none" v-model="checkData.chkRemarks"> </el-input>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('close')">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { choiceCheck } from '@/api/hmmm/questions'
export default {
  data () {
    return {
      checkData: {
        chkState: '1', // 1 通过 2 不通过
        chkRemarks: '' // 审核备注
      }
    }
  },
  methods: {
    async onSubmit () {
      if (this.checkData.chkRemarks.trim().length === 0) {
        return this.$message.warning('请输入审核意见')
      }
      const data = await choiceCheck({
        id: this.questionItem.id,
        chkState: +this.checkData.chkState,
        chkRemarks: this.checkData.chkRemarks
      })
      this.$emit('close')
      this.$message.success('审核成功')
    },
    change () {
      console.log(this.checkData.chkState)
    },
    close () {
      this.$emit('close')
      checkData.chkRemarks = ''
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    questionItem: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.el-textarea {
  .el-textarea__inner {
    resize: none;
    resize: none !important;
  }
}
</style>