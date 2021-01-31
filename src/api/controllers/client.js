const mongoose = require('mongoose')

const Client = mongoose.model('Client')

module.exports.getClients = async (req, res, next) => {
    try {
        const clients = await Client.find({}).populate('providers')
        res.json(clients)
    } catch (e) {
        next(e)
    }
}

module.exports.addClient = async (req, res, next) => {
    try {
        const {name, email, phone, providers} = req.body
        let client = await Client.create({name, email, phone, providers})
        client = await client.populate('providers').execPopulate()

        res.json(client)
    } catch (e) {
        next(e)
    }
}

module.exports.updateClient = async (req, res, next) => {
    try {
        const {_id, name, email, phone, providers} = req.body
        await Client.findByIdAndUpdate(_id, {name, email, phone, providers})
        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

module.exports.deleteClient = async (req, res, next) => {
    try {
        const {_id} = req.body
        await Client.findByIdAndDelete(_id)
        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}