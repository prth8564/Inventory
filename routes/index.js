var express = require('express');
var router = express.Router();
const category_controller = require('../controllers/categoryController');
const item_controller = require('../controllers/itemCategory');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/items', item_controller.item_list);

router.get('/items/:id' , item_controller.item_details);

router.get('/category' , category_controller.category_list);
router.get('/category/:id' , category_controller.category_detail);
module.exports = router;