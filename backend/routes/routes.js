const express = require('express');
const router = express.Router();
const mapper = require('../util/mapper');

router.get('/mapit/:collection/:call_no/:status', mapper.map);

router.get('/', (req, res) => {
    res.send('it works');
});

module.exports = router;
