<template>
  <div id="dharma-detail-wrapper" class="container">
    <div class="row">
      <section id="main" class="col-xs-12 col-md-9 col-md-push-3">
        <div class="title">{{ record.title[lang] }}<span>{{ record.category }}</span></div>
        <div class="yt-player-qa" v-if="record.video[lang]"><iframe class="yt-iframe" type="text/html" width="700" height="390" frameborder="0" :src="record.video[lang]" v-if="record.video[lang]"></iframe></div>
        <div class="detail-content" v-html="record.content[lang]"></div>
      </section>

      <section id="aside" class="col-xs-12 col-md-3 col-md-pull-9">
        <h6>{{ $t('common.recommended') }}</h6>
        <ul>
          <li v-for="record in similarRecords" @click="goto(record)" :key="record['.key']">{{ record.title[lang] }}</li>
        </ul>
        <router-link to="/dharma"><i class="fa fa-th-large"></i><span>{{ $t('common.list') }}</span></router-link>
      </section>
    </div>
  </div>
</template>

<script>
  import _ from 'underscore'
  import db from '@/db'

  export default {
    data () {
      return {
        lang: 'en',
        record: {}
      }
    },
    firebase: {
      dharmaArr: db.ref('dharma')
    },
    computed: {
      similarRecords () {
        let vm = this

        let filteredRecords = _.filter(vm.dharmaArr, (obj) => {
          if (obj.category === vm.record.category && obj['.key'] !== vm.record['.key']) {
            return obj
          }
        })

        return _.first(filteredRecords, 5)
      }
    },
    methods: {
      fetchData (record) {
        let vm = this

        if (record) {
          vm.$localStorage.set('dharma', record)
        }

        let lsRecord = vm.$localStorage.get('dharma')
        vm.record = lsRecord
      },
      goto (record) {
        this.$router.push({ name: 'dharmaDetail', params: { key: record['.key'], record: record } })
      }
    },
    watch: {
      '$route' (to, from) {
        this.fetchData(to.params.record)
      }
    },
    created () {
      this.fetchData(this.$route.params.record)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/scss/global.scss';

  #aside {
    h6 {
      margin: 8px 0 10px;
    }
    ul {
      li {
        color: $color2;
        cursor: pointer;
        &:not(:last-child) {
          margin-bottom: 7px;
        }
        &:hover, &:focus {
          color: $color4;
        }
      }
    }
    a {
      display: block;
      margin-top: 10px;
      color: $color3;
      i {
        color: $color4;
      }
      span {
        margin-left: 5px;
        &:hover, &:focus {
          color: $color4;
        }
      }
    }
  }

  #main {
    iframe {
      max-width: 100%;
      margin-bottom: 15px;
    }

    .title {
      margin-bottom: 10px;
      font-size: $fsize5;
      font-weight: bold;
      color: $color1;
      text-transform: capitalize;
      span {
        display: inline-block;
        vertical-align: middle;
        height: 20px;
        padding: 0 5px;
        margin-left: 10px;
        border: 1px solid $color4;
        border-radius: 5px;
        font-size: $fsize7;
        font-weight: bold;
        color: $color4;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }

    .category {
      strong {
        color: $color3;
        font-size: 0.9rem;
      }
      span {
        border: 1px solid $color1;
        border-radius: 5px;
        color: $color1;
        font-size: $fsize5;
        font-weight: bold;
        text-transform: capitalize;
        padding: 3px 6px;
        margin-right: 3px;
      }
    }
  }

</style>
