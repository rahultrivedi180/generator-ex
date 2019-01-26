const userSchema = require('../models/userModel').userSchema

exports.addUser = async (req, res) => {
  try {
    const newUser = new userSchema({
      name: req.body.name,
      age: req.body.age
    })
    await newUser.save()
    return res.status(201).json({ msg: 'User added' })
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

exports.showUsers = async (req, res) => {
  try {
    const allUsers = await userSchema.find({})
    return res.status(200).json({ users: allUsers })
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
