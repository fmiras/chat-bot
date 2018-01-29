const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'))
})

router.get('/chat', (req, res) => {
  res.sendFile(path.resolve('views/chat.html'))
})

router.get('/bot', (req, res) => {
  res.sendFile(path.resolve('views/bot.html'))
})

module.exports = router
