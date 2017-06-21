/**
 * Redis管理模块
 */
/*** 模块引用 ***/
var Promise = require("es6-promise").Promise;
var poolModule = require('generic-pool');                               //数据库连接线程池（提高并发能力）
var redis = require("redis");

/*** 配置 ***/
var port = 6379;
var host = "192.168.102.86";
var options = {};

/*** 构造器 ***/
var factory = {
    create: function () {
        return new Promise(function (resolve, reject) {
            try{
                var client = redis.createClient(port, host, options);
                //连接成功
                client.on("ready", function () {
                    resolve(client);
                });
                //连接失败
                client.on("error", function (err) {
                    reject(err);
                });
            }catch(err){
                reject(err);
            }
        });
    },
    //当超时则释放连接（新版本完全交给连接池自己完成）
    destroy  : function(client) {
        return new Promise(function (resolve, reject) {
            try{
                client.end(true);
                resolve();
            }catch(err){
                reject(err);
            }
        });
    }
};
/*** 配置 ***/
var opt = {
    max:                                            10,     //根据应用的可能最高并发数设置
    acquireTimeoutMillis:                           5000,
    idleTimeoutMillis :                             30000,
    log :                                           false
};
var pool = poolModule.createPool(factory, opt);
//导出模块
module.exports = {
    /**
     * 开启连接池
     * @callback
     * @return Promise( 成功返回client提供操作，失败返回err)
     */
    open: function () {
        return pool.acquire();
    },
    /**
     * 关闭连接池
     * @client      客户端
     */
    close: function (client) {
        pool.release(client);
    }
};