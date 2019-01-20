const userSchema = require('../models/userModel').userSchema

exports.addUser = async (req, res) => {
  try {
    const name = req.body.name
    const age = req.body.age

    const newUser = await userSchema.findOne({
      name: name,
      age: age
    })
    if (newUser) {
      return res.status(409).json({ error: 'user already exists' })
    }
    await newUser.save()
    return res.status(201).json({ msg: 'User added' })
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

exports.showUsers = (req, res) => {
  try {
    const allUsers = await userSchema.find({})
    return res.status(200).json({ users: allUsers })
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
