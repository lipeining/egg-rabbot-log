'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx, app } = this;
        ctx.body = 'hi, egg';
        ctx.logger.error('iiiiii');
        // app.getLogger('shareDocLogger').error('error-dfdsf');
        app.getLogger('shareDocLogger').info('info-dfdsf');
    }
}

module.exports = HomeController;