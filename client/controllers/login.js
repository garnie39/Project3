const { getUserCollection } = require("../database/database");

exports.login = async (request, response) => {
  try {
    const { username, password } = request.body;

    const userCollection = getUserCollection();
    const user = await userCollection.findOne({ username: username });

    if (user && user.password === password) {
    
      console.log("User login was successsful")
    } else {
      
      response.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    response.status(500).json("Internal Server Error");
  }
};
