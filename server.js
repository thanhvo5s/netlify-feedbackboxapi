const express = require('express')

//Solve CORS Error in app
const cors = require("cors")
//const domainsFromEnv = process.env.CORS_DOMAINS || ""
const whitelist = ["http://192.168.1.6:19006", "http://192.168.1.2:19006", 
"http://localhost:19006", "http://192.168.1.2:19007", "http://localhost:19007",
"https://5sfeedbackboxadmin.netlify.app", "https://5sfeedbackbox.netlify.app",
"http://14.225.210.171:40635", "http://14.225.210.171:45751"]
//console.log(`domainsFromEnv = ${domainsFromEnv}`)
//const whitelist = domainsFromEnv.split(",").map(item => item.trim())

const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        //console.log(`allow access by ${origin}`)
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  }
//End Solve CORS Error in app  


const app = express()

//Solve CORS Error in app:
//app.use(cors({
//  origin: '*'
//}));
app.use(cors(corsOptions))//Solve CORS Error in app

const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 3000
//const port = process.env.PORT || 3306

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let routes = require('./api/routes') //importing route
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)

console.log('RESTful API server started on: ' + port)