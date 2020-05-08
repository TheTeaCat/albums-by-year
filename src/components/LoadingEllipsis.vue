<template>
  <span class="loading"/>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.loading:after {
  position:absolute;
  animation: ellipsis steps(4,end) 2000ms infinite;
  content:"";
}

@keyframes ellipsis {
  0% { content: "" }
  25% { content: "." }
  50% { content: ".." }
  75% { content: "..." }
}
</style>