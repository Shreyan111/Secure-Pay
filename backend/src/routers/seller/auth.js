const express = require('express');
const auth = require("../../middlewares/sellerAuth");
const router = new express.Router()

router.post('/seller/login',auth,)

module.exports = router