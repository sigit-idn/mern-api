exports.register = (req, res, next) => {
    const {name, email, password} = req.body
    res.status(201).json({
        uid         : 1,
        message     : 'Register successfully',
        data        : {
            name, email
        }
    })

    next()
}