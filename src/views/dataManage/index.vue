<template>
  <div class="access-user-page">
    <div>
      <content-frame>
        <el-row style="background:#fff;padding:14px 24px;">
          <el-col :span="24" align="end" justify="end">
            <el-button type="primary" class="button" @click="createPromotion"
              >发起晋升</el-button
            >
          </el-col>
        </el-row>
        <el-table stripe :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="晋升名称" min-width="110px">
            <template slot-scope="scope">
              <span class="text" @click="promotionName(scope.row)">
                {{ scope.row.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="month" label="晋升月份"></el-table-column>
          <el-table-column
            prop="apply_start_time"
            label="申报开始时间"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="apply_end_time"
            label="申报结束时间"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="promotion_end_time"
            label="晋升结束时间"
            width="160"
          ></el-table-column>
          <el-table-column prop="creator_name" label="创建人"></el-table-column>
          <el-table-column
            prop="created_at"
            label="创建时间"
            width="160"
          ></el-table-column>
          <el-table-column width="150px" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="defaltPromotion(scope.row)"
                >查看</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="editPromotion(scope.row)"
                >修改</el-button
              >
              <el-button
                type="text"
                size="small"
                :disabled="!scope.row.can_delete"
                @click="deletePromotion(scope.row)"
                >删除</el-button
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
// 晋升数据管理列表
import { getPromotionManagerList, PromotionDelete } from "@/constants/API";
import {
  PATH_PROMOTION_DATA_ADD,
  PATH_PROMOTION_DATA_EDIT,
  PATH_MANAGE
} from "@/constants/URL";
import formMixin from "@/mixin/components/formMixin.ts";

export default {
  mixins: [formMixin],
  data() {
    return {
      tableListAPI: getPromotionManagerList
    };
  },
  methods: {
    getBaseParams() {
      return {
        page: this.currentPage,
        per_page: this.pageSize
      };
    },
    deletePromotion(row) {
      this.showConfirm("确定要删除这条晋升?")
        .then(() => {
          PromotionDelete(row.id).then(_ => {
            this.$message({
              message: "删除成功!",
              type: "success"
            });
            this.getTableList();
          });
        })
        .catch(() => {});
    },
    defaltPromotion(row) {
      this.$router.push({ path: PATH_MANAGE, query: { id: row.id } });
    },
    createPromotion() {
      this.$router.push(PATH_PROMOTION_DATA_ADD("add"));
    },
    editPromotion(row) {
      this.$router.push(PATH_PROMOTION_DATA_EDIT("edit", row.id));
    },
    promotionName(row) {
      this.$router.push({ path: PATH_MANAGE, query: { id: row.id } });
    }
  },
  components: {
    "content-frame": () =>
      import("@/components/common/SectionContentFrame/index.vue")
  },
  created() {
    this.getTableList();
  }
};
</script>
<style lang="scss" scoped>
.access-user-page {
  .text {
    color: #5dc5b2;
    cursor: pointer;
  }

  .button {
    border: 1px solid #5dc5b2;
    border-radius: 30px;
  }
}
</style>
