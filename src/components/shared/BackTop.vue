<template>
  <div id="back-top-wrapper" @click="backTop">
    <span class="fa fa-chevron-up"></span><span>TOP</span>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    methods: {
      backTop () {
        $('html, body').animate({
          scrollTop: 0
        }, 500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/scss/global.scss';

  #back-top-wrapper {
    @extend .flex-default;
    width: 60px;
    height: 30px;
    background-color: $color2;
    border-radius: 5px;
    position: fixed;
    bottom: 20px;
    right: 40px;
    color: $color4;
    font-size: $fsize6;
    font-weight: bold;
    cursor: pointer;
    span {
      &:first-child {
        padding-top: 3px;
        padding-right: 5px;
      }
    }
  }
</style>
