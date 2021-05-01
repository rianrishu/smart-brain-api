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

const db = knex(
    {
        client: 'pg',
        connection: {
          host : '127.0.0.1',
          user : 'postgres',
          password : '123',
          database : 'smart_brain'
        }
      }
);

db.select('*').from('users');

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


app.listen(3000, () => {
    console.log('Master Rian, overall app is running successfully');
});