<template>
  <div>
    <back-nav left="返回"></back-nav>
    mvplay
    {{ this.$route.query.id}}
  </div>
</template>

<script>
import BackNav from '@/components/BackNav.vue'
export default {
  components: {
    BackNav
  }
  
}
</script>

<style lang="scss" scoped>

</style>