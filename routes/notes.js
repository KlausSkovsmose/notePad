const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('Here is all your notes')
})

module.exports = router