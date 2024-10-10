const express = require("express");
const session = require('express-session');
const verify = require('../Authorization/verify');
const bcryptjs = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../Authorization/gaurd")
const db = require('../User/Database')
const { rateLimit }  = require('express-rate-limit')
const path = require('path');
const multer = require('multer')


const currentDirectory = __dirname;
const directoryName = path.basename(currentDirectory);


router.use(session({
    secret: process.env.AUTHENTICATED_SECRET_KEY,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 6000000,
    },
}))


const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, 
	max: 20,
    skipSuccessfulRequests: true, 
    handler : (req,res) => {
         res.status(400).json({message: 'We recieve too many request please try after 15min'});
    }
})


router.post('/login', limiter, async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
  
        const sql = `SELECT * FROM ${directoryName} WHERE email = ?`;
        const results = await db.executeQuery(sql, [email]);
  
        if (results.length === 0) {
            return res.status(404).json({ message: 'No account found with this email' });
        }
  
        const user = results[0];

        bcryptjs.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ message: 'Password does not match' });
            }
  
            const token = jwt.sign({ email: user.email }, process.env.AUTHENTICATED_SECRET_KEY, { expiresIn: '10hrs' });

            const { password, ...userProfile } = user;
            req.session.user = userProfile

            

            req.session.authenticated = true

            res.status(200).json({session:req.session.user,token});
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });






router.post('/register', auth, async (req, res) => {

  const { firstName, middleName, lastName, phone, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  try {
      const hashedPassword =  await bcryptjs.hash(password, 10);
      const sql = `INSERT INTO ${directoryName} (firstName, middleName, lastName, phone, email, password) VALUES (?, ?, ?, ?, ?, ?)`;
      const result = await db.insertQuery(sql, [firstName, middleName, lastName, phone, email, hashedPassword]);
   
      res.status(201).json({ id: result.id, firstName, middleName, lastName, phone, email });
  } catch (error) {
      console.error('Error registering employee:', error);
      res.status(500).json({ error: 'Failed to register employee' });
  }
});


router.put('/update-profile/:id', auth, async (req, res) => {
  const id = req.params.id;
    const { firstName, middleName, lastName, phone, email,password,emergencyPhoneNumber,currentAddress,permanentAddress } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {

        const hashedPassword =  await bcryptjs.hash(password, 10);
        let sql = `UPDATE ${directoryName} SET`;
        const values = [];

        if (firstName) {
            sql += ' firstName = ?,';
            values.push(firstName);
        }

        if (middleName) {
            sql += ' middleName = ?,';
            values.push(middleName);
        }

        if (lastName) {
            sql += ' lastName = ?,';
            values.push(lastName);
        }

        if (phone) {
            sql += ' phone = ?,';
            values.push(phone);
        }

        if (email) {
            sql += ' email = ?,';
            values.push(email);
        }

        if(hashedPassword) {
           sql += 'password = ?,';
           values.push(hashedPassword);
        }

        if (emergencyPhoneNumber) {
            sql += ' emergencyPhoneNumber = ?,';
            values.push(emergencyPhoneNumber);
        }

        if (currentAddress) {
            sql += ' currentAddress = ?,';
            values.push(currentAddress);
        }

        if (permanentAddress) {
            sql += ' permanentAddress = ?,';
            values.push(permanentAddress);
        }

    
       
        sql = sql.slice(0, -1); 
        sql += ' WHERE id = ?';
        values.push(id);

    
        const result = await db.executeQuery(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'User profile updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})




router.delete('/delete-profile/:id', auth, async (req, res) => {
  const id = req.params.id;

  if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
  }

  try {
      const sql = `DELETE FROM ${directoryName} WHERE id = ?`;
      const result = await db.executeQuery(sql, [id]);

      if (result.affectedRows > 0) {
          res.status(200).json({ message: 'User profile deleted successfully' });
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error deleting user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});







router.get('/all-profile/:limit/:offset', auth,async (req, res) => {
    try{
        const users = await db.executeQuery(`SELECT id,firstName,middleName,lastName,phone,email FROM ${directoryName} LIMIT ${req.params.limit} OFFSET ${req.params.offset}`);
        res.status(200).json({users});
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
        throw new Error()
    }
  });



  




  module.exports = router 
  