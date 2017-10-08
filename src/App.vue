<template>
  <div id="app-wrapper">
    <div class="divider"></div>
    <app-header></app-header>

    <main>
      <transition name="g-animate" animate enter-active-class="pt-page-moveFromLeftFade" leave-active-class="pt-page-moveToRightFade">
      <router-view></router-view>
      </transition>
    </main>

    <app-footer></app-footer>
    <app-back-top v-if="backTopVisible"></app-back-top>
  </div>
</template>

<script>
  import Header from './components/shared/Header.vue'
  import Footer from './components/shared/Footer.vue'
  import BackTop from './components/shared/BackTop.vue'

  export default {
    components: {
      'app-header': Header,
      'app-footer': Footer,
      'app-back-top': BackTop
    },
    data () {
      return {
        backTopVisible: false
      }
    },
    methods: {
      updateScroll () {
        let vm = this
        // shows backtop button when scrolled below initial viewport height
        if (window.scrollY > window.innerHeight) {
          vm.backTopVisible = true
        } else {
          vm.backTopVisible = false
        }
      }
    },
    mounted () {
      window.addEventListener('scroll', this.updateScroll)
    }
  }
</script>

<style lang="scss">
  @import './assets/styles/scss/variables.scss';
  @import './assets/styles/scss/animations.scss';

  html {font-size: 16px;}

  body {
    background-color: $color2;
    color: $color1;
    font-family: 'Source Sans Pro', sans-serif;
    line-height: 1.45;
    min-width: 320px;
    max-width: 1920px;
  }

  main {
    // background-image: url('./assets/images/bg.png');
    // background-repeat: repeat;
    background-color: #fff;
    padding-bottom: 100px;
    overflow: hidden;
  }

  p {margin-bottom: 1.3rem;}

  h1, h2, h3, h4, h5, h6 {
    margin: 1.414rem 0 0.5rem;
    font-family: $accent-font;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 1.2;
  }

  h1 {
    margin-top: 0;
    font-size: $fsize1;
  }

  h2 {font-size: $fsize2;}

  h3 {font-size: $fsize3;}

  h4 {font-size: $fsize4;}

  h5 {font-size: $fsize5;}

  h6 {font-size: $fsize6;}

  small {font-size: $fsize7;}

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: $color2;

    &:hover, &:focus {
      color: $color4;
      text-decoration: none;
    }
  }

  hr {
    border-color: $color3;
    border-style: dashed;
  }

  .container-fluid {
    padding: 0;
  }

  #about-wrapper, #dharma-master-wrapper, #dharma-detail-wrapper, #events-wrapper, #blog-master-wrapper, #blog-detail-wrapper {
    padding-top: 40px;
    section { padding-bottom: 30px; }
  }

  .swiper-pagination-bullets {
    text-align: center;
  }

  .swiper-pagination-bullet-active {
    background: $color2 !important;
  }

  .about-link {
    color: $color4;
    &:hover, &:focus {
      color: $color3;
    }
  }

  .detail-content {
    h1, h2, h3, h4, h5, h6 {
      text-transform: initial;
      letter-spacing: 0;
    }

    h1 {
      font-family: $base-font;
      font-size: 1rem;
      color: $color2;
    }

    h3 {
      font-size: $fsize6;
      color: $base-gray;
    }

    h3 {
      font-size: $fsize6;
      color: $base-gray;
    }

    h6 {
      font-family: $base-font;
      font-size: $fsize7;
      color: $color3;
      margin-top: -15px;
    }

    a {
      color: $color4;
      &:hover, &:focus {
        color: $color3;
      }
    }

    img {
      max-width: 100%;
    }

    blockquote {
      margin: 0;
      border: none;
      color: $color1;
      font-weight: bold;
      font-style: italic;
      font-size: $fsize5;
      line-height: 1.2rem;
      position: relative;

      &:before {
        content: "\201c";
        position: absolute;
        left: 15px;
        top: 0;
        font-size: 3rem;
      }
      p {
        padding-left: 20px;
      }
    }
  }

  .yt-player-qa {
    position: relative;
    padding-bottom: 56.23%;
    /* Use 75% for 4:3 videos */
    height: 0;
    overflow: hidden;
    max-width: 100%;
    background: #000;
  }

  .yt-image {
    display: block;
    width: 100%;
    height: 275px;
    object-fit: cover;
    cursor: pointer;
    transition: all 0.2s;
    &:hover, &:focus {
      filter: brightness(75%);
    }
  }

  .yt-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    background: transparent;
  }

  #disqus_thread .share-menu {
    display: none;
  }

  @media screen and (min-width: 420px) {
    .detail-content {
      blockquote {
        width: 240px;
        padding: 10px 0 10px 20px;
        float: right;
      }
    }
  }
</style>
