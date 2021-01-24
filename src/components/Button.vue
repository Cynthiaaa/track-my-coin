<template>
  <button @click="buttonClick" class="bg-transparent hover:bg-indigo-200 p-2 text-indigo-700 font-semibold hover:text-white">
    <beat-loader :loading="isLoading" :color="'#68d391'" :size="8" />
    <slot v-show="isLoading"></slot>
  </button>
</template>
<script>
export default {
  name: "Button",
  props: {
    isLoading : {
      type: Boolean, 
      default: false
    }
  },
  methods: {
    buttonClick() {
      this.$emit('coin-click')
    }
  }
}
</script>