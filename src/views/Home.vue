<template>
  <div>
    <Table :assets="assets"/>
  </div>
</template>

<script>
import Table from '@/components/Table';
import api from '@/api'

export default {
  name: "Home", 
  components : {
    Table
  }, 
  data(){
    return {
      assets:[]
    }
  }, 
  created() {
    api.getAssets()
    .then(assets => (this.assets = assets))
  }
}
</script>