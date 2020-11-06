var mongoose = require('mongoose')
require('dotenv').config()


var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(process.env.DB_CONNECTION,
    options,
    function(err){
        if(err){
            console.log(err)
        } else {
            console.log('CONNECTED TO BdD')
        }
    }
)

module.exports = mongoose
  