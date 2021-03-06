const express = require('express')
const cors = require('cors');
const fs = require('fs')

const port = process.env.PORT || 3000;

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    fs.writeFile('req.txt', JSON.stringify(req.query), err => {
        if (err) {
            console.error(err)
            return
        }
        res.send('Request saved!')
    })
})

app.post('/', (req, res) => {
    fs.writeFile('req.txt', JSON.stringify(req.params), err => {
        if (err) {
            console.error(err)
            return
        }
        res.send('Request saved!')
    })
})

app.get('/r', (req, res) => {
    fs.readFile('req.txt', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        res.send(data)
    })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})