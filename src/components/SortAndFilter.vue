<template>
    <div class="sort-and-filter">
        <span>Sort by:</span>
        <v-select 
            class="custom-select"
            :value="sortSelectedOption"
            @input="e => $emit('set-sort-option', e)"
            :options="sortOptions"
        />
    </div>
</template>

<script>
import sortOptions from "@/constants/sortOptions"

export default {
   props: {
       sortSelectedOption: String,
   },
   data() {
       return {
           sortOptions: sortOptions,
       }
   },
}
</script>

<style lang="sass">
.sort-and-filter
    background: #4a497b
    border-radius: 10px
    color: white
    padding: 20px
    display: flex
    align-items: center
    span
        font-size: 15px
    .custom-select
        display: inline-block
        width: 150px
        height: 30px
        margin-left: 20px
        *
            cursor: pointer
        .vs__dropdown-toggle,
        .vs__dropdown-menu
            border: none
            color: white
            font-size: 15px
        .vs__search,
        .vs__clear
            display: none
        .vs__open-indicator
            fill: white
            position: absolute
            top: 2px
            right: 4px
            bottom: 0
            margin: auto
        .vs__selected
            color: white
            font-weight: bold
</style>