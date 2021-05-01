const handleSignin = (req, res,db) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect form submit')
    }
    db.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(data => {
        if(data[0].hash === req.body.password){
            return db.select('*').from('users')
            .where('email','=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        }
        else{
            return res.status(400).json('wrong credentials')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
};

module.exports = {
    handleSignin: handleSignin
}