import { PAGINATION_SIZE_ENUM } from "@/constants/TEXT";
export default {
  data() {
    return {
      pageSize: 20,
      currentPage: 1,
      total: 0,
      tableData: [],
      constants: {
        PAGINATION_SIZE_ENUM
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.getTableList({ ...this.getBaseParams(), page: val });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getTableList({ ...this.getBaseParams(), per_page: val, page: 1 });
    },
    getTableList(params) {
      this.startLoading();
      this.tableListAPI(params).then((res: any) => {
        const { data, total } = res;
        this.tableData = data;
        this.total = total;
        this.stopLoading();
      });
    }
  }
};
