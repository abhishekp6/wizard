const mongooseClient = require('mongoose');

const connectDB = async () => {
    try {
        await mongooseClient.connect(process.env.MONGO_SRV);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;