<template>
  <div id="pdf">
    <PDFViewer
      v-bind="{ url: $route.query.url }"
      @document-errored="onDocumentErrored"
    ></PDFViewer>
  </div>
</template>

<script>
import PDFViewer from "@/components/common/PDFViewer/PDFViewer.vue";
export default {
  components: {
    PDFViewer
  },
  data() {
    return {};
  },
  methods: {
    onDocumentErrored(e) {
      this.$message({
        message: e.text,
        type: "warning"
      });
    }
  }
};
</script>

<style scoped>
#pdf {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #62637a;
}
label.form {
  color: white;
  font-family: Monaco, "Courier New", Courier, monospace;
  font-weight: bold;
  margin-bottom: 2em;
  display: block;
}
input {
  padding: 0.45em;
  font-size: 1em;
}
.error {
  border: 1px solid red;
  background: pink;
  color: red;
  padding: 0.5em 3em;
  display: inline;
}

.box-shadow {
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
}
.overflow-hidden {
  overflow: hidden;
}
</style>
