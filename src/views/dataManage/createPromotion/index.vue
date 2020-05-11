<template>
  <div class="access-user-page">
    <content-frame>
      <el-row style="background:#fff;padding:14px 24px;">
        <el-col :span="24" align="end" justify="end">
          <el-button type="primary" @click="closePage" class="button"
            >取消</el-button
          >
          <el-button type="primary" @click="submitForm" class="button"
            >确定</el-button
          >
        </el-col>
      </el-row>
      <el-form
        :model="filterForm"
        ref="filterForm"
        :rules="rules"
        style="background:#fff;padding:24px;"
      >
        <el-form-item>
          <el-col :span="2">晋升名称</el-col>
          <el-col :span="10">
            <el-form-item prop="name">
              <el-input
                style="width:250px"
                :disabled="!can_edit"
                placeholder="请输入晋升名称"
                v-model="filterForm.name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">晋升月份</el-col>
          <el-col :span="10">
            <el-form-item prop="month">
              <el-date-picker
                @change="monthChange"
                :disabled="!can_edit"
                style="width:250px"
                v-model="filterForm.month"
                value-format="yyyy-MM"
                type="month"
                placeholder="选择月"
                format="yyyy-MM"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="2">提报开始时间</el-col>
          <el-col :span="10">
            <el-form-item prop="apply_start_time">
              <el-date-picker
                style="width:250px"
                :disabled="!can_edit"
                v-model="filterForm.apply_start_time"
                value-format="yyyy-MM-dd HH:mm"
                type="datetime"
                placeholder="请选择时间"
                format="yyyy-MM-dd HH:mm"
                :picker-options="startDatePicker"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">提报结束时间</el-col>
          <el-col :span="10">
            <el-form-item prop="apply_end_time">
              <el-date-picker
                style="width:250px"
                :disabled="apply_end_disabled"
                v-model="filterForm.apply_end_time"
                value-format="yyyy-MM-dd HH:mm"
                type="datetime"
                placeholder="请选择时间"
                format="yyyy-MM-dd HH:mm"
                :picker-options="endDatePicker"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="2">审批截止时间</el-col>
          <el-col :span="10">
            <el-form-item prop="promotion_end_time">
              <el-date-picker
                style="width:250px"
                :disabled="promotion_end_disabled"
                v-model="filterForm.promotion_end_time"
                value-format="yyyy-MM-dd HH:mm"
                type="datetime"
                placeholder="请选择时间"
                format="yyyy-MM-dd HH:mm"
                :picker-options="approvalEndDatePicker"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">晋升员工类型</el-col>
          <el-col :span="10">
            <el-form-item prop="type_id">
              <el-select
                v-model="filterForm.type_id"
                placeholder="请选择"
                :disabled="!can_edit"
              >
                <el-option
                  v-for="(v, i) of type_id_arr"
                  :key="i"
                  :label="v.label"
                  :value="v.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-col :span="2">可申报部门</el-col>
        <el-col :span="22">
          <el-form-item prop="dp">
            <el-input
              style="width:300px"
              :disabled="!can_edit"
              v-model="dp_name"
              icon="caret-bottom"
              readonly="readonly"
              @click.native.stop="selectDepTree"
            ></el-input>
          </el-form-item>
        </el-col>
        <p>
          以下职级员工若在此次提报破格晋升，上次晋级时间须在以下时间节点之前：
        </p>
        <el-form-item>
          <el-col :span="2">1.1-1.2级</el-col>
          <el-col :span="10">
            <el-form-item prop="level_special_time1">
              <el-date-picker
                style="width:250px"
                :disabled="!can_edit"
                v-model="filterForm.level_special_time1"
                type="datetime"
                placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">1.3-3.2级</el-col>
          <el-col :span="10">
            <el-form-item prop="level_special_time2">
              <el-date-picker
                style="width:250px"
                :disabled="!can_edit"
                v-model="filterForm.level_special_time2"
                type="datetime"
                placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <p>
          以下职级员工若在此次提报正常晋升，上次晋级时间须在以下时间节点之前：
        </p>
        <el-form-item>
          <el-col :span="2">1.1-1.2级</el-col>
          <el-col :span="10">
            <el-form-item prop="level_default_time1">
              <el-date-picker
                style="width:250px"
                :disabled="!can_edit"
                v-model="filterForm.level_default_time1"
                type="datetime"
                placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">1.3-3.2级</el-col>
          <el-col :span="10">
            <el-form-item prop="level_default_time2">
              <el-date-picker
                style="width:250px"
                :disabled="!can_edit"
                v-model="filterForm.level_default_time2"
                type="datetime"
                placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="2">3.3-4.1级</el-col>
          <el-col :span="10">
            <el-form-item prop="level_default_time3">
              <el-date-picker
                style="width:250px"
                :disabled="!can_edit"
                v-model="filterForm.level_default_time3"
                type="datetime"
                placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">4.2-5.2级</el-col>
          <el-col :span="10">
            <el-form-item prop="level_default_time4">
              <el-date-picker
                style="width:250px"
                :disabled="!can_edit"
                v-model="filterForm.level_default_time4"
                type="datetime"
                placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="2">5.3级及以上</el-col>
          <el-col :span="10">
            <el-form-item prop="level_default_time5">
              <el-date-picker
                style="width:250px"
                :disabled="!can_edit"
                v-model="filterForm.level_default_time5"
                type="datetime"
                placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <el-dialog
        v-if="showConflictConfirmDialog"
        :visible="showConflictConfirmDialog"
        @close="close"
        :close-on-click-modal="false"
        width="550px"
        center
        class="label-dialog"
      >
        <div slot="title" class="title">提示</div>
        <p>
          以下部门（发起人）在您所选择的申报期内，已存在晋升任务，无法发起新任务，
          您可与对应发起人沟通是否修改原任务，或去除以下部门，继续发起该任务。
        </p>
        <div>
          <span v-for="(item, i) in conflictDepSummary" :key="i">
            {{ item.department_name
            }}{{ item.creator_name ? "(" + item.creator_name + ")" : "" }}
            <br />
          </span>
        </div>
        <div slot="footer" center>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submitForm"
            >除去以上部门继续发起</el-button
          >
        </div>
      </el-dialog>
    </content-frame>
    <el-drawer :visible.sync="showPerformanceTree" direction="rtl">
      <dp-panel
        v-if="showPerformanceTree"
        key="showPerformanceTree"
        :checkedNodes.sync="filterForm.dp"
        :visible.sync="showPerformanceTree"
        :data="dpArr"
      ></dp-panel>
    </el-drawer>
  </div>
