import express from 'express'

const app = express()

app.get('/test', (req, res) => {
  return res.send('Olá!')
})

app.post('/test-post', (req, res) => {
  return res.send('Olá Post!')
})

app.listen(3001, () => { console.log('Server is running! Yeah!') })
