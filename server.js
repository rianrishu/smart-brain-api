const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const { res } = require('express');
app.use(express.json());
app.use(cors());

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex(
    {
        client: 'pg',
        connection: {
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false
          }
        }
      }
);

db.select('*').from('users');

app.get('/',(req,res) => {res.send("working")});

// signin
app.post('/signin', (req, res) => {signin.handleSignin(req,res,db)})

// register
app.post('/register', (req,res) => { register.handleRegister(req,res,db) });

//profile
app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db)});

//image count
app.put('/image', (req, res) => {image.handleImage(req, res, db)});

//imageUrl
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`Master Rian, overall app is running successfully on port ${process.env.PORT}`);
});