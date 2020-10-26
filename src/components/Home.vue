<template>
  <div id="home-wrapper">
    <section id="news">
      <div class="container-fluid">
        <div class="spinner-wrapper" v-if="slides.length === 0">
          <fade-loader :loading="spinnerLoading" :color="spinnerColor" :height="spinnerHeight" :width="spinnerWidth"></fade-loader>
        </div>
        <swiper :options="slideSwiperOptions">
          <swiper-slide v-for="slide in slides" :key="slide['.key']">
            <div class="slide hidden-xs" :style="{ 'background-image': 'url(' + slide.imageURL + ')'}">
              <a :href="slide.targetURL" :target="slide.targetWindow" v-if="slide.targetURL !== ''"></a>
            </div>
            <div class="slide visible-xs" :style="{ 'background-image': 'url(' + slide.mobileImageUrl + ')'}">
              <a :href="slide.targetURL" :target="slide.targetWindow" v-if="slide.targetURL !== ''"></a>
            </div>
          </swiper-slide>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </swiper>
      </div>
    </section>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-lg-4">
          <div id="dharma-qa">
            <router-link to="/dharma" tag="h6">dharma q&a <i class="fa fa-arrow-right"></i></router-link>
            <ul>
              <li v-for="record in sortedDharmaArr" :key="record.id">
                <a @click="seeDharmaDetail(record)">{{ record.title[lang] }}</a>
                <span class="tag" v-if="record.created > last7days">New</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-xs-12 col-sm-6 col-lg-4">
          <div id="blog">
            <router-link to="/blog" tag="h6">{{ $t('common.blog') }} <i class="fa fa-arrow-right"></i></router-link>

            <div class="tb hvr-shadow" v-for="record in blogArr" @click="seeBlogDetail(record)" :style="{ 'background-image': 'url(' + record.thumbnail + ')' }" :key="record.id">
              <div class="footer">
                <div class="title">{{ record.title[lang] }}</div>
                <i class="date">{{ record.date | date }}</i>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xs-12 col-lg-4">
          <div id="fb-widget">
            <h6>{{ $t('common.connect') }}</h6>
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpomnyundailyquote%2F&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=963163000486714" width="340" height="275" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-lg-4">
          <div id="article">
            <router-link to="/article" tag="h6">{{ $t('common.articles') }} <i class="fa fa-arrow-right"></i></router-link>

            <a class="tb hvr-shadow" v-for="record in articleArr" :key="record.id" :href="record.targetURL" target="_blank">
              <p class="title">{{ record.title }}</p>
              <p class="publisher">{{ record.publisher }}</p>
            </a>
          </div>
        </div>

        <div class="col-xs-12 col-lg-8">
          <div id="books">
            <h6>{{ $t('common.books') }}</h6>
            <swiper :options="bookSwiperOptions">
              <swiper-slide>
                <a href="https://play.google.com/store/books/details/%EB%B2%95%EB%A5%9C%EC%8A%A4%EB%8B%98_Ven_Pomnyun_Sunim_Awakening?id=eIaYCgAAQBAJ&hl=en" target="_blank" class="slide slide1"></a>
              </swiper-slide>
              <swiper-slide>
                <a href="https://play.google.com/store/books/details/%EB%B2%95%EB%A5%9C%EC%8A%A4%EB%8B%98_Ven_Pomnyun_Sunim_Prayer_Letting_Go?id=j--HCgAAQBAJ&hl=en" target="_blank" class="slide slide2"></a>
              </swiper-slide>
              <swiper-slide><div class="slide slide3"></div></swiper-slide>
              <swiper-slide><div class="slide slide4"></div></swiper-slide>
              <swiper-slide><div class="slide slide5"></div></swiper-slide>
              <div class="book-swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <div id="talks">
            <a href="https://www.youtube.com/channel/UCzfKXReow3r5n1JR5nVlJZw" target="_blank"><h6>{{ $t('common.talks') }} <i class="fa fa-arrow-right"></i></h6></a>
            <swiper :options="talkSwiperOptions" ref="talkSwiper">
              <swiper-slide v-for="record in videoSlides" :key="record.key">
                <div v-html="record" @click="loadIframe"></div>
              </swiper-slide>
              <div class="talk-swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import FadeLoader from 'vue-spinner/src/FadeLoader'
  import db from '@/db'

  export default {
    components: {
      'fade-loader': FadeLoader
    },
    data () {
      return {
        lang: 'en',
        slideSwiperOptions: {
          slidesPerView: 1,
          spaceBetween: 20,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev'
        },
        bookSwiperOptions: {
          slidesPerView: 3,
          spaceBetween: 20,
          grabCursor: true,
          pagination: '.book-swiper-pagination',
          paginationClickable: true,
          breakpoints: {
            480: {
              slidesPerView: 1
            },
            980: {
              slidesPerView: 2
            }
          }
        },
        talkSwiperOptions: {
          slidesPerView: 3,
          spaceBetween: 20,
          grabCursor: true,
          pagination: '.talk-swiper-pagination',
          paginationClickable: true,
          breakpoints: {
            480: {
              slidesPerView: 1
            },
            980: {
              slidesPerView: 2
            }
          }
        },
        slides: [],
        last7days: moment().subtract(7, 'days').unix(),
        spinnerColor: '#E5B560',
        spinnerHeight: '10px',
        spinnerWidth: '10px',
        spinnerLoading: true
      }
    },
    filters: {
      date (timestamp) {
        return moment.unix(timestamp).format('MMM DD, YYYY')
      }
    },
    computed: {
      sortedDharmaArr () {
        return this.dharmaArr.reverse()
      },
      talkSwiper () {
        return this.$refs.talkSwiper.swiper
      },
      videoSlides () {
        let vm = this
        let arr

        if (this.videoArr.length > 1) {
          arr = vm.videoArr.map((video) => {
            return (
              `<div class="swiper-slide">
                <div class="video-wrapper">
                  <div class="play-button"><i class="fa fa-youtube-play"></i></div>
                  <div class="yt-player">
                    <div class="title">${video.title}</div>
                    <img src="https://i.ytimg.com/vi/${video.videoID}/hqdefault.jpg" class="yt-image" data-id="${video.videoID}" />
                  </div>
                </div>
              </div>`
            )
          })
        }

        return arr
      }
    },
    methods: {
      seeDharmaDetail (record) {
        this.$router.push({ name: 'dharmaDetail', params: { key: record['.key'], record: record } })
      },
      seeBlogDetail (record) {
        this.$router.push({ name: 'blogDetail', params: { key: record['.key'], record: record } })
      },
      loadIframe () {
        const parent = event.target.closest('.video-wrapper')
        const ytPlayer = parent.querySelector('.yt-player')
        let iframe = document.createElement('iframe')
        let embed = 'https://www.youtube.com/embed/ID?autoplay=1'
        let img = ytPlayer.querySelector('img')

        iframe.setAttribute('src', embed.replace('ID', img.dataset.id))
        iframe.setAttribute('class', 'yt-iframe')
        iframe.setAttribute('frameborder', '0')
        iframe.setAttribute('allowfullscreen', '1')
        ytPlayer.replaceChild(iframe, img)
      }
    },
    firebase: {
      dharmaArr: db.ref('dharma').limitToLast(9),
      blogArr: db.ref('blog').limitToLast(1),
      articleArr: db.ref('article').limitToLast(1),
      slideArr: db.ref('slide').orderByChild('order'),
      videoArr: db.ref('video').orderByChild('order')
    },
    mounted () {
      this.slides = this.slideArr
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/scss/global.scss';

  .fa-arrow-right {
    color: $color4;
  }

  #news {
    .spinner-wrapper {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .slide {
      position: relative;
      width: 100%;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding-bottom: 50px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;

      a {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;

        &:hover,
        &:focus {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }

  #dharma-qa,
  #blog {
    h6 {
      cursor: pointer;

      &:hover,
      &:focus {
        color: $color4;
      }
    }
  }

  #dharma-qa {
    ul {
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $color2;

        &:not(:last-child) {
          margin-bottom: 10px;
        }

        a {
          @extend .text-ellipsis;
          width: 85%;
          cursor: pointer;
        }

        span {
          width: 40px;
          height: 20px;
          background-color: $color4;
          border-radius: 5px;
          font-weight: bold;
          text-align: center;
        }
      }
    }
  }

  #article {
    height: 275px;
    margin-bottom: 15px;

    .tb {
      display: flex;
      justify-content: center;
      flex-direction: column;
      height: 100%;
      padding: 0 30px;
      background-color: $base-black;
      text-align: center;
      transition: all 0.2s;

      &:hover,
      &:focus {
        background-color: $color4;
      }
    }

    .title {
      font-size: $fsize6;
      font-family: $accent-font;
      font-weight: bold;
      text-transform: capitalize;
      color: $base-white;
      letter-spacing: 1px;
    }

    .publisher {
      color: #ddd;
      margin-top: 15px;
      text-transform: capitalize;
    }
  }

  #blog {
    .tb {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      flex-direction: column;
      height: 275px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;

      .footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: rgba($base-black, 0.8);
        width: 100%;
        height: 80px;
        padding: 10px 15px;
      }

      .title,
      .date {
        color: $base-white;
      }

      .title {
        font-size: $fsize6;
        font-family: $accent-font;
        font-weight: bold;
        text-transform: capitalize;
        letter-spacing: 1px;
        line-height: 1;
      }

      .date {
        font-size: $fsize7;
      }
    }
  }

  #fb-widget iframe {
    display: block;
    margin: 0 auto;
  }

  #books,
  #talks {
    .swiper-slide {
      height: 275px;
    }

    .slide {
      @extend .flex-default;
      height: 100%;
      padding: 10px 20px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  }

  #books {
    .slide1 {
      background-image: url('../assets/images/home/book-awakening.jpg');
    }

    .slide2 {
      background-image: url('../assets/images/home/book-prayer.jpg');
    }

    .slide3 {
      background-image: url('../assets/images/home/book-true-freedom.jpg');
    }

    .slide4 {
      background-image: url('../assets/images/home/book-true-happiness.jpg');
    }

    .slide5 {
      background-image: url('../assets/images/home/book-true-wisdom.jpg');
    }
  }

  @media screen and (min-width: 768px) {
    #dharma-qa,
    #blog,
    #fb-widget,
    #books,
    #talks {
      width: 100%;
      margin: auto;
    }
  }

  @media screen and (min-width: 992px) {
    [class*="col-"] {
      padding-top: 30px;
      padding-bottom: 30px;
    }

    #news {
      .spinner-wrapper {
        height: 500px;
      }

      .slide {
        height: 500px;
      }
    }

    #article {
      margin-bottom: 0;
    }
  }
</style>
