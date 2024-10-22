const express = require("express")
const router = express.Router()
const users = [{ name: "kyle" }, { name: "sally" }]

router.use(logger)
//Attaches the logger middleware function to the router
 

router.get("/", (req, res) => {
    console.log(req.query.name)
    //http://localhost:3000/users?name=John
    res.json(users);
    res.send("user list")
})

router.get("/new", (req, res) => {
    res.render("users/new", { firstName: "Test" })
    //res.render method to render an EJS template. This method dynamically looks within the views directory
})

router.post("/", (req, res) => {
    const isValid = true
    if (isValid) {
        users.push({ firstName: req.body.firstName })
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log("Error")
        res.render("users/new", { firstName: req.body.firstName })
    }
})

//response section
router
    .route("/:id")
    .get((req, res) => {
        console.log(req.user)
        res.send(`get user with id ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`update user with id ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`delete user with id ${req.params.id}`)
    })


//function that match param
//middleware runs before the response section
router.param("id", (req, res, next, id) => {
    req.user = users[id]
    //from users array
    next()
    //go to response section
})


function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

module.exports = router