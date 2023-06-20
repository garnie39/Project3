const { getUserCollection } = require("../database/database");

exports.login = async (request, response) => {
  try {
    const userCollection = getUserCollection();
    userCollection.find().toArray().then((result) => {
      response.json(result);

    // userCollection.insertOne({
    //   name: "kyle",
    //   password: "kyle1",
    //   email: "kyle@outlook.com"
    // }).then(()=>{
    //   response.json()
    // })
    });
  } catch (err) {
    response.status(500).json("Internal Server Error");
  }
};
