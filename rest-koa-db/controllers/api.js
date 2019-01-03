const products = require('../products');

const APIError = require('../rest').APIError;

module.exports = {
    'GET /api/products': async (ctx, next) => {
        //var prods = [{id: 'p3',name: 'ThinkPad T440',manufacturer: 'Lenovo',price: 5999 }];
        var prods = [];
        prods = await products.getProducts();   //数据库查询为异步操作，先获取到数据在渲染
        ctx.rest({
            products: prods
        });
    },

    'GET /api/products/:id': async (ctx, next) => {
        var prods = [];
        prods = await products.getProduct(ctx.params.id);   //数据库查询为异步操作，先获取到数据在渲染
        ctx.rest({
            products: prods
        });
    },

    'POST /api/products': async (ctx, next) => {
        var p = await products.createProduct(ctx.request.body.name, ctx.request.body.manufacturer, parseFloat(ctx.request.body.price));
        ctx.rest(p);
    },

    'DELETE /api/products/:id': async (ctx, next) => {
        console.log(`delete product ${ctx.params.id}...`);
        var p = await products.deleteProduct(ctx.params.id);
        if (p) {
            ctx.rest(p);
        } else {
            throw new APIError('product:not_found', `product not found by id ${ctx.params.id}`);
        }
    }
};
