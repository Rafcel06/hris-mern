const verify = (req,res,next) => {
   
    if (req.session && req.session.authenticated) {
        return next(); 
      } else {
        return res.status(401).json({ error: 'Unauthorized' });
      }
}


module.exports = verify