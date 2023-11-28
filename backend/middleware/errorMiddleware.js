// error handler middleware 

const errorHandler = (err, req, res, next)=>{

    // status code is less than 400 than using its value otherwise using 500
    const statusCode =  res.statusCode < 400 ? res.statusCode : 500
    res.status(statusCode)

    res.json({
        message : err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack
    })

}

module.exports = errorHandler
