<template>
  <div class="promotion-dialog">
    <el-form
      label-width="130px"
      label-position="right"
      :model="form"
      :rules="rules"
      ref="form"
    >
      <p class="el-form-item">
        <span style="width: 130px;" class="el-form-item__label">姓名:</span>
        <span class="el-form-item__content">{{ data.name }}</span>
      </p>
      <el-form-item prop="promotion_id" label="晋升任务:">
        <el-select v-model="form.promotion_id" placeholder="晋升任务">
          <el-option
            v-for="v in promotions"
            :key="v.promotion_id"
            :label="v.name"
            :value="v.promotion_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <p class="el-form-item">
        <span style="width: 130px;" class="el-form-item__label">现职级:</span>
        <span class="el-form-item__content">{{ data.level }}</span>
      </p>

      <el-form-item prop="target_level" label="目标职级:">
        <el-select
          :disabled="promotionLvDisable"
          v-model="form.target_level"
          placeholder="目标职级"
          @change="levelChange"
        >
          <el-option
            v-for="(v, i) of targetLevelArr"
            :key="i"
            :label="v.label"
            :value="v.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="promotion_type" label="晋升类型:">
        <el-select
          @change="typeChange"
          v-model="form.promotion_type"
          placeholder="晋升类型"
        >
          <el-option
            v-for="(v, k) in promotionTypes"
            :key="k"
            :label="v"
            :value="k"
          ></el-option>
        </el-select>
      </el-form-item>

      <p class="el-form-item is-required">
        <span style="width: 130px;" class="el-form-item__label"
          >审批意见及评语:</span
        >
      </p>
      <el-form-item prop="opinion">
        <el-input
          type="textarea"
          v-model="form.opinion"
          :rows="4"
          maxlength="200"
          show-word-limit
          placeholder="请输入审批意见及评语"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="btnGroup">
      <el-button @click="close">取消</el-button>
      <el-button :loading="isLoading" type="primary" @click="submit"
        >确定
      </el-button>
    </div>
  </div>
</template>
<script>
import {
  postTeamPromotionsApply,
  getTeamPromotions,
  searchPromotionType
} from "@/constants/API";
import { LEVEL_COLLECTION } from "@/constants/TEXT";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        promotion_id: "",
        target_level: "",
        promotion_type: "",
        opinion: ""
      },
      rules: {
        opinion: [
          { required: true, message: "请输入审批意见及评语", blur: "blur" }
        ],
        target_level: [
          { required: true, message: "请选择目标级别", trigger: "change" }
        ],
        promotion_id: [
          { required: true, message: "请选择晋升任务", trigger: "change" }
        ],
        promotion_type: [
          { required: true, message: "请选择晋升类型", trigger: "change" }
        ]
      },
      promotions: [],
      promotionTypes: {},
      isLoading: false,
      promotionLvDisable: false
    };
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    levelChange(val) {
      this.form.target_level = val;
      if (!this.form.promotion_id) {
        this.$message.error("请先选择晋升任务");
        this.form.target_level = "";
      } else {
        const params = {
          workcode: this.data.workcode,
          target_level: this.form.target_level,
          promotion_id: this.form.promotion_id
        };
        searchPromotionType(params).then(res => {
          this.promotionTypes = res || {};
        });
      }
    },
    typeChange(type) {
      // 直接是下一级 并且 选的正常晋升
      const isNormalPromotion =
        this.form.target_level == this.nextLv &&
        this.promotionTypes[type].includes("正常");
      this.promotionLvDisable = isNormalPromotion;
    },
    getPromotions() {
      getTeamPromotions({ workcode: this.data.workcode }).then(res => {
        this.promotions = res || [];
      });
    },

    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const postData = {
            promotion_id: this.form.promotion_id,
            workcode: this.data.workcode,
            target_level: this.form.target_level,
            promotion_type: this.form.promotion_type,
            opinion: this.form.opinion
          };
          this.isLoading = true;
          postTeamPromotionsApply(postData)
            .then(_ => {
              this.$message.success("提交成功");
              this.$emit("refresh");
              this.close();
            })
            .catch(_ => {})
            .finally(() => {
              this.isLoading = false;
            });
        }
      });
    }
  },
  computed: {
    targetLevelArr() {
      //获取目标职级
      const currentIndex = LEVEL_COLLECTION.findIndex(
        i => +this.data.level == i
      );

      const preLevel = LEVEL_COLLECTION[currentIndex + 1];
      const nextLevel = LEVEL_COLLECTION[currentIndex + 2];

      return this.data.level
        ? [
            {
              label: preLevel,
              value: preLevel
            },
            {
              label: nextLevel,
              value: nextLevel
            }
          ]
        : [];
    },
    nextLv() {
      //获取目标职级
      const currentIndex = LEVEL_COLLECTION.findIndex(
        i => +this.data.level == i
      );
      return LEVEL_COLLECTION[currentIndex + 1];
    }
  },
  created() {
    this.getPromotions();
  }
};
</script>
<style lang="scss" scoped>
.promotion-dialog {
  padding: 20px;
  .btnGroup {
    display: flex;
    justify-content: center;
  }
}
</style>
