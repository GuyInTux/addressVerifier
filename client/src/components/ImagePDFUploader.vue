<template>
  <div
    id="app"
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    "
  >
    <h2>Upload Your Documents for Verification</h2>
    <h2 v-if="errorMsg" style="color: red">{{ errorMsg }}</h2>
    <div style="display: flex; align-items: center">
      <button
        @click="onUploadClick"
        style="margin-top: 20px; margin-bottom: 20px"
      >
        Choose File
      </button>
      <span style="margin-left: 10px">{{
        fileName ? fileName : "No File Chosen"
      }}</span>
    </div>
    <button v-if="fileUrl" @click="removeFile" style="margin-top: 20px">
      Remove File
    </button>
    <div id="preview" style="width: 500px; height: 750px;">
      <img
        v-if="fileType === 'image'"
        :src="fileUrl"
        style="margin-top: 30px; max-width: 100%; max-height: 100%;"
      />
      <embed
        v-else-if="fileType === 'pdf'"
        :src="fileUrl"
        type="application/pdf"
        style="width: 100%; height: 100%"
      />
    </div>
    <input
      type="file"
      ref="fileUpload"
      @change="onFileChange"
      style="display: none"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileUrl: null,
      fileType: null,
      errorMsg: null,
      fileName: null,
    };
  },
  methods: {
    onUploadClick() {
      this.errorMsg = null;
      this.$refs.fileUpload.click();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      const supportedImageFormats = ["png", "jpg", "jpeg", "webp"];
      const maxSize = 50 * 1024 * 1024; // 50MB in bytes

      if (file.size > maxSize) {
        this.errorMsg = "File size exceeds 50MB limit.";
        this.fileUrl = null;
        this.fileType = null;
        this.fileName = null;
      } else {
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (supportedImageFormats.includes(fileExtension)) {
          this.validateAndPreviewFile(file);
        } else if (fileExtension === "pdf") {
          const reader = new FileReader();
          reader.onloadend = (event) => {
            const contents = event.target.result;
            const lines = contents.split("\n").slice(0, 50);
            if (lines.some((line) => line.startsWith("%PDF"))) {
              this.validateAndPreviewFile(file);
              this.fileUrl = URL.createObjectURL(file);
              this.fileType = fileExtension;
            } else {
              this.errorMsg = "File is not a valid PDF.";
              this.fileUrl = null;
              this.fileType = null;
              this.fileName = null;
            }
          };
          reader.onerror = () => {
            this.errorMsg = "Error reading file.";
            this.fileUrl = null;
            this.fileType = null;
            this.fileName = null;
          };
          reader.readAsText(file);
        } else {
          this.errorMsg =
            "File format not supported. Please upload png, jpg, jpeg, webp, or pdf files only.";
          this.fileUrl = null;
          this.fileType = null;
          this.fileName = null;
        }
      }
    },
    validateAndPreviewFile(file) {
      this.errorMsg = null;
      this.fileUrl = URL.createObjectURL(file);
      this.fileType = file.type.split("/")[0];
      this.fileName = file.name;
    },
    removeFile() {
      this.fileUrl = null;
      this.fileType = null;
      this.fileName = null;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
