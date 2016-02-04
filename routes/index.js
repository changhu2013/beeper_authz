var express = require('express');
var router = express.Router();
var controller = require('../controller');

for(var action in controller){
	router.get('/' + (action === 'index' ? '' : action), controller[action]);
}

module.exports = router;
