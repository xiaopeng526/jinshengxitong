<template>
  <div class="apply-info-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <p>
        <el-row type="flex" align="middle">
          <el-col :span="5">
            <div>籍贯：{{ user_info.birthplace }}</div>
          </el-col>
          <el-col :span="3">民族：{{ user_info.nation }}</el-col>
          <el-col :span="4">
            <div>政治面貌：{{ user_info.political }}</div>
          </el-col>
          <el-col :span="5">手机号码:{{ user_info.phone }}</el-col>
          <el-col :span="7">
            <div>当前岗位：{{ employment_info.job }}</div>
          </el-col>
        </el-row>
      </p>
      <p>
        <el-row type="flex">
          <el-col :span="5">生日:{{ user_info.birthday }}</el-col>
          <el-col :span="3">
            <div>司龄：{{ user_info.company_service_length }}</div>
          </el-col>
          <el-col :span="4">
            <div>管理年限：{{ user_info.manage_year }}</div>
          </el-col>
          <el-col :span="5">
            <div>婚否：{{ basic_info.marriage }}</div>
          </el-col>
          <el-col :span="7">
            子女情况:
            <el-input
              size="mini"
              :disabled="!edit ? true : false"
              v-model="basic_info_back.boy"
              maxlength="2"
              class="small_input"
              onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
              style="width:28px;padding:0px; margin:0 10px;"
            ></el-input
            >子
            <el-input
              size="mini"
              :disabled="!edit ? true : false"
              v-model="basic_info_back.girl"
              maxlength="2"
              onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
              style="width:28px;padding:0px; margin:0 10px;"
              class="small_input"
            ></el-input
            >女
          </el-col>
        </el-row>
      </p>
      <p>
        <el-row type="flex">
          <el-col :span="8">
            <div>当前岗位在岗时长：{{ user_info.company_service_length }}</div>
          </el-col>
          <!-- <el-col width="50px">专业经验(年数):</el-col> -->
          <el-col :span="16">
            <div>
              <!-- {{ user_info.profession_experience.length }} -->
              专业经验(年数)
              <template v-if="user_info.profession_experience">
                <span
                  style="margin:0 10px"
                  v-for="(item, i) of user_info.profession_experience"
                  :key="i"
                  >{{ item.name }}{{ item.years }}</span
                >
              </template>
            </div>
          </el-col>
        </el-row>
      </p>
      <p>
        <el-row type="flex">
          <!-- <el-col :span="4">当前职级:</el-col> -->
          <el-col :span="8">
            <div>
              当前职级历练时间：{{ employment_info.level_experience_time_text }}
            </div>
          </el-col>
          <el-col :span="8">
            <div>拟晋职级：{{ basic_info_back.target_level }}</div>
          </el-col>
          <el-col :span="8">
            <template>
              是否跨级:
              {{ basic_info_back.is_skip_level == "1" ? "是" : "否" }}
            </template>
          </el-col>
        </el-row>
      </p>
      <p>
        <el-row type="flex" align="middle">
          <el-col :span="4" justify="center">
            <span>个人发展规划：</span>
          </el-col>
          <el-col :span="20">
            <el-input
              size="small"
              :disabled="!edit ? true : false"
              type="text"
              maxlength="30"
              v-model="basic_info_back.development_plan"
              style="border-radius: 0px;"
              placeholder="30字以内"
              show-word-limit
            ></el-input>
          </el-col>
        </el-row>
      </p>
      <p>
        <el-row type="flex" align="middle">
          <el-col :span="8"
            >直接上级岗位名称：{{ user_info.superior_position }}</el-col
          >
          <el-col :span="8">
            <div>
              现负责团队人数：
              <el-input
                size="mini"
                :disabled="!edit ? true : false"
                v-model="basic_info_back.team_people_count"
                maxlength="30"
                onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                style="width:100px;padding:0px; margin:0 10px;"
                class="small_input"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <template v-if="is_hrd">
              是否破格提报:
              {{ is_promotion_post == "1" ? "是" : "否" }}
            </template>
          </el-col>
        </el-row>
      </p>
      <p>
        <el-row type="flex" align="middle" v-if="is_hrd">
          <el-col :span="3">岗位未来规划</el-col>
          <el-col :span="21">
            <el-input
              type="text"
              :disabled="true"
              v-model="hr_approved_node.user_node_opinion.plan"
              placeholder="请输入岗位未来规划"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-col>
        </el-row>
      </p>
      <p>
        <el-row type="flex" align="middle" v-if="is_hrd">
          <el-col :span="3">横向发展岗位</el-col>
          <el-col :span="21">
            <el-input
              type="text"
              :disabled="true"
              v-model="hr_approved_node.user_node_opinion.post"
              placeholder="请输入横向发展岗位"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-col>
        </el-row>
      </p>
      <p>
        <el-row v-if="is_hrd">
          <el-col :span="3">晋级资格情况</el-col>
          <el-col :span="21">
            <el-checkbox-group v-model="qualification" :disabled="true">
              <el-checkbox
                v-for="v in qualification_arr"
                :label="v.id"
                :key="v.id"
                >{{ v.value }}</el-checkbox
              >
            </el-checkbox-group>
          </el-col>
        </el-row>
      </p>
      <p>
        <el-row v-if="is_hrd">
          <el-col :span="3">破格提报情形</el-col>
          <el-col :span="21">
            <el-checkbox-group v-model="condition" :disabled="true">
              <el-checkbox
                v-for="v in condition_arr"
                :label="v.id"
                :key="v.id"
                >{{ v.value }}</el-checkbox
              >
            </el-checkbox-group>
          </el-col>
        </el-row>
      </p>
      <p>
        <el-row v-if="is_hrd">
          <el-col :span="3">人才流动</el-col>
          <el-col :span="21">
            <el-checkbox-group v-model="flow_talent">
              <el-checkbox
                v-for="v in flow_talent_arr"
                :disabled="true"
                :label="v.id"
                :key="v.id"
                >{{ v.value }}</el-checkbox
              >
            </el-checkbox-group>
          </el-col>
        </el-row>
      </p>
    </div>
  </div>
