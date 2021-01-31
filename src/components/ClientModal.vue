<template>
    <div class="client-modal">
        <div class="header">
            <h2 v-if="showModal.type === 'add'">New client</h2>
            <h2 v-else-if="showModal.type === 'edit'">Edit client</h2>
        </div>
        <div class="body">
            <div class="form-field">
                <label>Name:</label>
                <input v-model="name" class="custom-input" type="text">
            </div>
            <div class="form-field">
                <label>Email:</label>
                <input v-model="email" class="custom-input" type="text">
            </div>
            <div class="form-field">
                <label>Phone:</label>
                <input v-model="phone" class="custom-input" type="text">
            </div>
            <div class="add-provider">
                <div class="form-field">
                    <label>Providers:</label>
                    <div class="input-wrapper">
                        <input class="custom-input" type="text" v-model="providerName" @keypress.enter="addProvider">
                    </div>
                    <button class="custom-button" @click="addProvider">Add Provider</button>
                </div>
                <div class="provider-list" v-if="providers.length">
                    <Provider v-for="provider in providers" :key="provider._id" :provider="provider" :isSelected="isSelectedProvider(provider._id)" @set-selected-providers="setSelectedProviders($event)" @delete-provider="deleteProvider($event)" @update-provider="updateProvider($event)"/>
                </div>
            </div>
        </div>
        <div class="footer">
            <button v-if="showModal.type === 'edit'" class="custom-button delete-button" @click="deleteClient">Delete Client</button>
            <button class="custom-button" @click="cancel">Cancel</button>
            <button class="custom-button" @click="addClient" v-if="showModal.type === 'add'">Add Client</button>
            <button class="custom-button" @click="editClient" v-else-if="showModal.type === 'edit'">Update Client</button>
        </div>
    </div>
</template>

<script>
import fetchUtil from "@/utils/fetchUtil"
import Provider from "@/components/Provider"
export default {
    props: ['showModal', 'clients'],
    components: {Provider},
    async mounted() {
        const providers = await fetchUtil('http://localhost:3000/provider/')
        this.providers = await providers.json()
    },
    methods: {
        async addClient() {
            if(this.name === '' || this.email === '' || this.phone === '') {
                alert('Please fill out all fields')
                return
            }

            const addClient = await fetchUtil('http://localhost:3000/client/', 'POST', {name: this.name, email: this.email, phone: this.phone, providers: this.selectedProviders})
            if(addClient.status !== 200) {
                alert("Something went wrong")
                return
            }

            const newClient = await addClient.json()
            this.$emit('set-clients', [...this.clients, newClient])
            this.$emit('show-modal', null)
        },
        async editClient() {
            if(this.name === '' || this.email === '' || this.phone === '') {
                alert('Please fill out all fields')
                return
            }

            const updatedClient = {_id: this.showModal.data._id, name: this.name, email: this.email, phone: this.phone, providers: this.selectedProviders}
            const editClient = await fetchUtil('http://localhost:3000/client/', 'PATCH', updatedClient)
            if(editClient.status !== 200) {
                alert("Something went wrong")
                return
            }

            const updatedClients = [...this.clients]
            updatedClients[updatedClients.findIndex(c => c._id === this.showModal.data._id)] = updatedClient
            this.$emit('set-clients', updatedClients)
            this.$emit('show-modal', null)
        },
        async deleteClient() {
            const deleteClient = await fetchUtil('http://localhost:3000/client/', 'DELETE', {_id: this.showModal.data._id})
            if(deleteClient.status !== 200) {
                alert("Something went wrong")
                return
            }

            this.$emit('set-clients', this.clients.filter(c => c._id !== this.showModal.data._id))
            this.$emit('show-modal', null)
        },
        async addProvider() {
            if(this.providerName === '') {
                return
            }

            const addProvider = await fetchUtil('http://localhost:3000/provider/', 'POST', {name: this.providerName})
            if(addProvider.status !== 200) {
                alert("Something went wrong")
                return
            }

            const newProvider = await addProvider.json()
            this.providers.push(newProvider)

            this.providerName = ''
        },
        async updateProvider(p) {
            if(p.name === '') {
                alert('Provider name cannot be empty string')
                return
            }

            const editProvider = await fetchUtil('http://localhost:3000/provider/', 'PATCH', {_id: p._id, name: p.name})
            if(editProvider.status !== 200) {
                alert("Something went wrong")
                return
            }
    
            this.providers.find(pr => pr._id === p._id).name = p.name
        },
        async deleteProvider(id) {
            const deleteProvider = await fetchUtil('http://localhost:3000/provider/', 'DELETE', {_id: id})
            if(deleteProvider.status !== 200) {
                alert("Something went wrong")
                return
            }
    
            this.providers = this.providers.filter(p => p._id !== id)
        },
        isSelectedProvider(id) {
            return this.selectedProviders.findIndex(p => p._id === id) !== -1
        },
        setSelectedProviders(id) {
            if(this.isSelectedProvider(id)) {
                this.selectedProviders = this.selectedProviders.filter(p => p._id !== id)
            } else {
                this.selectedProviders.push(this.providers.find(p => p._id === id))
            }
        },
        cancel() {
            this.$emit('show-modal', null)
        },
    },
    data() {
        return {
            name: this.showModal.type === 'edit' ? this.showModal.data.name : '',
            email: this.showModal.type === 'edit' ? this.showModal.data.email : '',
            phone: this.showModal.type === 'edit' ? this.showModal.data.phone : '',
            selectedProviders: this.showModal.type === 'edit' ? this.showModal.data.providers : [],
            providers: [],
            providerName: '',
        }
    }
}
</script>

<style lang="sass" scoped>
$header-text-color: #1d97c4
$modal-border-color: #dbdbdb
$modal-shadow-color: #575757

.client-modal
    position: fixed
    top: 50px
    left: 50px
    width: 600px
    background: #fff
    box-shadow: 0px 0px 6px $modal-shadow-color
    border-radius: 3px
    .header
        padding: 14px 10px 12px 16px
        border-bottom: 1px solid $modal-border-color
        h2
            color: $header-text-color
            font-size: 17px
            margin: 0
    .body
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        padding: 20px
        .form-field
            display: flex
            justify-content: flex-end
            align-items: center
            margin-bottom: 12px
            label
                font-weight: 800
                font-size: 11px
                margin-right: 8px
                width: 75px
                text-align: right
            input
                width: 300px
        .add-provider
            align-items: flex-start
            label
                margin-top: 5px
            .input-wrapper
                margin-right: 7px
                input
                    width: 193px
            .provider-list
                margin-left: 83px
                width: 205px
                display: flex
                flex-direction: column
                border-radius: 5px
                border: 1px solid #dbdbdb
                padding: 5px 10px
                margin-top: 8px
                box-sizing: border-box
    .footer
        display: flex
        justify-content: flex-end
        align-items: center
        border-top: 1px solid $modal-border-color
        position: relative
        button
            margin: 10px 8px 10px 0
            padding: 6px 20px
        .delete-button
            position: absolute
            left: 10px
            color: #fff
            background: linear-gradient(0deg, #bd0b16, #e25058)
</style>