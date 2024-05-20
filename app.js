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
    cookie: { secure: true }
  }))

const makeidRoutes = require('./routes/makeid')
const userloginRoutes = require('./routes/userlogin')
const userlogoutRoutes = require('./routes/userlogout')


app.use("/makeid", makeidRoutes)
app.use("/userlogin", userloginRoutes)
app.use("/userlogout", userlogoutRoutes)



app.get('/', (req, res) => {
  res.render('login', {message: ''});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});