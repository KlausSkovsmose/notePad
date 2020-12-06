const router = require('express').Router()
const User = require('../models/User')

// Validation joi
const Joi = require('@hapi/joi')

const joiValSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
})

router.post('/register', async (req, res) => {

    // Validate data before creating user
    const {error} = joiValSchema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // Create User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = router