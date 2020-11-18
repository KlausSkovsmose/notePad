const express = require('express')
const router = express.Router()


router.get('/notes', (req, res) => {
    res.send('Here is all you notes')
})

module.exports = router