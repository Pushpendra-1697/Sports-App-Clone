//middleware for validate Unauthorized user
const validate = (req, res, next) => {
    const { token } = req.headers;
    if (token) {
        next();
    } else {
        res.send({ "status": "NO", "msg": "Unauthorized Please Login First" });
    }
}

module.exports = { validate };