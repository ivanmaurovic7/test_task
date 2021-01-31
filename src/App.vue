<template>
  <div id="app">
    <ClientsTable @show-modal="showModal = $event" :clients="clients" @set-clients="clients = $event"/>
    <ClientModal v-if="showModal" :showModal="showModal" @show-modal="showModal = $event" :clients="clients" @set-clients="clients = $event"/>
  </div>
</template>

<script>
import fetchUtil from "@/utils/fetchUtil"

import ClientsTable from "@/components/ClientsTable"
import ClientModal from "@/components/ClientModal"
export default {
  components: {
    ClientsTable,
    ClientModal,
  },
  data() {
    return {
      clients: [],
      showModal: false
    }
  },
  async mounted() {
    const clients = await fetchUtil('http://localhost:3000/client/')
    this.clients = await clients.json()
  },
}
</script>

<style lang="sass">
#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

$button-background: linear-gradient(0deg, #e3e3e3, #fbfbfb)
$button-border-color: #bdbdbd
$button-text-color: #868686

$input-border-color: #dbdbdb

.custom-button
  outline: 0
  border: 0
  background: $button-background
  border: 1px solid $button-border-color
  border-radius: 5px
  padding: 6px 12px
  font-weight: bold
  color: $button-text-color
  font-size: 12px
  cursor: pointer

.custom-input
  border-radius: 5px
  border: 1px solid $input-border-color
  padding: 5px
  &:focus
      outline: none
</style>
