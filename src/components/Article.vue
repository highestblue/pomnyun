<template>
  <div id="article-master-wrapper" class="container">
    <section class="row">
      <div id="search-bar" class="col-sm-12 hidden-xs">
        <input type="text" class="form-control" placeholder="Search for your question" v-model="keyword" @keyup="searchByKeyword">
        <span class="fa fa-search"></span>
      </div>

      <div id="mobile-search-bar" class="col-xs-12 visible-xs">
        <input type="text" class="form-control" placeholder="Search for your question" v-model="keyword" @keyup="searchByKeyword">
        <span class="fa fa-search"></span>
      </div>
    </section>

    <section id="article-cards">
      <transition-group name="animatecss" mode="out-in" enter-active-class="animated zoomIn" tag="a">
      <div v-for="record in sortedRecords" :key="record['.key']">
        <a class="card hvr-round-corners" :class="{ new: record.created > last14days }" :href="record.targetURL" target="_blank">
          <span class="tag hidden-xs" v-if="record.created > last14days">New</span>
          <p class="title">{{ record.title }}</p>
          <p class="publisher">{{ record.publisher }}</p>
        </a>
      </div>
      </transition-group>
    </section>
  </div>
</template>

<script>
  import moment from 'moment'
  import _ from 'underscore'
  import db from '@/db'

  export default {
    data () {
      return {
        accordionVisible: false,
        dropdownVisible: false,
        keyword: '',
        filteredRecords: [],
        last14days: moment().subtract(14, 'days').unix()
      }
    },
    firebase: {
      articleArr: db.ref('article')
    },
    computed: {
      sortedRecords () {
        return _.sortBy(this.filteredRecords, 'created').reverse()
      }
    },
    methods: {
      searchByKeyword () {
        let vm = this
        let keyword = vm.keyword.toLowerCase()

        vm.filteredRecords = _.filter(vm.articleArr, (obj) => {
          let title = obj.title.toLowerCase()
          let publisher = obj.publisher.toLowerCase()
          if (title.includes(keyword) || publisher.includes(keyword)) {
            return obj
          }
        })
      }
    },
    created () {
      this.filteredRecords = this.articleArr
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/scss/global.scss';

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
    right: 30px;
    color: $color4;
    font-size: 1.2rem;
  }

  #mobile-search-bar {
    margin-bottom: 15px;

    input {
      width: 100%;
      height: 40px;
      border: 1px solid $color4;
    }
  }

  #search-bar {
    margin-bottom: 30px;

    input {
      height: 40px;
      border: 5px solid $color4;
    }
  }

  #article-cards {
    .card {
      display: flex;
      justify-content: center;
      flex-direction: column;
      position: relative;
      padding: 5px 35px;
      border: 1px solid $color3;
      margin-bottom: 15px;
      cursor: pointer;

      p {
        margin: 0;
        text-align: center;
      }

      .title {
        font-weight: bold;
      }

      .publisher {
        margin-top: 10px;
      }

      span {
        position: absolute;
        top: 5px;
        left: 5px;
        width: 35px;
        height: 20px;
        color: $color4;
        border-radius: 5px;
        font-weight: bold;
        text-align: center;
      }
    }
  }

  @media screen and (min-width: 992px) {
    #article-cards {
      .card {
        float: left;
        width: 31%;
        height: 120px;
        margin: 10px;
      }
    }
  }
</style>
