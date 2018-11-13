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
  @import './assets/styles/scss/global.scss';

  .container-fluid {
    padding: 0;
  }

  #about-wrapper,
  #dharma-master-wrapper,
  #dharma-detail-wrapper,
  #events-wrapper,
  #blog-master-wrapper,
  #blog-detail-wrapper {
    padding-top: 40px;

    section {
      padding-bottom: 30px;
    }
  }

  .swiper-pagination-bullets {
    text-align: center;
  }

  .swiper-pagination-bullet-active {
    background: $color2 !important;
  }

  .about-link {
    color: $color4;

    &:hover,
    &:focus {
      color: $color3;
    }
  }

  .detail-content {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
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
        position: absolute;
        left: 15px;
        top: 0;
        font-size: 3rem;
        content: "\201c";
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
    transition: all 0.2s;
    cursor: pointer;

    &:hover,
    &:focus {
      filter: brightness(75%);
    }
  }

  #talks {
    .video-wrapper {
      height: 275px;
    }

    .play-button {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3rem;
      color: $youtube-color;
    }

    .title {
      background-color: #000;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      color: $base-white;
      text-align: center;
      text-transform: capitalize;
      letter-spacing: 1px;
      padding: 5px;
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
