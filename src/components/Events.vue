<template>
  <div id="events-wrapper" class="container">
    <section id="upcoming-events">
      <h6>{{ $t('events.upcoming') }}</h6>
      <div v-if="upcomingEvents.length === 0">{{ $t('events.noUpcoming') }}</div>
      <div class="row" v-for="record in upcomingEvents" :key="record.id">
        <div class="col-xs-12 col-md-4">
          <div class="thumbnail" :style="{ 'background-image': 'url(' + record.thumbnail + ')' }"></div>
        </div>

        <div class="col-xs-12 col-md-8">
          <div class="content">
            <div class="title">{{ record.title[lang] }}</div>
            <div class="date">{{ formatTime(record.startDate, record.endDate) }} <small>{{ record.timezone }}</small></div>
            <div class="venue">{{ record.venue }} <a :href="record.address | googleMap" target="_blank"><i class="fa fa-map-marker"></i> {{ $t('events.findOnMap') }}</a></div>
            <div class="description" v-html="record.content[lang]"></div>
            <a v-if="record.link" :href="record.link" target="_blank" class="cta1">RSVP</a>
          </div>
        </div>
      </div>

    </section>

    <section id="past-events">
      <h6>{{ $t('events.past') }}</h6>

      <div class="row" v-for="record in pastEvents" :key="record.id">
        <div class="col-xs-12 col-md-4">
          <div class="thumbnail" :style="{ 'background-image': 'url(' + record.thumbnail + ')' }"></div>
        </div>

        <div class="col-xs-12 col-md-8">
          <div class="content">
            <div class="title">{{ record.title[lang] }}</div>
            <div class="date">{{ formatTime(record.startDate, record.endDate) }} <small>{{ record.timezone }}</small></div>
            <div class="venue">{{ record.venue }} <a :href="record.address | googleMap" target="_blank"><i class="fa fa-map-marker"></i> {{ $t('events.findOnMap') }}</a></div>
            <div class="description" v-html="record.content[lang]"></div>
          </div>
        </div>
      </div>

      <hr v-if="endReached">
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
        lang: 'en',
        endReached: false,
        step: 20,
        pastEventsTotal: 0
      }
    },
    computed: {
      upcomingEvents () {
        let data = _.filter(this.eventArr, (obj) => {
          if (obj.isEnabled === true) {
            return obj
          }
        })

        return data
      },
      pastEvents () {
        let vm = this

        let ph1Data = _.filter(vm.eventArr, (obj) => {
          if (obj.isEnabled === false) {
            return obj
          }
        })

        vm.pastEventsTotal = ph1Data.length

        let ph2Data = _.first(ph1Data, vm.step)

        let ph3Data = _.sortBy(ph2Data, 'startDate').reverse()

        return ph3Data
      }
    },
    filters: {
      googleMap (str) {
        return 'https://www.google.com/maps/place/' + str.split(' ').join('+')
      }
    },
    firebase: {
      eventArr: db.ref('event')
    },
    methods: {
      formatTime (startDate, endDate) {
        let startDay = moment.unix(startDate).format('MMM. D, YYYY')
        let endDay = moment.unix(endDate).format('MMM. D, YYYY')
        let startTime = moment.unix(startDate).format('h:mm A')
        let endTime = moment.unix(endDate).format('h:mm A')

        if (startDay === endDay) {
          return startDay + ', ' + startTime + ' - ' + endTime
        } else {
          return startDay + ', ' + startTime + ' - ' + endDay + ', ' + endTime
        }
      },
      updateScroll () {
        let vm = this
        let offset = 20
        let h = this.$root.$el.clientHeight - window.innerHeight // former is height of canvas latter is height of viewport

        if (vm.step >= vm.pastEventsTotal) {
          vm.endReached = true
        } else {
          if (window.scrollY >= (h - offset)) {
            vm.step += 20
          }
        }
      }
    },
    mounted () {
      window.addEventListener('scroll', this.updateScroll)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/scss/variables.scss';
  @import '../assets/styles/scss/global.scss';

  #upcoming-events, #past-events {
    .row {
      padding: 10px 0;
      padding-bottom: 20px;

      .thumbnail, .content {
        height: 250px;
      }

      .thumbnail {
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }

      .content {
        color: $color2;
        .title {
          font-weight: bold;
          text-transform: capitalize;
        }

        .date, .venue {
          color: $color3;
        }

        .date {
          small {
            text-transform: uppercase;
          }
        }
        .venue {
          a {
            margin-left: 5px;
            color: $color4;
            text-decoration: none;
            text-transform: uppercase;

            &:hover, &:focus {
              color: $color3;
            }
          }
        }
        .description {
          max-height: 195px;
          margin: 10px 0;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }

  @media screen and (min-width: 992px) {
    #upcoming-events, #past-events {
      .row {
        padding-bottom: 10px;
      }
    }
  }
</style>
