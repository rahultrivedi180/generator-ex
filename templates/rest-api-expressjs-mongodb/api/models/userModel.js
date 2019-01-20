const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  age: Number
})

module.exports = {
  userSchema: mongoose.model('userSchema', userSchema)
}
