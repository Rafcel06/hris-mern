const express = require('express')
const cors = require('cors')
require('dotenv').config()
const path = require('path')
const Authenticate = require('./Employees/Authentication')


const PORT = process.env.PORT || 3001
const app = express()



app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


app.use('/api/auth', Authenticate)




if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend-MYSQL/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend-MYSQL', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}





app.listen(PORT, () => {
    console.log(`Server listen in ${PORT}`)
})