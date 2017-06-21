var router = require('express').Router();
var rh = require("../Libs/ResponseHandler");

//列出所有资源
router.all("/list", function(req, res, next){
    //返回结果
    rh(res, 200, null, "返回资源列表", null, null);
});

module.exports = router;