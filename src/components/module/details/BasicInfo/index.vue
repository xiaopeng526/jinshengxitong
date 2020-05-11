<template>
  <div class="basic-info-component">
    <div class="section-content">
      <section-title :border="false" :tip="tip" :title="title"></section-title>
      <el-table :data="user_info" style="width: 100%">
        <el-table-column
          prop="workcode"
          label="工号"
          width="120"
        ></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="120"
        ></el-table-column>
        <el-table-column prop="age" label="年龄" width="120"></el-table-column>
        <el-table-column prop="business_unit" label="事业部"></el-table-column>
        <el-table-column prop="department" label="部门"></el-table-column>
        <el-table-column
          prop="level"
          label="职级"
          width="120"
        ></el-table-column>
      </el-table>
      <el-table :data="company_info" style="width: 100%">
        <el-table-column
          prop="joined_on"
          label="入司时间"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="this_level_on"
          label="上次晋升时间"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="level_experience_time_text"
          label="历练时间"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="satisfy_level_experience_time_text"
          label="满足历练时间"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="superior_name"
          label="直接上级"
        ></el-table-column>
        <el-table-column
          prop="job_family_desc"
          label="职务族群"
        ></el-table-column>
        <el-table-column prop="job_seq_desc" label="职务序列"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
// 详情页的个人信息部分
export default {
  props: {
    basic_info: {
      type: Object,
      default: () => ({})
    },
    employment_info: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      title: "个人信息",
      tip: "*以下不可编辑信息为系统原始信息，若有问题请及时与HRBP反馈"
    };
  },
  computed: {
    //TODO: 根据 info 属性自己组合成 table 的结构
    user_info() {
      return [
        {
          workcode: this.basic_info.workcode,
          name: this.basic_info.name,
          gender: this.basic_info.gender,
          age: this.basic_info.age,
          business_unit:
            this.employment_info.business_unit ||
            this.basic_info.business_unit_name,
          department:
            this.basic_info.department || this.basic_info.department_name,
          level: this.basic_info.level
        }
      ];
    },
    company_info() {
      return [
        {
          joined_on: this.basic_info.joined_on,
          this_level_on: this.basic_info.this_level_on,
          level_experience_time_text: this.employment_info
            .level_experience_time_text,
          satisfy_level_experience_time_text: this.basic_info
            .satisfy_level_experience_time_text,
          superior_name: this.basic_info.superior_name,
          job_family_desc: this.basic_info.job_family_desc,
          job_seq_desc: this.basic_info.job_seq_desc
        }
      ];
    }
  },
  components: {
    "section-title": () => import("@/components/common/SectionTitle/index.vue")
    // "content-frame": () =>
    //   import("@/components/common/SectionContentFrame/index.vue"),
  }
};
</script>
<style lang="scss" scoped>
.basic-info-component {
  & ::v-deep {
    .tip {
      color: #ff4b4b !important;
      margin-left: 14px;
    }
  }
  .section-content {
    margin-bottom: 20px;
  }
  & ::v-deep {
    .el-table__header th {
      background: rgba(245, 246, 247, 1);
    }
  }
}
</style>
<style></style>
