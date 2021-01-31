const mongoose = require('mongoose')
const Provider = mongoose.model('Provider')

module.exports.getProviders = async (req, res, next) => {
    try {
        const providers = await Provider.find({})
        res.json(providers)
    } catch (e) {
        next(e)
    }
}

module.exports.addProvider = async (req, res, next) => {
    try {
        const {name} = req.body
        const provider = await Provider.create({name})
        res.json(provider)
    } catch (e) {
        next(e)
    }
}

module.exports.updateProvider = async (req, res, next) => {
    try {
        const {_id, name} = req.body
        await Provider.findByIdAndUpdate(_id, {name})
        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

module.exports.deleteProvider = async (req, res, next) => {
    try {
        const {_id} = req.body
        await Provider.findByIdAndDelete(_id)
        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}