<template>
  <li class="year">
    <h2>{{ year }} ({{ albums.length }})</h2>
    <ol>
      {{ albums }}
    </ol>
  </li>
</template>

<script>

export default {
  components: {
  },

  props: ["access_token","year","albums"],
}
</script>

<style lang="scss" scoped>
</style>
