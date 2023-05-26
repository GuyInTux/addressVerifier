<template>
    <div id="app">
      <!-- <ImagePDFUploader/> -->
      <ServerSideTest/>
    </div>
  </template>
  
  <script>
  // import ImagePDFUploader from './components/ImagePDFUploader.vue'
  import ServerSideTest from './components/ServerSideTest.vue'
  
  export default {
    components: {
      // ImagePDFUploader
      ServerSideTest
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