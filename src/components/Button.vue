<template>
  <button @click="buttonClick" class="bg-transparent hover:bg-indigo-200 p-2 text-indigo-700 font-semibold hover:text-white">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "Button",

  methods: {
    buttonClick() {
      this.$emit('coin-click')
    }
  }
}
</script>