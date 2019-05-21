/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1558342644598_7552';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    config.rabbot = {
        // client 单实例， clients多实例
        client: {
            connection: {
                name: 'default',
                user: 'guest',
                pass: 'guest',
                host: 'localhost',
                port: 5672,
                vhost: '%2f',
                replyQueue: 'customReplyQueue',
            },
            exchanges: [
                { name: 'ex.1', type: 'fanout', autoDelete: false },
            ],
            queues: [
                { name: 'q.1', autoDelete: false, subscribe: true },
            ],
            bindings: [
                { exchange: 'ex.1', target: 'q.1', keys: [] },
            ],
        },
    };
    config.customLogger = {
        shareDocLogger: {
            file: path.join(appInfo.root, 'logs/sharedoc.log'),
        },
    };

    return {
        ...config,
        ...userConfig,
    };
};