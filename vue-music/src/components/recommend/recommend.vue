<template>
  <div class='recommend' ref="recommend">
    <scroll ref='scroll' :data='discList' class='recommend-content'>
      <div>
        <div v-if='recommend.length' class='slider-wrapper'>
          <slider>
            <div v-for='item in recommend'>
              <a :href="item.linkUrl">
                <img @load='loadImg' :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class='recommend-list'>
          <h1 class='list-title'>热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class='item' @click="selectItem(item)">
              <div class='icon'>
                <img v-lazy="item.imgurl" width="60" height="60" alt="">
              </div>
              <div class='text'>
                <h2 class='name' v-html='item.creator.name'></h2>
                <p class='desc' v-html='item.dissname'></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class='loading-container' v-show='!discList.length'>
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Slider from 'base/slider/slider'
  import {playlistMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'
  export default {
    mixins: [playlistMixin],
    data () {
      return {
        recommend: [],
        discList: []
      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    },
    created () {
      this._getDiscList()
      this._getRecommend()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      selectItem(item) {
        console.log(item)
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDiscList(item)
      },
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data)
            this.recommend = res.data.slider
          }
        })
      },
      _getDiscList () {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
      loadImg () {
        if (!this.cheakLoader) {
          this.$refs.scroll.refresh()
          this.cheakLoader = true
        }
      },
      ...mapMutations({
        setDiscList: 'SET_DISCLIST'
      })
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-style: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
