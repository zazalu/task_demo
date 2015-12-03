/**
 * Created by gaoge on 12/2/15.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('express start');
});

module.exports = router;
