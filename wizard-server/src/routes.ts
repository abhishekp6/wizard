const expressClient = require('express');
const router = expressClient.Router();


router.route('/healthCheck').get((req:any, res:any) => {
    return res.status(200).send({status: "All good!"});
})

module.exports = router;