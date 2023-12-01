const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        const mongo = 
        {
            uri: process.env.MONGODB_CNN,
            opt: { 
                user: process.env.MONGODB_USER,
                pass: process.env.MONGODB_PWD,
                dbName: process.env.MONGODB_DB,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            },
        };

        await mongoose.connect(mongo.uri, mongo.opt);
        console.log(`mongoose: ${mongoose.version}`);
        console.log('connected to db');

    } catch (error) {
        console.log(error);
        throw new Error('issue on db connection');
    }
}


module.exports = {
    dbConnection
}
