const express = require("express");
const session = require('express-session');
const verify = require('../Authorization/verify');
const bcryptjs = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../Authorization/gaurd")
const db = require('../hris/Database')
const { rateLimit }  = require('express-rate-limit')
const path = require('path');



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
    const { Email, Password } = req.body;

  
    if (!Email || !Password) {
        return res.status(400).json({ message: 'Email and Password are required' });
    }
  
    try {
  
        const sql = `SELECT * FROM ${directoryName} WHERE Email = ?`;
        const results = await db.executeQuery(sql, [Email]);
  
        if (results.length === 0) {
            return res.status(404).json({ message: 'No account found with this Email' });
        }
  
        const user = results[0];
    

        bcryptjs.compare(Password, user.Password, (err, result) => {
  
            if (err || !result) {
                return res.status(401).json({ message: 'Password does not match' });
            }
  
            const token = jwt.sign({ Email: user.Email }, process.env.AUTHENTICATED_SECRET_KEY, { expiresIn: '1hr' });

            const { Password, ...userProfile } = user;
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

  const { FirstName, MiddleName, LastName, Phone, Email, Password } = req.body;

  if (!FirstName || !LastName || !Email || !Password) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  try {
      const hashedPassword =  await bcryptjs.hash(Password, 10);
      const sql = `INSERT INTO ${directoryName} (FirstName, MiddleName, LastName, Phone, Email, Password) VALUES (?, ?, ?, ?, ?, ?)`;
      const result = await db.insertQuery(sql, [FirstName, MiddleName, LastName, Phone, Email, hashedPassword]);
   
      res.status(201).json({ id: result.EmployeeID, FirstName, MiddleName, LastName, Phone, Email });
  } catch (error) {
      console.error('Error registering employee:', error);
      res.status(500).json({ error: 'Failed to register employee' });
  }
});


router.put('/update-profile/:id', auth, async (req, res) => {
  const id = req.params.id;
    const { FirstName, MiddleName, LastName, Phone, Email,Password,EmergencyPhoneNumber,CurrentAddress,PermanentAddress } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {

        const hashedPassword =  await bcryptjs.hash(Password, 10);
        let sql = `UPDATE ${directoryName} SET`;
        const values = [];

        if (FirstName) {
            sql += ' FirstName = ?,';
            values.push(FirstName);
        }

        if (MiddleName) {
            sql += ' MiddleName = ?,';
            values.push(MiddleName);
        }

        if (LastName) {
            sql += ' LastName = ?,';
            values.push(LastName);
        }

        if (Phone) {
            sql += ' Phone = ?,';
            values.push(Phone);
        }

        if (Email) {
            sql += ' Email = ?,';
            values.push(Email);
        }

        if(hashedPassword) {
           sql += 'Password = ?,';
           values.push(hashedPassword);
        }

        if (EmergencyPhoneNumber) {
            sql += ' EmergencyPhoneNumber = ?,';
            values.push(emergencyPhoneNumber);
        }

        if (CurrentAddress) {
            sql += ' CurrentAddress = ?,';
            values.push(currentAddress);
        }

        if (PermanentAddress) {
            sql += ' PermanentAddress = ?,';
            values.push(permanentAddress);
        }

    
       
        sql = sql.slice(0, -1); 
        sql += ' WHERE EmployeeID = ?';
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
      const sql = `DELETE FROM ${directoryName} WHERE EmployeeID = ?`;
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





router.get('/all-profile/:limit/:offset',auth,async (req, res) => {
    try{
        const users = await db.executeQuery(`SELECT EmployeeID,FirstName,MiddleName,LastName,Phone,Email FROM ${directoryName} LIMIT ${req.params.limit} OFFSET ${req.params.offset}`);
        res.status(200).json({users});
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
        throw new Error()
    }
  });



  




  module.exports = router 
  