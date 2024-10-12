const express = require('express');
const dotenv = require('dotenv')

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
}).on("error", (error: any) => {
    throw new Error(error.message);
})