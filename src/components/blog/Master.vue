<template>
  <div id="blog-master-wrapper" class="container">
    <div class="row">
      <section id="aside" class="col-xs-12 col-md-3">
        <div id="search-bar">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search..." v-model="keyword" @keyup="searchByKeyword">
            <span class="fa fa-search"></span>
          </div>
        </div>

        <div id="mobile-search-options" class="visible-xs visible-sm">
          <div id="mobile-category">
            <div class="input-group">
              <button type="button" class="btn" @click="accordionVisible2 = !accordionVisible2">
                <span>{{ selectedCategory }}</span>
                <span class="fa fa-caret-down"></span>
              </button>
              <ul class="accordion-menu" v-show="accordionVisible2">
                <li @click="selectedCategory = 'all'">All</li>
                <li v-for="record in categories" @click="selectedCategory = record" :key="record['.key']">{{ record }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div id="category" class="custom-controls-stacked hidden-xs hidden-sm">
          <label class="custom-control custom-radio">
            <input name="category" type="radio" value="all" class="custom-control-input" v-model="selectedCategory">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description">all</span>
          </label>
          <label class="custom-control custom-radio" v-for="record in categories" :key="record['.key']">
            <input name="category" type="radio" :value="record" class="custom-control-input" v-model="selectedCategory">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description">{{ record }}</span>
          </label>
        </div>
      </section>

      <section id="blog-cards" class="col-xs-12 col-md-9">
        <transition-group name="animatecss" mode="out-in" enter-active-class="animated zoomIn" tag="div">
          <div class="card" v-for="record in sortedRecords" :key="record['.key']" @click="seeDetail(record)">
            <span class="card-tag" v-if="record.created > last14days">NEW</span>
            <div class="card-bg" :style="{ 'background-image': 'url(' + record.thumbnail + ')'}"></div>
            <div class="card-block ">
              <p class="card-title">{{ limitChars(record.title[lang], 40) }}</p>
              <i class="date">{{ record.date | date }}</i>
            </div>
          </div>
        </transition-group>
      </section>
    </div>

  </div>
</template>

<script>
  import _ from 'underscore'
  import moment from 'moment'
  import db from '@/db'
  import categoryObj from '@/categories'

  export default {
    data () {
      return {
        accordionVisible1: false,
        accordionVisible2: false,
        lang: 'en',
        categories: categoryObj.blog,
        keyword: '',
        selectedCategory: 'all',
        filteredRecords: [],
        last14days: moment().subtract(14, 'days').unix()
      }
    },
    head: {
      title () {
        return {
          inner: 'Blog'
        }
      }
    },
    filters: {
      date (timestamp) {
        return moment.unix(timestamp).format('MMMM Do, YYYY')
      }
    },
    firebase: {
      blogArr: db.ref('blog')
    },
    computed: {
      sortedRecords () {
        return _.sortBy(this.filteredRecords, 'date').reverse()
      }
    },
    methods: {
      limitChars (text, chars) {
        if (text.length > chars) return text.substring(0, chars) + '...'
        else return text
      },
      filterRecords (category) {
        let vm = this
        let keyword = vm.keyword.toLowerCase()

        if (vm.selectedCategory === 'all') {
          vm.filteredRecords = _.filter(vm.blogArr, (obj) => {
            let title = obj.title[vm.lang].toLowerCase()
            if (title.includes(keyword)) {
              return obj
            }
          })
        } else {
          vm.filteredRecords = _.filter(vm.blogArr, (obj) => {
            let title = obj.title[vm.lang].toLowerCase()
            if (title.includes(keyword) && obj.category === vm.selectedCategory) {
              return obj
            }
          })
        }
      },
      searchByKeyword () {
        let vm = this
        let keyword = vm.keyword.toLowerCase()

        if (vm.selectedCategory === 'all') {
          vm.filteredRecords = _.filter(vm.blogArr, (obj) => {
            let title = obj.title[vm.lang].toLowerCase()
            if (title.includes(keyword)) {
              return obj
            }
          })
        } else {
          vm.filteredRecords = _.filter(vm.blogArr, (obj) => {
            let title = obj.title[vm.lang].toLowerCase()
            if (title.includes(keyword) && obj.category === vm.selectedCategory) {
              return obj
            }
          })
        }
      },
      seeDetail (record) {
        this.$router.push({ name: 'blogDetail', params: { key: record['.key'], record: record } })
      }
    },
    watch: {
      selectedCategory () {
        this.filterRecords(this.selectedCategory)
      }
    },
    created () {
      this.filteredRecords = this.blogArr
    },
    mounted () {
      window.addEventListener('scroll', this.updateScroll)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/scss/global.scss';

  input {
    height: inherit;
    border: 2px solid $color4;

    &::-webkit-input-placeholder {
      color: $color3;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    &::-moz-placeholder {
      color: $color3;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    &:-ma-input-placeholder {
      color: $color3;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }

  .fa-search {
    position: absolute;
    z-index: 3;
    top: 7px;
    right: 7px;
    color: $color4;
    font-size: 1rem;
  }

  #aside {
    text-transform: capitalize;

    #mobile-search-options {
      #mobile-category {
        margin-top: 20px;

        .input-group {
          width: 100%;

          button {
            width: 100%;
            background-color: $color4;
            color: $base-white;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .accordion-menu {
            border: 1px solid $color4;
            text-align: center;

            li {
              color: $color3;
              font-size: 1rem;
              text-transform: capitalize;
              cursor: pointer;

              &:not(:last-child) {
                margin-bottom: 5px;
              }

              &:hover,
              &:focus {
                color: $color1;
              }
            }
          }
        }
      }
    }

    #search-bar {
      margin-bottom: 20px;

      .input-group {
        width: 100%;
        height: 30px;
        position: relative;

        input {
          border: 1px solid $color4;
        }
      }
    }

    #category {
      position: relative;
      top: 10px;
    }

    .custom-control {
      .custom-control-indicator {
        top: 2px;
        border: 1px solid $color4;
        background-color: transparent;
      }

      .custom-control-description {
        color: $color2;
        font-size: $fsize6;
      }

      .custom-control-input {
        &:checked ~ {
          .custom-control-indicator {
            background: none;
            background-color: $color4;
            box-shadow: none;
          }
        }
      }
    }

  }

  #blog-cards {
    .card {
      width: 100%;
      height: 300px;
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 15px;
      position: relative;
      overflow: hidden;
      cursor: pointer;

      &:active,
      &:focus,
      &:hover {
        .card-bg {
          transform: scale(1.2);
        }

        .card-block {
          .card-title,
          .date {
            color: $color4;
          }
        }
      }

      .card-tag {
        position: absolute;
        top: 5px;
        left: 5px;
        padding: 3px 5px;
        z-index: 2;
        // background-color: rgba($base-black, 0.8);
        background-color: rgba($color4, 0.8);
        border-radius: 3px;
        color: $base-black;
        font-weight: bold;
        letter-spacing: 1px;
      }

      .card-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        transition: all 0.2s;
      }

      .card-block {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 55px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: rgba($base-black, 0.8);
        padding: 5px 10px;

        .card-title,
        .date {
          color: $base-white;
          transition: all 0.2s;
        }

        .card-title {
          margin: 0;
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
  }

  @media screen and (min-width: 992px) {
    #blog-cards {
      .card {
        float: left;
        width: 47%;
        height: 200px;
        margin: 10px;
      }
    }
  }
</style>
