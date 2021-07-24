
const  mongoose = require('mongoose')
const Schema = mongoose.Schema

//mongoose schema
const BankSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type:String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    accounts: [
        {
            accountId:{
                type: Schema.Types.ObjectId,
                ref: "Account",
                required: true
            }
        }
    ]
})

//creating model via mongoose
 const BankModel =  mongoose.model("Bank", BankSchema)

module.exports = BankModel 