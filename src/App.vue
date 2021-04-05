<template>
  <div id="app">
    <TheNavbar />
    <TheHeader />
    <TheContent />
  </div>
</template>

<script>
import TheNavbar from "./components/layout/TheNavbar.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import TheContent from "./components/layout/TheContent.vue";

export default {
  name: "App",
  components: {
    TheNavbar,
    TheHeader,
    TheContent,
  },
};
</script>

<style>
@import './style/base/button.css';
@import './style/base/combobox.css';
@import './style/base/dialog.css';
@import './style/base/icon.css';
@import './style/base/input.css';
@import './style/base/table.css';
body {
  margin: 0;
}

.bg-primary {
  background-color: #01b075;
}

.text-align-center {
  text-align: center;
}

.text-align-right {
  text-align: right;
}

a {
  text-decoration: none;
  color: #000;
  cursor: pointer;
}
body {
  font-family: GoogleSans-Regular;
  font-size: 13px;
}

@font-face {
  font-family: "GoogleSans-Regular";
  src: url("./assets/font/GoogleSans-Regular.otf") format("opentype");
}

@font-face {
  font-family: "GoogleSans-Bold";
  src: url("./assets/font/GoogleSans-Bold.otf") format("opentype");
}

@font-face {
  font-family: "GoogleSans-Italic";
  src: url("./assets/font/GoogleSans-Italic.otf") format("opentype");
}

@font-face {
  font-family: "GoogleSans-BoldItalic";
  src: url("./assets/font/GoogleSans-BoldItalic.otf") format("opentype");
}

.bg-selected-row {
  background-color: #f0f0f0;
}
</style>
