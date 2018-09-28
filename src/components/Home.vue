<template>
  <div id="home-wrapper">
    <section id="news">
      <div class="container-fluid">
        <div class="spinner-wrapper" v-if="slides.length === 0">
          <fade-loader :loading="spinnerLoading" :color="spinnerColor" :height="spinnerHeight" :width="spinnerWidth"></fade-loader>
        </div>
        <swiper :options="swiperOption1">
          <swiper-slide v-for="slide in slides" :key="slide['.key']">
            <div class="slide" :style="{ 'background-image': 'url(' + slide.imageURL + ')'}">
              <a :href="slide.targetURL" :target="slide.targetWindow" v-if="slide.targetURL !== ''">{{ slide.buttonText }}</a>
            </div>
          </swiper-slide>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </swiper>
      </div>
    </section>

    <section class="row">
      <div class="container">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <div id="dharma-qa">
            <router-link to="/dharma" tag="h6">dharma q&a <i class="fa fa-arrow-right"></i></router-link>
            <ul>
              <li v-for="record in sortedDharmaArr" :key="record.id">
                <a @click="seeDharmaDetail(record)">{{ record.title[lang] }}</a>
                <span class="tag" v-if="record.created > last14days">New</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4">
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

        <div class="col-xs-12 col-sm-6 col-md-4">
          <div id="fb-widget">
            <h6>{{ $t('common.connect') }}</h6>
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpomnyundailyquote%2F&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=963163000486714" width="340" height="275" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
          </div>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4">
          <div id="articles">
            <h6>{{ $t('common.articles') }}</h6>
            <swiper :options="swiperOption2">
              <swiper-slide>
                <a href="https://www.buddhistdoor.net/news/buddhist-humanitarian-organization-jts-offers-relief-for-typhoon-mangkhut-victims-in-the-philippines" target="_blank" class="slide">
                  <div>
                    <div class="title">Buddhist Humanitarian Organization JTS Offers Relief for Typhoon Mangkhut Victims in the Philippines</div>
                    <div class="publisher">Buddhistdoor</div>
                  </div>
                </a>
              </swiper-slide>
              <swiper-slide>
                <a href="https://www.buddhistdoor.net/features/engaging-with-suffering-realizing-freedom-an-interview-with-ven-pomnyun-sunim" target="_blank" class="slide">
                  <div>
                    <div class="title">Engaging with Suffering, Realizing Freedom: An Interview with Ven. Pomnyun Sunim</div>
                    <div class="publisher">Buddhistdoor</div>
                  </div>
                </a>
              </swiper-slide>
              <swiper-slide>
                <a href="http://m.koreatimes.co.kr/pages/article.asp?newsIdx=251042" target="_blank" class="slide">
                  <div>
                    <div class="title">Zen master spreads Buddhism at home as foreign population grows fast</div>
                    <div class="publisher">Korea Times</div>
                  </div>
                </a>
              </swiper-slide>
              <swiper-slide>
                <a href="http://koreajoongangdaily.joins.com/news/article/article.aspx?aid=3042020" target="_blank" class="slide">
                  <div>
                    <div class="title">‘America First’ and North Korea</div>
                    <div class="publisher">Korea JoongAng Daily</div>
                  </div>
                </a>
              </swiper-slide>
              <swiper-slide>
                <a href="http://koreajoongangdaily.joins.com/news/article/article.aspx?aid=3042312" target="_blank" class="slide">
                  <div>
                    <div class="title">Don’t count on China</div>
                    <div class="publisher">Korea JoongAng Daily</div>
                  </div>
                </a>
              </swiper-slide>
              <swiper-slide>
                <a href="http://koreajoongangdaily.joins.com/news/article/article.aspx?aid=3042562" target="_blank" class="slide">
                  <div>
                    <div class="title">Treating Kim like a king</div>
                    <div class="publisher">Korea JoongAng Daily</div>
                  </div>
                </a>
              </swiper-slide>
              <swiper-slide>
                <a href="http://koreajoongangdaily.joins.com/news/article/article.aspx?aid=3042821" target="_blank" class="slide">
                  <div>
                    <div class="title">The art of good enough</div>
                    <div class="publisher">Korea JoongAng Daily</div>
                  </div>
                </a>
              </swiper-slide>
              <swiper-slide>
                <a href="http://www.huffingtonpost.com/author/annahjin88-809" target="_blank" class="slide">
                  <div>
                    <div class="title">the blog</div>
                    <div class="publisher">Huffington Post</div>
                  </div>
                </a>
              </swiper-slide>
              <swiper-slide>
                <a href="http://www.huffingtonpost.com/2014/10/06/korean-buddhist-monk-ponm_n_5929484.html" target="_blank" class="slide">
                  <div>
                    <div class="title">A Buddhist Monk’s Advice On Overcoming Tech Addiction</div>
                    <div class="publisher">Huffington Post</div>
                  </div>
                </a>
              </swiper-slide>
              <swiper-slide>
                <a href="http://www.huffingtonpost.com/2014/10/06/this-buddhist-monk-has-devoted-_n_5939182.html" target="_blank" class="slide">
                  <div>
                    <div class="title">This Buddhist Monk Has Devoted His Life To Ending Suffering In North Korea</div>
                    <div class="publisher">Huffington Post</div>
                  </div>
                </a>
              </swiper-slide>
              <swiper-slide>
                <a href="https://www.lionsroar.com/buddhist-monk-activist-ven-pomnyun-co-hosts-event-to-launch-huffington-post-korea/" target="_blank" class="slide">
                  <div>
                    <div class="title">Buddhist monk, activist Ven. Pomnyun co-hosts event to launch Huffington Post Korea</div>
                    <div class="publisher">Lion's Roar</div>
                  </div>
                </a>
              </swiper-slide>
              <swiper-slide>
                <a href="http://www.nytimes.com/2012/04/28/world/asia/venerable-pomnyuns-earthly-mission-is-to-aid-north-korea.html" target="_blank" class="slide">
                  <div>
                    <div class="title">A Monk’s Earthly Mission: Easing North Koreans’ Pain</div>
                    <div class="publisher">The New York Times</div>
                  </div>
                </a>
              </swiper-slide>
              <swiper-slide>
                <a href="http://www.publicdiplomacymagazine.com/the-human-rights-situation-in-north-korea-and-humanitarian-aid-2/" target="_blank" class="slide">
                  <div>
                    <div class="title">The Human Rights Situation in North Korea and Humanitarian Aid</div>
                    <div class="publisher">Public Diplomacy Magazine</div>
                  </div>
                </a>
              </swiper-slide>
              <swiper-slide>
                <a href="http://www.dukechronicle.com/article/2013/09/buddhist-monk-and-activist-pomnyun-shares-advice-opinions-north-korea" target="_blank" class="slide">
                  <div>
                    <div class="title">Buddhist monk and activist Pomnyun shares advice, opinions on North Korea</div>
                    <div class="publisher">The Chronicle</div>
                  </div>
                </a>
              </swiper-slide>
              <div class="swiper-pagination1" slot="pagination"></div>
            </swiper>
          </div>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4">
          <div id="books">
            <h6>{{ $t('common.books') }}</h6>
            <swiper :options="swiperOption3">
              <swiper-slide>
                <a href="https://play.google.com/store/books/details/%EB%B2%95%EB%A5%9C%EC%8A%A4%EB%8B%98_Ven_Pomnyun_Sunim_Awakening?id=eIaYCgAAQBAJ&hl=en" target="_blank" class="slide slide1"></a>
              </swiper-slide>
              <swiper-slide>
                <a href="https://play.google.com/store/books/details/%EB%B2%95%EB%A5%9C%EC%8A%A4%EB%8B%98_Ven_Pomnyun_Sunim_Prayer_Letting_Go?id=j--HCgAAQBAJ&hl=en" target="_blank" class="slide slide2"></a>
              </swiper-slide>
              <swiper-slide><div class="slide slide3"></div></swiper-slide>
              <swiper-slide><div class="slide slide4"></div></swiper-slide>
              <swiper-slide><div class="slide slide5"></div></swiper-slide>
              <div class="swiper-pagination2" slot="pagination"></div>
            </swiper>
          </div>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4">
          <div id="talks">
            <a href="https://www.youtube.com/channel/UCzfKXReow3r5n1JR5nVlJZw" target="_blank"><h6>{{ $t('common.talks') }} <i class="fa fa-arrow-right"></i></h6></a>
            <swiper :options="swiperOption4">
              <swiper-slide>
                <div class="video-wrapper">
                  <div class="yt-player"></div>
                  <div class="title">Talk At Google</div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="video-wrapper">
                  <div class="yt-player"></div>
                  <div class="title">Talk at Union Theological Seminary</div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="video-wrapper">
                  <div class="yt-player"></div>
                  <div class="title">Talk at Princenton University</div>
                </div>
              </swiper-slide>
              <div class="swiper-pagination3" slot="pagination"></div>
            </swiper>
          </div>
        </div>
      </div>
    </section>
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
        videoIDArr: ['_ZSHNAiQomc', 'R-eynN3Yyk0', 'i3YcqRuW6X0'],
        lang: 'en',
        swiperOption1: {
          slidesPerView: 1,
          spaceBetween: 20,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev'
        },
        swiperOption2: {
          slidesPerView: 1,
          spaceBetween: 20,
          pagination: '.swiper-pagination1',
          paginationClickable: true,
          autoHeight: true
        },
        swiperOption3: {
          slidesPerView: 1,
          spaceBetween: 20,
          pagination: '.swiper-pagination2',
          paginationClickable: true
        },
        swiperOption4: {
          slidesPerView: 1,
          spaceBetween: 20,
          pagination: '.swiper-pagination3',
          paginationClickable: true
        },
        slides: [],
        last14days: moment().subtract(14, 'days').unix(),
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
      }
    },
    methods: {
      seeDharmaDetail (record) {
        this.$router.push({ name: 'dharmaDetail', params: { key: record['.key'], record: record } })
      },
      seeBlogDetail (record) {
        this.$router.push({ name: 'blogDetail', params: { key: record['.key'], record: record } })
      },
      loadYoutubeVideos () {
        let img = null
        let embed = 'https://i.ytimg.com/vi/ID/hqdefault.jpg'
        let video = document.getElementsByClassName('yt-player')
        for (var i = 0; i < video.length; i++) {
          img = document.createElement('img')
          img.setAttribute('src', embed.replace('ID', this.videoIDArr[i]))
          img.setAttribute('class', 'yt-image')
          img.setAttribute('data-id', this.videoIDArr[i])
          img.onclick = this.loadIframe
          video[i].appendChild(img)
        }
      },
      loadIframe () {
        let iframe = document.createElement('iframe')
        let embed = 'https://www.youtube.com/embed/ID?autoplay=1'
        iframe.setAttribute('src', embed.replace('ID', event.target.dataset.id))
        iframe.setAttribute('class', 'yt-iframe')
        iframe.setAttribute('frameborder', '0')
        iframe.setAttribute('allowfullscreen', '1')
        event.target.parentNode.replaceChild(iframe, event.target)
      }
    },
    firebase: {
      dharmaArr: db.ref('dharma').limitToLast(9),
      blogArr: db.ref('blog').limitToLast(1),
      slideArr: db.ref('slide').orderByChild('order')
    },
    mounted () {
      this.loadYoutubeVideos()
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
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding-bottom: 50px;

      a {
        padding: 0 15px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid $color4;
        background-color: $base-white;
        border-radius: 4px;
        font-weight: bold;
        font-size: $fsize5;
        text-transform: uppercase;
        text-align: center;

        &:hover,
        &:focus {
          background-color: $base-black;
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

  #articles,
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

  #articles {
    .slide {
      background-color: $base-black;
      text-align: center;

      .title {
        font-size: $fsize6;
        font-family: $accent-font;
        font-weight: bold;
        text-transform: capitalize;
        color: $base-white;
        letter-spacing: 1px;
      }

      .publisher {
        font-size: $fsize7;
        color: #ddd;
        margin-top: 15px;
        text-transform: capitalize;
      }
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

  #talks {
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

      &:after {
        font-family: FontAwesome;
        font-size: $fsize5;
        color: $youtube-color;
        margin-left: 5px;
        vertical-align: middle;
        content: '\f16a';
      }
    }
  }

  @media screen and (min-width: 768px) {
    #dharma-qa,
    #blog,
    #fb-widget,
    #articles,
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
  }
</style>
