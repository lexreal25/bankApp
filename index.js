//import express
const express = require('express')
const bodyParser = require('body-parser')
const port = 3000
//import mongoose
const mongoose = require('mongoose')


const {createAccountController, listAccountController,listBankController, createBankController, updateBankController, deleteBankController} = require('./controllers')

// create instants of express server
const app = express();

//middlewares
app.use(bodyParser.json());


/* routes */
//view bank- get method
app.get('/bank/:id?', listBankController)
app.get('/account', listAccountController)
app.get('/login.html', listBankController)

//create bank- post method
app.post('/bank', createBankController)

//create account
app.post('/account', createAccountController)
//update bank- put method
app.put('/bank', updateBankController)

// //delete bank- delete method
app.delete('/bank', deleteBankController)

//connect to mongoose Db start server
mongoose.connect("mongodb+srv://user-123:user-123@lexorg.hkbta.mongodb.net/bankapp?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then( result => {
    console.log(result)
    app.listen(port, () => console.log('server ready on port:' + port))
})
.catch(err => console.log(err))