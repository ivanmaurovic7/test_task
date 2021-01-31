const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProviderSchema = new Schema(
  {
    name: String,
  }
)

mongoose.model('Provider', ProviderSchema)
