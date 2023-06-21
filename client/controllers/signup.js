
const {getUserCollection} = require("../database/database");

exports.signup = async (request, response) =>{
    try{
    const userCollection = getUserCollection();
    const {name, password, email} =  request.body;

    //Perform passwordhash for security

     userCollection.insertOne({name, password, email})
     .then(()=>{
      response.json()
      console.log("User signup was successsful")
    })
}catch(err){
    response.status(500).json("Internal Server Error")
}
}