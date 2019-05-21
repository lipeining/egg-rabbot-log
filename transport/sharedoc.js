const util = require('util');
const Transport = require('egg-logger').Transport;
const CACHE = Symbol("ShareDoc#Cache");
class ShareDocTransport extends Transport {
    constructor(options) {
        super(options);
        this[CACHE] = [];
    }
    // 定义 log 方法，在此方法中把日志上报给远端服务
    // 在app中定义的level，决定哪些level可以调用这里的log方法
    log(level, args, meta) {
        console.log('in transport');
        // level: ERROR   args: { '0': 'error-dfdsf' } meta: {formatter, level,}
        console.log(level, args, meta);
        this.options.app.rabbot.publish('ex.1', {
            type: 'MyMessage',
            body: `hello!- op delta:${args[0]}`
        }).catch(console.error);
    }
    // 内存缓存的方式可能不能保证close方法的调用
    // log(level, args, meta) {
    //     console.log('in transport');
    //     // level: ERROR   args: { '0': 'error-dfdsf' } meta: {formatter, level,}
    //     console.log(level, args, meta);
    //     // this.options.app.rabbot.publish('ex.1', {
    //     //     type: 'MyMessage',
    //     //     body: `hello!- op delta:${args[0]}`
    //     // }).catch(console.error);
    //     this[CACHE].push({ exchange: 'ex.1', type: 'MyMessage', body: `hello!- op delta:${args[0]}` });
    //     // this[CACHE].push({ type: 'MyMessage', body: `hello!- op delta:${args[0]}` });
    //     if (this[CACHE].length >= 10) {
    //         this._flush();
    //     }
    // }
    // _flush() {
    //     console.log(`sharedoc flush ${this[CACHE].length}`);;
    //     // this.options.app.rabbot.bulkPublish({ 'ex.1': this[CACHE]})
    //     this.options.app.rabbot.bulkPublish(this[CACHE])
    //         .then(successed => {
    //             console.info(JSON.stringify(successed, null, 2));
    //         }, failed => {
    //             console.error(JSON.stringify(failed, null, 2));
    //         });
    //     this[CACHE] = [];
    // }
    // close() {
    //     this._flush();
    // }
}
module.exports = ShareDocTransport;