</template>

<script>
import { formatTime } from "@/utils/timeFormat";
import TreeSelectPanel from "@/components/common/TreeSelectPanel/index.vue";
import { EMPLOYEE_TYPE_ENUM } from "@/constants/TEXT";
import {
  getTeamDepartments,
  postPromotionCreate,
  PromotionEdit,
  PromotionInfo
} from "@/constants/API";

const timeFillRule = [
  {
    required: true,
    message: "晋升时间未填写，请填写后再提交",
    trigger: "change"
  }
];

export default {
  data() {
    return {
      filterProps: {
        value: "id",
        label: "name",
        children: "children"
      },
      filterForm: {
        name: "",
        month: "",
        apply_start_time: "",
        apply_end_time: "",
        promotion_end_time: "",
        type_id: "",
        dp: [],
        level_special_time1: "",
        level_special_time2: "",
        level_default_time1: "",
        level_default_time2: "",
        level_default_time3: "",
        level_default_time4: "",
        level_default_time5: ""
      },
      dpArr: [],
      rules: {
        name: [
          {
            required: true,
            message: "晋升名称未填写，请填写后再提交",
            trigger: "change"
          },
          { max: 30, message: "不能超过30个字符", trigger: "change" }
        ],
        month: [{ required: true, message: "晋升月份未填写，请填写后再提交" }],
        apply_start_time: [
          {
            required: true,
            message: "开始提报时间未填写，请填写后再提交",
            trigger: "change"
          }
        ],
        apply_end_time: [
          {
            required: true,
            message: "提报结束时间未填写，请填写后再提交",
            trigger: "change"
          }
        ],
        promotion_end_time: [
          {
            required: true,
            message: "审批截止时间未填写，请填写后再提交",
            trigger: "change"
          }
        ],
        type_id: [
          {
            required: true,
            message: "晋升员工类型未选择，请选择后再提交",
            trigger: "change"
          }
        ],
        dp: [
          {
            type: "array",
            required: true,
            message: "可申报部门未选择，请选择后再提交",
            trigger: "change"
          }
        ],
        level_special_time1: timeFillRule,
        level_special_time2: timeFillRule,
        level_default_time1: timeFillRule,
        level_default_time2: timeFillRule,
        level_default_time3: timeFillRule,
        level_default_time4: timeFillRule,
        level_default_time5: timeFillRule
      },
      type_id_arr: EMPLOYEE_TYPE_ENUM,
      showConflictConfirmDialog: false,
      conflictDepSummary: [], //冲突的部门总览数据
      showPerformanceTree: false,
      conflictDepIds: [], //冲突的部门 id
      can_edit: true,
      apply_end_disabled: false,
      promotion_end_disabled: false
    };
  },
  methods: {
    selectDepTree() {
      if (this.can_edit) {
        this.showPerformanceTree = !this.showPerformanceTree;
      }
    },
    close() {
      this.showConflictConfirmDialog = false;
    },
    getDepartments() {
      getTeamDepartments().then(res => {
        this.dpArr = res || [];
      });
    },
    monthChange(value) {
      if (value) {
        this.filterForm.level_special_time1 = this.cutMonth(3);
        this.filterForm.level_special_time2 = this.cutMonth(6);
        this.filterForm.level_default_time1 = this.cutMonth(6);
        this.filterForm.level_default_time2 = this.cutMonth(12);
        this.filterForm.level_default_time3 = this.cutMonth(24);
        this.filterForm.level_default_time4 = this.cutMonth(36);
        this.filterForm.level_default_time5 = this.cutMonth(48);
      } else {
        this.filterForm.level_special_time1 = "";
        this.filterForm.level_special_time2 = "";
        this.filterForm.level_default_time1 = "";
        this.filterForm.level_default_time2 = "";
        this.filterForm.level_default_time3 = "";
        this.filterForm.level_default_time4 = "";
        this.filterForm.level_default_time5 = "";
      }
    },
    cutMonth(num) {
      const dateObj = new Date(this.filterForm.month);
      const year = Math.floor(num / 12);
      if (year > 1) {
        dateObj.setFullYear(dateObj.getFullYear() - year);
      } else {
        dateObj.setMonth(dateObj.getMonth() - num);
      }
      const date = new Date(
        dateObj.getFullYear(),
        dateObj.getMonth() + 1,
        0
      ).getDate();
      return dateObj.setDate(date);
    },

    submitForm() {
      const filterForm = this.filterForm;
      const level_special_time_arr = {
        "1.1-1.2": formatTime(new Date(filterForm.level_special_time1)),
        "1.3-3.2": formatTime(new Date(filterForm.level_special_time2))
      };
      const level_default_time_arr = {
        "1.1-1.2": formatTime(new Date(filterForm.level_default_time1)),
        "1.3-3.2": formatTime(new Date(filterForm.level_default_time2)),
        "3.3-4.1": formatTime(new Date(filterForm.level_default_time3)),
        "4.2-5.2": formatTime(new Date(filterForm.level_default_time4)),
        "5.3-7": formatTime(new Date(filterForm.level_default_time5))
      };
      const data = {
        name: filterForm.name,
        month: filterForm.month,
        apply_start_time: filterForm.apply_start_time,
        apply_end_time: filterForm.apply_end_time,
        promotion_end_time: filterForm.promotion_end_time,
        type_id: this.filterForm.type_id,
        department_ids: this.showConflictConfirmDialog
          ? this.selectedDepsIgnoreConflict
          : this.department_ids,
        level_special_time: level_special_time_arr,
        level_default_time: level_default_time_arr
      };

      this.$refs.filterForm.validate(valid => {
        if (valid) {
          if (this.can_edit && new Date(data.apply_start_time) <= new Date()) {
            this.$message.error("申报开始时间需晚于当前时间");
            return;
          }
          if (data.apply_end_time <= data.apply_start_time) {
            this.$message.error("申报结束时间需晚于申报开始时间");
            return;
          }
          if (data.promotion_end_time <= data.apply_end_time) {
            this.$message.error("审批结束时间需晚于申报结束时间");
            return;
          }
          // 准备请求和参数
          let api = postPromotionCreate;
          const params = [data];
          let msg = "创建晋升成功";
          if (this.isEditMode) {
            api = PromotionEdit;
            params.unshift(this.promotion_id);
            msg = "更新晋升成功";
          }
          api(...params).then(res => {
            if (res.success) {
              this.$message({
                message: msg,
                type: "success"
              });
              this.$router.back();
            } else {
              // 二次确认
              this.conflictDepSummary = res.departments;
              this.conflictDepIds = res.all_department_ids;
              this.showConflictConfirmDialog = true;
            }
          });
        }
      });
    },

    getPromotionInfo() {
      PromotionInfo(this.promotion_id).then(res => {
        this.can_edit = res.in_draft_stage;
        this.filterForm = {
          name: res.name,
          month: res.month,
          apply_start_time: res.apply_start_time,
          apply_end_time: res.apply_end_time,
          promotion_end_time: res.promotion_end_time,
          type_id: res.type_id,
          dp: res.department_ids,
          level_special_time1: res.level_special_time["1.1-1.2"],
          level_special_time2: res.level_special_time["1.3-3.2"],
          level_default_time1: res.level_default_time["1.1-1.2"],
          level_default_time2: res.level_default_time["1.3-3.2"],
          level_default_time3: res.level_default_time["3.3-4.1"],
          level_default_time4: res.level_default_time["4.2-5.2"],
          level_default_time5: res.level_default_time["5.3-7"]
        };
        if (this.isEditMode && this.filterForm.apply_end_time) {
          this.apply_end_disabled =
            new Date() > new Date(this.filterForm.apply_end_time);
        }
        if (this.isEditMode && this.filterForm.promotion_end_time) {
          this.promotion_end_disabled =
            new Date() > new Date(this.filterForm.promotion_end_time);
        }
      });
    },
    closePage() {
      this.$router.back();
    }
  },

  computed: {
    selectedDepsIgnoreConflict() {
      return this.department_ids.filter(d => !this.conflictDepIds.includes(d));
    },
    dp_name() {
      return this.filterForm.dp.map(item => item.name).join(", ");
    },
    department_ids() {
      return this.filterForm.dp.map(item => item.department_id);
    },
    startDatePicker() {
      return {
        disabledDate: time => {
          // 小于当前时间禁止
          const lessThanNow = time.getTime() < Date.now() - 8.64e7;
          // 大于结束时间禁止
          const moreThanEndTime =
            new Date(this.filterForm.apply_end_time).getTime() < time.getTime();
          if (!this.filterForm.apply_end_time) return lessThanNow;
          if (this.isEditMode) {
            return lessThanNow || moreThanEndTime;
          }
          return moreThanEndTime;
        }
      };
    },
    endDatePicker() {
      return {
        disabledDate: time => {
          const lessThanStartTime =
            new Date(this.filterForm.apply_start_time).getTime() >
            time.getTime();
          return this.filterForm.apply_start_time && lessThanStartTime;
        }
      };
    },
    approvalEndDatePicker() {
      return {
        disabledDate: time => {
          const lessThanEndTime =
            new Date(this.filterForm.apply_end_time).getTime() > time.getTime();
          return this.filterForm.apply_end_time && lessThanEndTime;
        }
      };
    },
    pageType() {
      return this.$route.params.type;
    },
    promotion_id() {
      return this.$route.params.promotion_id;
    },
    isEditMode() {
      return this.pageType == "edit";
    }
  },
  components: {
    "content-frame": () =>
      import("@/components/common/SectionContentFrame/index.vue"),
    "dp-panel": TreeSelectPanel
  },
  created() {
    this.getDepartments();
    if (this.isEditMode) {
      this.getPromotionInfo();
    } else {
      this.can_edit = true;
    }
  }
};
</script>
<style scoped>
.label-dialog ::v-deep .el-dialog__header {
  border-bottom: 1px solid #e4e7ed;
}
.button {
  border: 1px solid #5dc5b2;
  border-radius: 30px;
}
</style>
