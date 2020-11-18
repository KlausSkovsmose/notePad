const express = require('express')
const router = express.Router()

// @desc    Login and landing page
// @route   GET /
router.get('/', (req, res) => {
    res.render('index')
})

// @desc note dashboard
// @route GET /dashboard
router.get('/dashboard', (req, res) => {
    res.render('notepad')
})

module.exports = router