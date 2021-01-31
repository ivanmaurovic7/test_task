<template>
    <div class="provider">
        <div v-if="!edit">
            <input type="checkbox" @change="$emit('set-selected-providers', provider._id)" :checked="isSelected">
            <span>{{provider.name}}</span>
            <fa icon="edit" @click="edit = true"/>
            <fa icon="trash" @click="deleteProvider"/>
        </div>
        <div v-else>
            <input class="custom-input" type="text" v-model="name" @keypress.enter="editProvider">
            <fa icon="check" @click="editProvider"/>
            <fa icon="times" @click="edit = false"/>
        </div>
    </div>
</template>

<script>
export default {
    props: ['provider', 'isSelected'],
    data() {
        return {
            edit: false,
            name: this.provider.name
        }
    },
    watch: {
        edit(v) {
            if(!v) {
                this.name = this.provider.name
            }
        }
    },
    methods: {
        deleteProvider() {
            this.$emit('delete-provider', this.provider._id)
        },
        editProvider() {
            this.$emit('update-provider', {_id: this.provider._id, name: this.name})
            this.edit = false
        },
    }
}
</script>

<style lang="sass" scoped>
.provider
    margin-bottom: 5px
    display: flex
    align-items: center
    input[type="checkbox"]
        position: relative
        top: 2px
        cursor: pointer
    input[type="text"]
        width: 65%
        margin-right: 10px
    span
        position: relative
        top: 1px
        margin-right: 10px
        margin-left: 10px
        font-size: 14px
svg
    cursor: pointer
    color: #616161
    margin: 0 5px
    font-size: 13px
</style>