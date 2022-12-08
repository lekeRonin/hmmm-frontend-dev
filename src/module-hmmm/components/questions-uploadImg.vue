<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :http-request="upload"
    >
     <i class="el-icon-circle-close icon-error"></i>
      <img v-if="value" :src="value" class="avatar">
      <span v-else class="avatar-uploader">上传图片
      </span>
    </el-upload>
  </div>
</template>
<script>
const COS = require('cos-js-sdk-v5')
const cos = new COS({
  SecretId: 'AKIDwwulRsDRsEXn0BINPHwZAh91rgUcgdHn',
  SecretKey: 'VAzkTPKD5yoiZFvWvHKRYefcXPBzo3Fd'
})
export default {
  name: 'UploadImg',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  methods: {
    upload (res) {
      console.log(res)
      if (res.file) {
        cos.putObject({
          Bucket: 'feico-1308671654',
          Region: 'ap-shanghai',
          Key: res.file.name,
          StorageClass: 'STANDARD',
          Body: res.file
        }, (err, data) => {
          if (err) {
            console.log(err)
          }
          if (data.statusCode === 200) {
            const urlImg = `https:${data.Location}`
            this.$emit('input', urlImg)
          }
        })
      }
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  margin-left: 5px;
  position: relative;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader {
  display: block;
  font-size: 14px;
  width: 100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.icon-error{
    position: absolute;
    right: -7px;
    top: -7px;
    font-size: 18px;
}
.avatar {
  width: 100px;
  height: 60px;
  display: block;
}
</style>
