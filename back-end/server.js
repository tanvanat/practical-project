const express = require("express");
const app = express();

app.use(express.static("public"))
// any files in the public folder can be accessed directly by their URL
app.use(express.urlencoded({extended: true}))
// middleware
app.set("view engine", "ejs")
//ejs used for showing html file to user
//express by default look in views folder
const userRouter = require("./routes/users")

app.use("/users", userRouter)
// any requests to URLs starting with /users will be handled by the userRouter
app.listen(3000)

