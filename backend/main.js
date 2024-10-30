const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const Authenticate = require('./Employees/Authentication');
const helmet = require('helmet');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const whitelist = process.env.LOCAL_URL.split(',');

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};


app.use(cors(corsOptions));
app.use(helmet());
app.use('/api/auth', Authenticate);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
