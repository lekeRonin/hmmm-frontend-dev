<template>
    <div class="page-tools">
      <el-row type="flex"  align="center">
        <el-col type="flex">
          <!-- 左插槽 -->
          <slot name="left" />
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="end" align="center">
            <!-- 右插槽 -->
            <slot name="right" />
          </el-row>
        </el-col>
      </el-row>
      <el-row class="tools">
        <i class="el-icon-info" /> 一共{{total}}条数据
      </el-row>
    </div>
  </template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    }
  }
}
</script>

  <style lang='scss'>
   .page-tools {
      margin: 10px 0;
      padding: 10px  0;
      .tools {
        line-height: 25px;
        height: 25px;
        padding-left: 10px;
        background: #f4f4f5;
      }
      i {
        margin-right: 5px;
        color: #909399;
      }
    }
  </style>