</template>
<script>
// 详情页的基本信息
export default {
  props: {
    currentInfo: {
      type: Object,
      default: () => ({})
    },
    basic_info: {
      type: Object,
      default: () => ({})
    },
    employment_info: {
      type: Object,
      default: () => ({})
    },
    basic_info_back: {
      type: Object,
      default: () => ({})
    },
    edit: {
      type: Boolean,
      default: true
    },
    hr_approved_node: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      title: "基本信息",
      qualification_arr: [
        { id: 1, value: "岗位上限不符合" },
        { id: 2, value: "历练时间不符合" },
        { id: 3, value: "业绩不符合" },
        { id: 4, value: "文化不符合" },
        { id: 5, value: "支教经历不符合" }
      ],
      condition_arr: [
        { id: 1, value: "愿吃亏：如主动去钱库业务" },
        { id: 2, value: "愿担当：如主动承担挑战性怒飙" },
        {
          id: 3,
          value: "潜力大：近两年业绩指标达成情况卓越，未来发展潜力巨大"
        },
        { id: 4, value: "其他" }
      ],
      flow_talent_arr: [
        { id: 1, value: "人才流动-1.5" },
        { id: 2, value: "事业部内部跨地区-1分" },
        { id: 3, value: "活水计划-1分" },
        { id: 4, value: "事业部内部且本地区-0.5分" }
      ],
      is_hrd: this.hr_approved_node.node_id == "400"
    };
  },
  created() {},
  methods: {},
  components: {
    "section-title": () => import("@/components/common/SectionTitle/index.vue")
  },
  computed: {
    user_info() {
      return this.basic_info;
    },
    company_info() {
      return this.company_info;
    },
    flow_talent() {
      return JSON.parse(this.hr_approved_node.flow_talent);
    },
    is_promotion_post() {
      return this.hr_approved_node.user_node_opinion
        ? this.hr_approved_node.user_node_opinion.is_promotion_post.toString()
        : "";
    },
    is_special() {
      return this.hr_approved_node.user_node_opinion
        ? this.hr_approved_node.user_node_opinion.is_special.toString()
        : "";
    },
    qualification() {
      return this.hr_approved_node.user_node_opinion
        ? JSON.parse(this.hr_approved_node.user_node_opinion.qualification)
        : "";
    },
    condition() {
      return this.hr_approved_node.user_node_opinion
        ? JSON.parse(this.hr_approved_node.user_node_opinion.condition)
        : "";
    }
  }
};
</script>
<style lang="scss" scoped>
.apply-info-component {
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
    .el-input__inner {
      padding: 0px;
      border-radius: 0px;
    }
  }
  & ::v-deep {
    .el-table__header th {
      background: rgba(245, 246, 247, 1);
    }
  }
}
</style>
