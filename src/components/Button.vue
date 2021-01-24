<template>
  <button @click="buttonClick" class="bg-transparent hover:bg-indigo-200 text-indigo-700 font-semibold hover:text-white">
    <beat-loader :loading="isLoading" :color="'#68d391'" :size="8" />
    <p v-show="!isLoading">
      <slot></slot>
    </p>
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