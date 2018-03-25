<template>
  <div id="footer-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-md-4 hidden-xs hidden-sm">
          <app-logo></app-logo>
          <small>© 2018 Jungto Society {{ $t('common.copyright') }}<br><a href="mailto:info@pomnyun.com">info@pomnyun.com</a></small>
        </div>

        <div class="col-xs-12 col-md-8">
          <div class="row">
            <div class="col-xs-12 col-md-4">
              <ul id="sitemap-links">
                <li>{{ $t('common.navigate') }}</li>
                <router-link to="/about" activeClass="active" tag="li"><a>{{ $t('common.about') }}</a></router-link>
                <router-link to="/dharma" activeClass="active" tag="li"><a>dharma q&a</a></router-link>
                <router-link to="/events" activeClass="active" tag="li"><a>{{ $t('common.events') }}</a></router-link>
                <router-link to="/blog" activeClass="active" tag="li"><a>{{ $t('common.blog') }}</a></router-link>
              </ul>
            </div>

            <div class="col-xs-12 col-md-4">
              <ul id="external-links">
                <li>{{ $t('common.links') }}</li>
                <li><a href="http://www.jungtosociety.org/" target="_blank">Jungto Society</a></li>
                <li><a href="http://www.jtsamerica.org/" target="_blank">Join Together Society</a></li>
                <li><a href="http://goodfriendsusa.blogspot.ca/" target="_blank">Good Friends</a></li>
              </ul>
            </div>

            <div class="col-xs-12 col-md-4">
              <ul id="social-media-links">
                <li>{{ $t('common.follow') }}</li>
                <li><a href="https://www.facebook.com/pomnyundailyquote" target="_blank"><i class="fa fa-facebook"></i> Facebook</a></li>
                <li><a href="https://www.youtube.com/channel/UCzfKXReow3r5n1JR5nVlJZw" target="_blank"><i class="fa fa-youtube"></i> YouTube</a></li>
              </ul>
            </div>

            <div class="col-xs-12 visible-xs visible-sm">
              <app-logo></app-logo>
              <small>© 2018 Jungto Society {{ $t('common.copyright') }}<br><a href="mailto:info@pomnyun.com">info@pomnyun.com</a></small>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Logo from './Logo.vue'

  export default {
    components: {
      'app-logo': Logo
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/scss/global.scss';

  a {
    color: $base-white;
    text-decoration: none;
  }

  small {
    color: $base-white;
  }

  ul {
    li {
      font-size: 0.9rem;
      color: $base-white;

      &:not(:first-child) {
        display: inline-block;

        &:after {
          content: ' | ';
        }
      }

      &:last-child {
        &:after {
          content: '';
        }
      }

      &:first-child {
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      a {
        text-transform: capitalize;

        &:hover,
        &:focus {
          color: $color4;
        }
      }
    }
  }

  #footer-wrapper {
    background-color: $color2;
    height: 400px;
    padding-top: 30px;
    padding-bottom: 200px;
  }

  #sitemap-links {
    margin-top: 10px;
  }

  #external-links {
    margin: 10px 0;
  }

  #social-media-links {
    margin-bottom: 20px;

    li:nth-child(2) {
      a {
        &:hover,
        &:focus {
          color: $facebook-color;
        }
      }
    }

    li:nth-child(3) {
      a {
        &:hover,
        &:focus {
          color: $youtube-color;
        }
      }
    }
  }

  @media screen and (min-width: 992px) {
    ul {
      width: 100px;
      float: right;

      li {
        &:not(:first-child) {
          display: block;

          &:after {
            content: '';
          }
        }
      }
    }

    #sitemap-links,
    #external-links,
    #social-media-links {
      margin: 0;
    }
  }
</style>
