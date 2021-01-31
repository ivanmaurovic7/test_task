const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    providers: [{
      type: Schema.Types.ObjectId,
      ref: 'Provider'
    }],
  }
)

mongoose.model('Client', ClientSchema)
