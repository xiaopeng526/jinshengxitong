<template>
  <div class="weekly-detail-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <div v-for="(item, i) in week_report.customer" :key="i">
        <p>
          <span class="text">客户心声{{ number[i] }}</span>
          <span class="date_title">发布日期</span>
          <el-date-picker
            :disabled="!edit ? true : false"
            v-model="item.date"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </p>
        <vue-editor
          :style="[{ background: edit ? '#fff' : '#F5F7FA' }]"
          :disabled="!edit ? true : false"
          :placeholder="edit_palceholder"
          :editorToolbar="customToolbar"
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="item.content"
        >
        </vue-editor>
      </div>
      <div v-for="(item, i) in week_report.study" :key="'s' + i">
        <p>
          <span class="text">学习与反思{{ number[i] }}</span>
          <span class="date_title">发布日期</span>
          <el-date-picker
            :disabled="!edit ? true : false"
            v-model="item.date"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </p>
        <vue-editor
          :style="[{ background: edit ? '#fff' : '#F5F7FA' }]"
          :disabled="!edit ? true : false"
          :placeholder="edit_palceholder"
          :editorToolbar="customToolbar"
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="item.content"
        >
        </vue-editor>
      </div>
    </div>
  </div>
</template>

<script>
// 详情页的周报
import { VueEditor } from "vue2-editor";
import axios from "axios";
import { postImgUpload } from "@/constants/URL";

export default {
  props: {
    week_report: {
      type: Object,
      default: () => ({})
    },
    edit: {
      type: Boolean,
      default: true
    }
  },
  components: {
    VueEditor,
    "section-title": () => import("@/components/common/SectionTitle/index.vue")
  },

  data() {
    return {
      title: "周报",
      number: ["一", "二", "三"],
      editor: null,
      // callback_data: {},
      edit_palceholder: this.edit
        ? "1000字以内，点击编辑栏图片按钮可上传图片"
        : "",
      htmlForEditor: "khgbkjbg ",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ]
    };
  },

  methods: {
    callback_input() {
      return {
        customer0: this.week_report.customer[0].content,
        customer1: this.week_report.customer[1].content,
        customer2: this.week_report.customer[2].content,
        learning0: this.week_report.study[0].content,
        learning1: this.week_report.study[1].content,
        learning2: this.week_report.study[2].content
      };
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      formData.append("token", this.getToken());
      axios({
        url: postImgUpload(),
        method: "POST",
        data: formData
      })
        .then(result => {
          const url = result.data.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          Editor.setSelection(length + 1);
          resetUploader();
        })
        .catch(_ => {
          // console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.weekly-detail-component {
  background: #fff;
  .section-content {
    margin-bottom: 20px;
  }
}
</style>
