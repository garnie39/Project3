
// const {getUserCollection} = require("../database/database");
// const bcrypt = require('bcrypt');

// exports.signup = async (request, response) =>{
//     try{
//     const userCollection = getUserCollection();
//     const {username, password, email} =  request.body;

//     //Perform passwordhash for security
    
//     const passwordHash = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync)
//         console.log(request.body);

//      userCollection.insertOne({username, password, email})
//      .then(()=>{
//       response.json()
//       console.log("User signup was successsful")
//     })
// }catch(err){
//     response.status(500).json("Internal Server Error")
// }
// }