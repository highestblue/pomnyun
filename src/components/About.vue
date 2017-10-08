<template>
  <div id="about-wrapper" class="container">

    <section id="roles">
      <div class="row">
        <div class="col-xs-12"><h5>{{ $t('common.background') }}</h5></div>
        <div class="col-xs-12">
          <p v-html="$t('about.background')"></p>
        </div>
      </div>

      <!--<div id="bhikku" class="row">
        <div class="col-xs-12"><h5>Bhikku</h5></div>
        <div class="col-xs-12 col-md-4">
          <div class="image"></div>
        </div>
        <div class="col-xs-12 col-md-8">
          <p v-html="$t('about.bhikku')"></p>
        </div>
      </div>
      -->

      <div id="teacher" class="row">
        <div class="col-xs-12"><h5>Dharma {{ $t('common.teacher') }}</h5></div>
        <div class="col-xs-12 col-md-4">
          <div class="image"></div>
        </div>
        <div class="col-xs-12 col-md-8">
          <p v-html="$t('about.teacher')"></p>
        </div>
      </div>

      <div id="peace" class="row">
        <div class="col-xs-12"><h5>{{ $t('common.peaceActivist') }}</h5></div>
        <div class="col-xs-12 col-md-4">
          <div class="image"></div>
        </div>
        <div class="col-xs-12 col-md-8">
          <p v-html="$t('about.peace')"></p>
        </div>
      </div>

      <div id="humanitarian" class="row">
        <div class="col-xs-12"><h5>{{ $t('common.humanitarianAid') }}</h5></div>
        <div class="col-xs-12 col-md-4">
          <div class="image"></div>
        </div>
        <div class="col-xs-12 col-md-8">
          <p v-html="$t('about.humanitarian')"></p>
        </div>
      </div>

      <div id="environmentalist" class="row">
        <div class="col-xs-12"><h5>{{ $t('common.environmentalist') }}</h5></div>
        <div class="col-xs-12 col-md-4">
          <div class="image"></div>
        </div>
        <div class="col-xs-12 col-md-8">
          <p v-html="$t('about.environment')"></p>
        </div>
      </div>
    </section>

    <hr>

    <section id="milestones">
      <div class="row">
        <div class="col-xs-12"><h5>{{ $t('common.milestones') }}</h5></div>

        <div class="col-xs-12">

          <div class="timeline">
            <div class="line"></div>
            <article class="panel">
              <div class="year">1953</div>
              <div class="panel-body" v-html="$t('about.1953')"></div>
            </article>
            <article class="panel">
              <div class="year">1988</div>
              <div class="panel-body" v-html="$t('about.1988')"></div>
            </article>
            <article class="panel">
              <div class="year">1993</div>
              <div class="panel-body" v-html="$t('about.1993')"></div>
            </article>
            <article class="panel">
              <div class="year">1999</div>
              <div class="panel-body" v-html="$t('about.1999')"></div>
            </article>
            <article class="panel">
              <div class="year">2002</div>
              <div class="panel-body" v-html="$t('about.2002')"></div>
            </article>
            <article class="panel">
              <div class="year">2004</div>
              <div class="panel-body" v-html="$t('about.2004')"></div>
            </article>
            <article class="panel">
              <div class="year">2012</div>
              <div class="panel-body" v-html="$t('about.2012')"></div>
            </article>
            <article class="panel">
              <div class="year">2014</div>
              <div class="panel-body" v-html="$t('about.2014')"></div>
            </article>
          </div>

        </div>

      </div>
    </section>

  </div>
</template>

<style lang="scss" scoped>
  @import '../assets/styles/scss/variables.scss';
  @import '../assets//styles/scss/global.scss';

  .row {
    margin-bottom: 20px;
  }

  p {
    color: $color2;
  }

  #roles {
    .image {
      width: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    #bhikku .image {
      background-image: url('../assets/images/about/bhikku.jpg');
      height: 120px;
    }

    #teacher .image {
      background-image: url('../assets/images/about/teacher.jpg');
      height: 282px;
    }

    #peace .image {
      background-image: url('../assets/images/about/peace.jpg');
      height: 362px;
    }

    #humanitarian .image {
      background-image: url('../assets/images/about/humanitarian.jpg');
      height: 302px;
    }

    #environmentalist .image {
      background-image: url('../assets/images/about/environment.jpg');
      height: 160px;
    }
  }

  .timeline {
    position: relative;
    padding: 21px 0px 10px;
    margin-top: 4px;
    margin-bottom: 30px;
    .line {
      position: absolute;
      width: 4px;
      display: block;
      background: $color3;
      top: 0px;
      bottom: 0px;
      margin-left: 30px;

      &:before, &:after {
        content: '';
        position: absolute;
        display: block;
      }
      &:before {
        top: -4px;
        left: -4px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: $color3;
      }
      &:after {
        bottom: -14px;
        left: -10px;
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 11px;
        border-top-color: $color3;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
      }
    }

    .panel {
      background-color: $color5;
      color: $color2;
      position: relative;
      margin: 10px 0px 21px 70px;
      clear: both;

      &:before {
        position: absolute;
        display: block;
        top: 8px;
        left: -24px;
        content: '';
        width: 0px;
        height: 0px;
        border: inherit;
        border-width: 12px;
        border-top-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: $color5;
      }

      .year {
        @extend .flex-default;
        position: absolute;
        top: 8px;
        left: -58px;
        padding: 3px 5px;
        border-radius: 5px;
        text-align: center;
        float: left;
        font-size: $fsize7;
        font-family: $accent-font;
        font-weight: bold;
        background-color: $color3;
        color: $base-white;
      }
    }
  }

  @media screen and (min-width: 992px) {
    #roles {
      width: 100%;
      margin: auto;
    }
  }
</style>
