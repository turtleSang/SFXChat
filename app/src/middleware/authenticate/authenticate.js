const jwt =require("jsonwebtoken");


const authenticate = (req, res, next)=>{
    let token = req.header("token");
    if (token) {
        let decode = jwt.verify(token, "ThankSen");
        if (decode) {
            req.body.user = decode;            
            return next();
        } else {
            res.status(500).send({
                text: "Vui lòng đăng nhập",
                type: false
           })
        }
    }else{
       res.status(500).send({
            text: "Vui lòng đăng nhập",
            type: false
       })
    }
}

module.exports = {authenticate}