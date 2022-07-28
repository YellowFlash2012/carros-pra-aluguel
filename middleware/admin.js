const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        console.log(req.user.isAdmin);
        next()
    } else {
        res.status(401).send("Only the Admin can do that!")
    }
}

export default admin