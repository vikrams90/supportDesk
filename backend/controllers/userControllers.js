const registerUser = (req,res)=>{
        res.send("user registered")
}

const loginUser = (req,res) => {
    res.send("user logged in")
}

module.exports = {
    registerUser,
    loginUser,
}