<template>
  <div id="header-wrapper">
    <transition name="g-animate" animate enter-active-class="pt-page-moveFromLeftFade" leave-active-class="pt-page-moveToLeftFade">
      <div id="side-nav" class="hidden-md hidden-lg" v-if="sideNavVisible">
        <ul class="nav-links">
          <li @click="navigate('/about')">{{ $t('common.about') }}</li>
          <li @click="navigate('/dharma')">dharma q&a</li>
          <li @click="navigate('/events')">{{ $t('common.events') }}</li>
          <li @click="navigate('/blog')">{{ $t('common.blog') }}</li>
        </ul>
        <hr>
        <ul class="social-media-links">
          <li><a href="https://www.facebook.com/pomnyundailyquote" target="_blank"><i class="fa fa-facebook"></i></a></li>
          <li><a href="https://www.youtube.com/channel/UCzfKXReow3r5n1JR5nVlJZw" target="_blank"><i class="fa fa-youtube"></i></a></li>
        </ul>
      </div>
    </transition>

    <section id="service-nav">
      <div class="container">
        <div class="row">
          <div class="col-xs-4">
            <button class="visible-xs visible-sm" @click="sideNavVisible = !sideNavVisible"><i class="fa fa-bars"></i></button>
            <app-logo class="hidden-xs hidden-sm"></app-logo>
          </div>
          <div class="col-xs-8">
            <app-logo class="visible-xs visible-sm pull-right"></app-logo>
            <div id="right-nav" class="hidden-xs hidden-sm">
              <ul class="social-media-links">
                <li><a href="https://www.facebook.com/pomnyundailyquote" target="_blank"><i class="fa fa-facebook"></i></a></li>
                <li><a href="https://www.youtube.com/channel/UCzfKXReow3r5n1JR5nVlJZw" target="_blank"><i class="fa fa-youtube"></i></a></li>
                <li>|</li>
              </ul>
              <ul class="nav-links">
                <router-link to="/about" activeClass="active" tag="li"><a>{{ $t('common.about') }}</a></router-link>
                <router-link to="/dharma" activeClass="active" tag="li"><a>dharma q&a</a></router-link>
                <router-link to="/events" activeClass="active" tag="li"><a>{{ $t('common.events') }}</a></router-link>
                <router-link to="/blog" activeClass="active" tag="li"><a>{{ $t('common.blog') }}</a></router-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="g-fade-bg" v-show="sideNavVisible" @click="sideNavVisible = false"></div>
  </div>
</template>

<script>
  import Logo from './Logo.vue'

  export default {
    components: {
      'app-logo': Logo
    },
    data () {
      return {
        sideNavVisible: false
      }
    },
    methods: {
      navigate (to) {
        this.sideNavVisible = false
        this.$router.push(to)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/scss/global.scss';

  button {
    background: none;
    border: none;
  }

  .g-fade-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9998;
    background: rgba($base-white, 0.7);
  }

  #side-nav {
    background-color: $base-black;
    position: fixed;
    top: 0;
    left: 0;
    width: 260px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    z-index: 9999;

    hr {
      width: 80%;
      border: 1px solid $base-white;
    }

    ul {
      li {
        padding: 5px 0;
        font-family: $accent-font;
        font-size: $fsize5;
        color: $base-white;
        text-transform: uppercase;
        cursor: pointer;

        &:hover,
        &:focus,
        &:active {
          color: $color4;
        }
      }

      &.social-media-links {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 30%;

        li {
          a {
            font-weight: bold;
            font-size: $fsize6;
          }

          &:first-child {
            a {
              color: $facebook-color;

              &:hover,
              &:focus,
              &:active {
                color: darken($facebook-color, 30%);
              }
            }
          }

          &:nth-child(2) {
            a {
              color: $youtube-color;

              &:hover,
              &:focus,
              &:active {
                color: darken($youtube-color, 30%);
              }
            }
          }
        }
      }
    }
  }

  #service-nav {
    background-color: $white;
    padding: 0;

    .row {
      @extend .flex-default;
      height: 50px;
    }

    a {
      padding: 0;
    }

    button {
      i {
        font-size: $fsize4;
        color: $base-white;

        &:hover,
        &:focus {
          color: $color2;
        }
      }
    }

    #right-nav {
      @extend .flex-default;
      justify-content: flex-end;

      ul {
        @extend .flex-default;

        li {
          margin-right: 15px;

          a {
            color: $base-black;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;

            &:hover,
            &:focus,
            &:active {
              color: $base-black;
            }
          }

          &.active {
            a {
              color: $base-black;
            }
          }
        }

        &.social-media-links {
          li {
            a {
              font-weight: bold;
              font-size: $fsize4;
            }

            &:first-child {
              a {
                color: $facebook-color;

                &:hover,
                &:focus,
                &:active {
                  color: darken($facebook-color, 30%);
                }
              }
            }

            &:nth-child(2) {
              a {
                color: $youtube-color;

                &:hover,
                &:focus,
                &:active {
                  color: darken($youtube-color, 30%);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
