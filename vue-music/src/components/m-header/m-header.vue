<template>
  <div id='m-header'>
    <div class='icon'></div>
    <div class='text'>团子</div>
  </div>
</template>

<script>

</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  #m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 30px
      margin-right: 9px
      bg-image('logo')
      background-size: 30px 30px
      border-radius: 50%
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
</style>
