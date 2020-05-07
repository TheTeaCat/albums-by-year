<template>
  <div class="checkbox-group">
    <span>{{ title }}:</span>
    <ul>
      <li v-for="option in Object.keys(options)" :key="option">
        <input type="checkbox" v-model="options[option].show" @click="$emit('change')"/>
        {{ options[option].display }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["title", "options"],
}
</script>

<style lang="scss" scoped>
.checkbox-group {
  display:flex;
  align-items: center;
}

span {
  font-weight:bold;
  margin-right: $spacer;
}

ul, li {
  display:flex;
  align-items: center;
}
li {
  margin-right: $spacer;
}
input {
  margin-right: $spacer/2;
}
</style>
