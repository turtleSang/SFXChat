const checkNull = (req, res, next)=>{
    let { username, password, phonenumber } = req.body;
    if (!username || !password || !phonenumber) {
        res.status(500).send("Not null input");        
    }else{
        next();
    }
}

module.exports = {checkNull}