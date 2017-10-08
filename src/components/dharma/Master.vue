<template>
  <div id="dharma-master-wrapper" class="container">
    <section class="row">
      <div id="search-bar" class="col-sm-12 hidden-xs">
        <div class="input-group">
          <div class="input-group-btn">
            <button type="button" class="btn" @click="dropdownVisible = !dropdownVisible">
              <span>{{ selectedCategory }}</span>
              <span class="fa fa-caret-down"></span>
            </button>
            <ul class="my-dropdown-menu" v-show="dropdownVisible">
              <li @click="searchByCategory('all')">All</li>
              <li v-for="record in categories" @click="searchByCategory(record)" :key="record['.key']">{{ record }}</li>
            </ul>
          </div>
          <input type="text" class="form-control" placeholder="Search for your question" v-model="keyword" @keyup="searchByKeyword">
          <span class="fa fa-search"></span>
        </div>
      </div>

      <div id="mobile-search-bar" class="col-xs-12 visible-xs">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search for your question" v-model="keyword" @keyup="searchByKeyword">
          <span class="fa fa-search"></span>
        </div>

        <div class="input-group">
          <button type="button" class="btn" @click="accordionVisible = !accordionVisible">
            <span>{{ selectedCategory }}</span>
            <span class="fa fa-caret-down"></span>
          </button>
          <ul class="accordion-menu" v-show="accordionVisible">
            <li @click="searchByCategory('all')">All</li>
            <li v-for="record in categories" @click="searchByCategory(record)" :key="record['.key']">{{ record }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="qa-cards">
      <transition-group name="animatecss" mode="out-in" enter-active-class="animated zoomIn" tag="div">
      <div v-for="record in sortedRecords" :key="record['.key']" @click="seeDetail(record)">
        <div class="card hvr-round-corners" :class="{ new: record.created > last14days }">
          <span class="tag hidden-xs" v-if="record.created > last14days">New</span>
          <p>{{ record.title[lang] }}</p>
        </div>
      </div>
      </transition-group>
    </section>
  </div>
</template>

<script>
  import moment from 'moment'
  import _ from 'underscore'
  import db from '@/db'
  import categoryObj from '@/categories'

  export default {
    data () {
      return {
        lang: 'en',
        categories: categoryObj.dharma,
        accordionVisible: false,
        dropdownVisible: false,
        selectedCategory: 'all',
        keyword: '',
        filteredRecords: [],
        last14days: moment().subtract(14, 'days').unix()
      }
    },
    firebase: {
      dharmaArr: db.ref('dharma')
    },
    computed: {
      sortedRecords () {
        return _.sortBy(this.filteredRecords, 'created').reverse()
      }
    },
    methods: {
      searchByCategory (category) {
        let vm = this
        vm.selectedCategory = category
        vm.dropdownVisible = false
        vm.accordionVisible = false
        vm.keyword = ''

        if (category === 'all') {
          vm.filteredRecords = vm.dharmaArr
        } else {
          vm.filteredRecords = _.filter(vm.dharmaArr, (obj) => {
            if (obj.category === category) {
              return obj
            }
          })
        }
      },
      searchByKeyword () {
        let vm = this
        let keyword = vm.keyword.toLowerCase()

        if (vm.selectedCategory === 'all') {
          vm.filteredRecords = _.filter(vm.dharmaArr, (obj) => {
            let title = obj.title[vm.lang].toLowerCase()
            if (title.includes(keyword)) {
              return obj
            }
          })
        } else {
          vm.filteredRecords = _.filter(vm.dharmaArr, (obj) => {
            let title = obj.title[vm.lang].toLowerCase()
            if (title.includes(keyword) && obj.category === vm.selectedCategory) {
              return obj
            }
          })
        }
      },
      seeDetail (record) {
        this.$router.push({ name: 'dharmaDetail', params: { key: record['.key'], record: record } })
      }
    },
    created () {
      this.filteredRecords = this.dharmaArr
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/scss/global.scss';

  input {
    height: inherit;
    &::-webkit-input-placeholder {
      color: $color3;
      letter-spacing: 1px;
    }
    &::-moz-placeholder {
      color: $color3;
      letter-spacing: 1px;
    }
    &:-ma-input-placeholder {
      color: $color3;
      letter-spacing: 1px;
    }
  }

  .fa-search {
    position: absolute;
    z-index: 3;
    top: 10px;
    right: 15px;
    color: $color4;
    font-size: 1.2rem;
  }

  #mobile-search-bar {
    .input-group {
      width: 100%;
      height: 40px;
      position: relative;

      input {
        border: 1px solid $color4;
      }

      &:nth-child(2) {
        margin-top: 10px;

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
            &:hover, &:focus {
              color: $color1;
            }
          }
        }
      }
    }
  }

  #search-bar {
    margin-bottom: 30px;
    .input-group {
      height: 40px;
      position: relative;

      input {
        border: 5px solid $color4;
      }

      .input-group-btn {
        height: inherit;
        button {
          @extend .flex-default;
          justify-content: space-between;
          position: relative;
          z-index: 3;
          width: 170px;
          height: inherit;
          padding: 0 10px;
          background-color: $color4;
          border-color: $color4;
          color: $base-white;
          outline: none;

          span {
            &:first-child {
              font-weight: bold;
              text-transform: capitalize;
            }
            &:last-child {
              padding-top: 3px;
            }
          }
        }
        .my-dropdown-menu {
          position: absolute;
          top: 95%;
          left: 0;
          z-index: 2;
          width: 170px;
          padding: 10px;
          background-color: $base-white;
          border: 1px solid $color4;
          border-radius: 0.25rem;
          li {
            color: $color3;
            font-size: 1rem;
            text-transform: capitalize;
            cursor: pointer;
            &:not(:last-child) {
              margin-bottom: 5px;
            }
            &:hover, &:focus {
              color: $color1;
            }
          }
        }
      }
    }
  }

  #qa-cards {
    .card {
      @extend .flex-default;
      position: relative;
      padding: 5px 15px;
      border: 1px solid $color3;
      cursor: pointer;
      margin-bottom: 15px;
      p {
        margin: 0;
        text-align: center;
      }
      span {
        position: absolute;
        top: 5px;
        left: 5px;
        width: 35px;
        height: 20px;
        color: $base-white;
        border-radius: 5px;
        font-weight: bold;
        text-align: center;
      }
    }
    .new {
      background-color: $color4;
    }
  }

  @media screen and (min-width: 992px) {
    #qa-cards {
      .card {
        float: left;
        width: 31%;
        height: 100px;
        margin: 10px;
      }
    }
  }
</style>
