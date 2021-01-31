<template>
  <div class="clients-table">
    <div class="header">
      <h2>Clients</h2>
      <button class="custom-button" @click="$emit('show-modal', {type: 'add'})">New Client</button>
    </div>
    <table v-if="clients.length">
      <tr class="table-header-row">
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Providers</th>
        <th></th>
      </tr>
      <tr v-for="client in clients" :key="client._id">
        <td>{{client.name}}</td>
        <td>{{client.email}}</td>
        <td>{{client.phone}}</td>
        <td>{{client.providers && client.providers.map(p => p.name).join(', ')}}</td>
        <td>
          <div class="table-actions">
            <span @click="$emit('show-modal', {type: 'edit', data: client})">Edit</span>
            <span @click="deleteClient(client._id)">Delete</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import fetchUtil from "@/utils/fetchUtil"

export default {
  props: ['clients'],
  methods: {
    async deleteClient(_id) {
        const deleteClient = await fetchUtil('http://localhost:3000/client/', 'DELETE', {_id})
        if(deleteClient.status !== 200) {
            alert("Something went wrong")
            return
        }

        this.$emit('set-clients', this.clients.filter(c => c._id !== _id))
    },
  }
}
</script>

<style lang="sass" scoped>
$header-background: #e8f0f4
$header-text-color: #1d97c4

$table-header-cell-background-color: #f7f7f7
$table-header-cell-border-color: #d3d3d3
$table-cell-text-color: #616161
$table-cell-action-color: #7b9eaa
$table-cell-border-color: #e9e9e9

.clients-table
  width: 700px
  .header
    background: $header-background
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px 10px 8px 16px
    box-sizing: border-box
    h2
      color: $header-text-color
      font-size: 17px
      margin: 0
  table
    width: 100%
    border-collapse: collapse
    .table-header-row
      box-shadow: 0 3px 2px -2px gray
    .table-actions
      display: flex
      justify-content: space-evenly
      align-items: center
      span
        text-decoration: underline
        color: $table-cell-action-color
        cursor: pointer
    th, td
      text-align: left
    th
      background: $table-header-cell-background-color
      border: 1px solid $table-header-cell-border-color
      color: $table-cell-text-color
      padding: 7px 14px
      font-size: 13px
      margin: 0
      border-spacing: 0 !important
    td
      border: 1px solid $table-cell-border-color
      padding: 7px 14px
      font-size: 12px
      color: $table-cell-text-color
</style>
