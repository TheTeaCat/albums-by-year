<template>
  <ul>
    <li v-for="option in Object.keys(options)" :key="option">
      <Toggle class="toggle" 
              :value="options[option].show" 
              @change="options[option].show=!options[option].show" />
      {{ options[option].display }}
    </li>
  </ul>
</template>

<script>
import Toggle from "./Toggle.vue";

export default {
  components: {
    Toggle
  },
  props: ["title", "options"],
}
</script>

<style lang="scss" scoped>
ul, li {
  display:flex;
  align-items: center;
}
li {
  margin-right: $spacer*4;
}

.toggle {
  margin-right: 0.5em;
}
</style>
