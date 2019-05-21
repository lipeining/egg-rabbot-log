'use strict';

const ShareDocTransport = require('./transport/sharedoc');


module.exports = async app => {
    app.on('error', async (err, ctx) => {
        console.log('in app.js');
        console.log(err);
    });
    app.ready(async () => {
        // app.js 中给 errorLogger 添加 transport，这样每条日志就会同时打印到这个 transport 了
        // app.getLogger('errorLogger').set('remote', new ShareDocTransport({ level: 'ERROR', app }));
        // 这里的level决定哪种级别以上的日志可以调用transport中的log方法
        // app.getLogger('shareDocLogger').set('remote', new ShareDocTransport({ level: ['ERROR', 'INFO'], app }));
        app.getLogger('shareDocLogger').set('remote', new ShareDocTransport({ level: 'INFO', app }));
        const rabbot = app.rabbot;
        // console.log(rabbot);
        rabbot.handle('MyMessage', (msg) => {
            // console.log('received msg', JSON.stringify(msg, null, 2));
            msg.ack();
        });

        rabbot.handle('MyRequest', (req) => {
            // console.log('received request', JSON.stringify(req, null, 2));
            req.reply('yes?');
        });
        await rabbot.request('ex.1', { type: 'MyRequest', body: 'wow' })
            .then(
                reply => {
                    console.log('got response:', reply.body);
                    reply.ack();
                }
            );
        await rabbot.publish('ex.1', { type: 'MyMessage', body: 'hello!' });
    });
};