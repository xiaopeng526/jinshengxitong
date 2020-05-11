<!-- ElTableColumnPro.vue -->
<template>
  <el-table-column
    v-if="visible"
    :formatter="formatter"
    :align="align"
    :prop="prop"
    :header-align="headerAlign"
    :fixed="fixed"
    :label="label"
    :multiple="multiple"
    :min-width="minWidth"
    :width="width"
    :render-header="renderHeader"
    :show-overflow-tooltip="showOverflowTooltip"
    :sortable="sortable"
  >
    <template slot-scope="scope">
      <slot :row="scope.row" :$index="scope.$index">
        <span>{{ fomatMethod(scope.row[prop]) }}</span>
      </slot>
    </template>
  </el-table-column>
</template>

<script>
// import moment from "moment";

export default {
  name: "el-table-column-pro",
  props: {
    prop: {
      type: String
    },
    label: {
      type: String
    },
    fixed: {
      type: [String, Boolean]
    },
    multiple: {
      type: Boolean,
      default: false
    },
    showOverflowTooltip: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: ""
    },
    minWidth: {
      type: Number
    },
    renderType: {
      type: String,
      validator: value => ["date", "input", "select"].includes(value)
    },
    placeholder: {
      type: String
    },
    param: {
      type: [String, Array],
      default: ""
    },
    startDate: {
      type: String
    },
    endDate: {
      type: String
    },
    selectList: {
      type: Array
    },
    isClear: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: true
    },
    filterIcon: {
      type: String,
      default: "el-icon-search"
    },
    callback: {
      type: Function
    },
    formatter: {
      type: Function,
      default: (row, column, cellValue) => cellValue
    },
    align: {
      type: String
    },
    headerAlign: {
      type: String
    },
    sortable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formatD: this.filterIcon
    };
  },

  methods: {
    fomatMethod(value) {
      return this.formatter("", "", value);
    },

    renderHeader(createElement, { column, $index }) {
      switch (this.renderType) {
        // case "date":
        //   return this.renderDate(createElement, { column, $index });

        case "input":
          return this.rederInput(createElement, { column, $index });

        case "select":
          return this.rederSelect(createElement, { column, $index });

        default:
          return this.rederDefault(createElement, { column, $index });
        // return column.label;
      }
    },

    // eslint-disable-next-line no-unused-vars
    rederDefault(createElement, { column, $index }) {
      return createElement(
        "div",
        {
          class: this.fixed ? "filters fix-table" : "filters",
          style: {
            color: column.color
          }
        },
        [
          createElement("el-input", {
            class: "table-readonly table-input",
            style: {
              padding: 0,
              borderRadius: "4px"
            },
            props: {
              value: column.label,
              label: column.label
            },
            attrs: {
              placeholder: this.placeholder,
              readonly: "readonly"
            }
          })
        ]
      );
    },

    // eslint-disable-next-line max-lines-per-function,no-unused-vars
    rederInput(createElement, { column, $index }) {
      return createElement(
        "div",
        {
          class: "filters",
          style: {
            color: column.color
          }
        },
        [
          createElement("el-input", {
            class: "table-input",
            style: {
              padding: 0,
              borderRadius: "4px"
            },
            props: {
              clearable: !this.isClear,
              value: this.param,
              label: this.label
            },
            attrs: {
              placeholder: this.placeholder
            },
            on: {
              input: event => {
                // if (event.keyCode === 13) {

                // }
                this.$emit("update:param", event);
                this.callback && this.callback(column.label);
              }
            }
          }),
          createElement(
            "span",
            {
              slot: "reference"
            },
            [
              createElement("i", {
                class: this.filterIcon,
                style: {
                  position: "absolute",
                  right: "10px",
                  top: "12px",
                  fontWeight: "700"
                },
                on: {
                  click: event => {
                    this.$emit(
                      "update:param",
                      event.target.parentNode.previousSibling.childNodes[1]
                        .value
                    );
                    this.callback && this.callback(column.label);
                  }
                }
              })
            ]
          )
        ]
      );
    },

    // eslint-disable-next-line no-unused-vars
    rederSelect(createElement, { column, $index }) {
      return createElement(
        "div",
        {
          class: "filters",
          style: {
            color: column.color,
            lineHeight: "0px"
          }
        },
        [
          createElement(
            "el-select",
            {
              class: "table-select",
              style: {
                padding: 0
              },
              props: {
                placeholder: this.placeholder,
                value: this.param,
                clearable: this.isClear,
                multiple: this.multiple,
                "collapse-tags": true
              },

              on: {
                input: value => {
                  this.$emit("update:param", value);
                  this.callback && this.callback(column.label);
                }
              }
            },
            [
              this.selectList.map(item => {
                return createElement("el-option", {
                  props: {
                    value: item.value,
                    label: item.label
                  }
                });
              })
            ]
          )
        ]
      );
    }

    // renderDate(createElement, { column, $index }) {
    //   return createElement(
    //     "div",
    //     {
    //       class: "filters",
    //       style: {
    //         color: column.color
    //       }
    //     },
    //     [
    //       createElement("el-date-picker", {
    //         class: "table-date-picker",
    //         props: {
    //           value: this.param,
    //           type: "daterange",
    //           rangeSeparator: "至",
    //           startPlaceholder: "预订开始日期",
    //           endPlaceholder: "预订结束日期"
    //         },
    //         style: {
    //           padding: 0,
    //           paddingLeft: "10px",
    //           border: "none",
    //           width: `${this.width - 10}px`,
    //           backgroundColor: "#ebeef0",
    //           color: "#333"
    //         },
    //         on: {
    //           input: value => {
    //             if (value) {
    //               const startDate = moment(value[0]).format("YYYY-MM-DD");
    //               const endDate = moment(value[1]).format("YYYY-MM-DD");
    //               this.$emit("update:startDate", startDate);
    //               this.$emit("update:endDate", endDate);
    //               this.callback && this.callback(column.label);
    //             } else {
    //               this.$emit("update:startDate", "");
    //               this.$emit("update:endDate", "");
    //               this.callback && this.callback(column.label);
    //             }
    //           }
    //         }
    //       })
    //     ]
    //   );
    // }
  }
};
</script>
<style>
.el-table th div.filters {
  line-height: 0;
  padding: 0;
  width: calc(100% + 10px);
}
.table-input .el-input__inner,
.table-select .el-input__inner {
  /* color: #333; */
  border: none;
  padding: 0 40px 0 10px;
  background: #f2f2f2;
  font-size: 13px;
  color: #666666;
  letter-spacing: 0;
}
.is-sortable .el-input__inner {
  padding: 0 40px 0 40px;
}
.is-sortable .caret-wrapper {
  display: inline-block;
  position: absolute;
  top: 5px;
}
.el-select.table-select .el-input .el-select__caret {
  font-weight: 700;
  color: #909399;
}
.table-input .el-input__inner::placeholder,
.table-select .el-input__inner::placeholder,
.table-date-picker .el-range-input::placeholder {
  color: #333;
}
.table-readonly .el-input__inner {
  cursor: default;
}
.table-select .el-input {
  padding: 0;
}
.table-date-picker input {
  background-color: #ebeef0;
}
.table-date-picker.el-date-editor .el-range-separator {
  line-height: 40px;
}
.el-table th div.filters.fix-table {
  margin-left: -10px;
}
/* .el-table__header */
.el-table__fixed {
  padding-right: 10px;
}
.table-select {
  width: 100%;
}
</style>
