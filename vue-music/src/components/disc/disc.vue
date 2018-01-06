<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songList"></music-list>
  </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  export default {
    data() {
      return {
        songList: []
      }
    },
    computed: {
      title() {
        return this.disclist.dissname
      },
      bgImage() {
        return this.disclist.imgurl
      },
      ...mapGetters([
        'disclist'
      ])
    },
    created() {
      this._getSongList()
    },
    components: {
      MusicList
    },
    methods: {
      _getSongList() {
        if (!this.disclist.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disclist.dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songList = this._normalizeSongs(res.cdlist[0].songlist)
            console.log(this.songList)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
