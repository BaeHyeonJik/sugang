const express = require('express')
const path = require('path');
const cors = require('cors')
const session = require('express-session')


const app = express()
const PORT = 3000;
app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

const backRoutes = require('./routes/back')
const gotoRoutes = require('./routes/goto')
const makeidRoutes = require('./routes/makeid')
const userloginRoutes = require('./routes/userlogin')
const userlogoutRoutes = require('./routes/userlogout')
const mylectureRoutes = require('./routes/mylecture')
const addlectureRoutes = require('./routes/professor/addlecture')
const addboardRoutes = require('./routes/professor/addboard')

app.use("/back", backRoutes)
app.use("/goto", gotoRoutes)
app.use("/makeid", makeidRoutes)
app.use("/userlogin", userloginRoutes)
app.use("/userlogout", userlogoutRoutes)
app.use("/mylecture", mylectureRoutes)
app.use("/addlecture", addlectureRoutes)
app.use("/addboard", addboardRoutes)


app.get('/', (req, res) => {
  res.render('loginpage', {message: ''});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});