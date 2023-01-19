const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

class Database {

    constructor(){
        this.connect();
    }

    connect(){
        mongoose.connect("mongodb+srv://TwitterNodePug:TwitterNodePug@twitternodepugcluster.qgn0d6g.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
            console.log("Database Connect Successful");
        })
        .catch((err) => {
            console.log("Database Connect Error" + err);
        })
    }
}

module.exports = new Database();

