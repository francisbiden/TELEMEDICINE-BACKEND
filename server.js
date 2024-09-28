
// Declare dependencies/ variables
const express = require('express')
const app = express() // here we initialized an instance of express and named it app
const mysql = require('mysql2') 
const dotenv = require ('dotenv')
const cors = require ('cors')

app.use(express.json())
app.use(cors())
dotenv.config()


// connect to the database

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME

    }
)

// check if db connection works
db.connect((err) => {
    // no connection
    if(err) return console.log("Error connecting to the mysql db")
    
    // when connected
    console.log("Connected to mysql successfully as id: ", db.threadId)  

    // my code goes here
    // GET-METHOD
    app.set('view engine','ejs')
    app.set('views', __dirname + '/views')

    // Data is the name of the file inside views folder
    app.get('/data',(req,res) => {
        db.query("SELECT * FROM patients", (err,results) => {
            if(err){
                console.error(err)
                res.status(500).send('Error retrieving data')
            }else {
                // Display the records to the browser
                res.render('data', {results:results})
            }
        })
    })
    // Here we are querying data from provider table
    app.get('/provider',(req,res) => {
        db.query("SELECT * FROM providers", (err,results) => {
            if(err){
                console.error(err)
                res.status(500).send('Error retrieving data')
            }else {
                // Display the records to the browser
                res.render('provider', {results:results})
            }
        })
    })
    
    //
    app.get('/patient2',(req,res) => {
        db.query("SELECT * FROM patients", (err,results) => {
            if(err){
                console.error(err)
                res.status(500).send('Error retrieving data')
            }else {
                // Display the records to the browser
                res.render('patient2', {results:results})
            }
        })
    })

    // Retrieving all providers by their speciality
    app.get('/provider2',(req,res) => {
        db.query("SELECT * FROM providers", (err,results) => {
            if(err){
                console.error(err)
                res.status(500).send('Error retrieving data')
            }else {
                // Display the records to the browser
                res.render('provider2', {results:results})
            }
        })
    })
    
    app.listen(process.env.PORT, () => {
        console.log(`Server Listening on port ${process.env.PORT}`)

        //send message to the browser
        console.log('Sending message to the browser...')
        app.get('/',(req,res) => {
            res.send('Server started successfully! Wedding can go on !!!')
        })
    })
})

