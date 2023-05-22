<template>
  <div id="app">
    <ImagePDFUploader/>
  </div>
</template>

<script>
import ImagePDFUploader from './components/ImagePDFUploader.vue'

export default {
  components: {
    ImagePDFUploader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
