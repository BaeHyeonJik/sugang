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

const gotosignupRoutes = require('./routes/gotosignup')
const makeidRoutes = require('./routes/makeid')
const userloginRoutes = require('./routes/userlogin')
const userlogoutRoutes = require('./routes/userlogout')
const mylectureRoutes = require('./routes/mylecture')
const gotomakelectureRoutes = require('./routes/professor/gotomakelecture')
const makelectureRoutes = require('./routes/professor/makelecture')
const gotomakeboardRoutes = require('./routes/professor/gotomakeboard')
const makeboardRoutes = require('./routes/professor/makeboard')


app.use("/gotosignup", gotosignupRoutes)
app.use("/makeid", makeidRoutes)
app.use("/userlogin", userloginRoutes)
app.use("/userlogout", userlogoutRoutes)
app.use("/mylecture", mylectureRoutes)
app.use("/gotomakelecture", gotomakelectureRoutes)
app.use("/makelecture", makelectureRoutes)
app.use("/gotomakeboard", gotomakeboardRoutes)
app.use("/makeboard", makeboardRoutes)




app.get('/', (req, res) => {
  res.render('login', {message: ''});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});