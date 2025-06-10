<template>
  <label class="switch">
    <input type="checkbox" :checked="value" @click="$emit('change')" />
    <span class="slider" />
  </label>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 2.5em;
  height: 1.4em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background-color: var(--background-alt-2);
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 1.4em;
  border: 1px solid var(--contast-assist-border);
}

.slider:before {
  position: absolute;
  content: "";
  height: 1em;
  width: 1em;
  left: 0.25em;
  bottom: 0.2em;
  background-color: var(--text-colour);
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: $pink;
}

input:focus + .slider {
  box-shadow: 0 0 1px $pink;
}

input:checked + .slider:before {
  -webkit-transform: translateX(1em);
  -ms-transform: translateX(1em);
  transform: translateX(1em);
}
</style>
