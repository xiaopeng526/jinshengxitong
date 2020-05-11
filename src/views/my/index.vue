<template>
  <div class="my-promotion-page">
    <div>
      <content-frame>
        <el-row style="background:#fff;padding:14px 24px;">
          <el-col :span="24" align="end" justify="end">
            <el-button
              v-if="selfReportAction"
              type="primary"
              @click="selfReport"
              style="border-radius: 20px;"
              >自主提报</el-button
            >
          </el-col>
        </el-row>
        <el-table stripe :data="tableData" style="width: 100%">
          <el-table-column label="晋升名称" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.can_apply">
                {{ scope.row.promotion_name }}
              </span>
              <span v-else class="text" @click="selfDetail(scope.row)">
                {{ scope.row.promotion_name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            :key="v.prop"
            v-for="v of tableColumns"
            :min-width="v['min-width']"
            :prop="v.prop"
            :label="v.label"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.can_apply"
                type="text"
                size="small"
                @click="selfReport(scope.row)"
                >填报</el-button
              >
              <el-button v-else disabled type="text" size="small"
                >填报</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <br />
        <el-row type="flex" justify="end">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="constants.PAGINATION_SIZE_ENUM"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="total"
          ></el-pagination>
        </el-row>
      </content-frame>
    </div>
  </div>
</template>

<script>
import { getMyPromotionList, getMyPromotionCanApply } from "@/constants/API";
import {
  PATH_PROMOTION_MY_REPORT,
  PATH_PROMOTION_DETAIL
} from "@/constants/URL";
import formMixin from "@/mixin/components/formMixin";

export default {
  mixins: [formMixin],
  data() {
    return {
      promotion_id: 0,
      promotion_user_id: 0,
      selfReportAction: false,
      tableColumns: Object.freeze([
        {
          prop: "level",
          label: "晋升前职级"
        },
        {
          prop: "target_level",
          label: "目标职级"
        },
        {
          prop: "my_list_promotion_status_text",
          label: "晋升状态"
        },
        {
          "min-width": "110",
          prop: "apply_time",
          label: "申报时间"
        },
        {
          prop: "my_list_promotion_type_text",
          label: "晋升类型"
        },
        {
          prop: "applicant_name",
          label: "提报人"
        }
      ]),
      tableListAPI: getMyPromotionList
    };
  },
  components: {
    "content-frame": () =>
      import("@/components/common/SectionContentFrame/index.vue")
  },
  methods: {
    getCanApply() {
      getMyPromotionCanApply().then(res => {
        this.promotion_id = res.extra_data.promotion_id;
        this.promotion_user_id = res.extra_data.promotion_user_id;
        this.selfReportAction = res.can_apply == 1;
      });
    },
    refresh() {
      this.getTableList(this.getBaseParams());
    },
    getBaseParams() {
      return {
        page: this.currentPage,
        per_page: this.pageSize
      };
    },
    selfReport(row) {
      if (row.promotion_id) {
        this.$router.push(
          PATH_PROMOTION_MY_REPORT(row.promotion_id, row.promotion_user_id)
        );
      } else {
        this.$router.push(
          PATH_PROMOTION_MY_REPORT(this.promotion_id, this.promotion_user_id)
        );
      }
    },
    selfDetail(row) {
      this.$router.push(
        PATH_PROMOTION_DETAIL("self", row.promotion_id, row.promotion_user_id)
      );
    }
  },
  created() {
    this.refresh();
    this.getCanApply();
  }
};
</script>
<style lang="scss" scoped>
.my-promotion-page {
  .text {
    color: #5dc5b2;
    cursor: pointer;
  }
}
</style>
