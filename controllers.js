const AccountModel = require('./accountModel');
const BankModel = require('./module');

//controllers
const createBankController = (req, res) => {
    //create bank
    const {name, location, branch, phone, address, accountNumber} = req.body

    //instant for bankModel
    const bank = new BankModel({name, location, branch, phone, address, accountNumber})
    
    bank.save().then( result => {
        res.json({message:` ${bank.name} created successfuly`, data: result})
    }) 
    .catch(err => console.log(err))
}

const createAccountController = (req, res) => {
    const { name, number, accountType, bankId } = req.body;

    const account =  new AccountModel({ name, number, accountType, bankId });
    account.save().then( result => {
        (result ? res.json({message: 'account created', data:result}) : res.json({message:'failed to create'}))
        // if(result)
        //     res.json({message:'Account created successfuly', data: result});
        // else 
        //     res.json({message: "failed to create acccount"});
    })
}

//retrive data via mongoose
const listBankController = (req, res) => {
    //get id 
    const { id } = req.param //req.param
    if(id){
        BankModel.find({_id: id})
        .then( banks => {
            res.json({data: banks})
        }).catch(err => console.log(err))
    }else{
        BankModel.find().populate().then( banks => {
            res.json({data: banks})
        }).catch(err => console.log(err))      
    }
}

//list Account controllers
const listAccountController = (req, res) => {
    AccountModel.find()
    .populate("bankId")
    .then( account => {
        res.json({data: account})
    })
    .catch(err => console.log(err))
    
}
 
 const updateBankController = (req, res) => {

       const { id, name, location, address, branch, phone, accountNumber } = req.param

       BankModel.findById(id).then( bank => {
           if(bank){
               bank.name = name;
               bank.location = location;
               bank.address = address;
               bank.branch = branch;
               bank.phone = phone;
               bank.accountNumber = accountNumber;

               bank.save()
               res.json({message:'update successful', data: bank})
           }
           res.json({message:'update failed'})

       }).catch(error => console.log(error))
}


const deleteBankController = (req, res) => {
//     //delete bank
    const { id } = req.body;
    BankModel.findByIdAndRemove(id).then( deletedBank =>{
        if(deletedBank){
            res.json({message: 'bank deleted', data: deletedBank})
            return;
        }
        res.json({message: 'bank not found'})

    }).catch(err => console.log(err))
    
}


module.exports = {
    listBankController, 
    createBankController, 
    updateBankController, 
    deleteBankController,
    createAccountController,
    listAccountController
}