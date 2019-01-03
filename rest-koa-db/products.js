//import { reject } from './C:/Users/charice.chang/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/async';

const mongoose = require('./db.js');

//定义Schema
var Schema = mongoose.Schema;

var productSchema = new Schema({
    id: {type: String},              //服务重启后，新建时ID从0开始计数，考虑取消
    name: {type: String},
    manufacturer: {type: String},
    price: {type: Number}
});

//定义Model 
//module.exports = mongoose.model('Product',productSchema);
const Product = mongoose.model('Product',productSchema);

var id = 0;

function nextId() {
    id++;
	console.log('p' + id);
    return 'p' + id;
}

module.exports = {
	createProduct: async(name, manufacturer, price) => {
		var result = [];
		var product = new Product({
			id: nextId(),
			name: name,
			manufacturer: manufacturer,
			price: price
		});
		var promise = new Promise((resolve, reject) => {
			product.save(function (err, res) {
				if (err) {
					console.log("Error:" + err);
					reject(err);
				}
				else {
					console.log("Res:" + res);
					resolve();
					result = res;
				}
			});
        });
		await promise;
		return result;
	},
	deleteProduct: async(id) => {
		var productId = {"id":""};
		var promise = new Promise((resolve, reject) => {
			Product.deleteOne({'_id': id}, function(err, res){
				if (err) {
					console.log("Error:" + err);
					reject(err);
				}
				else {
					console.log("Res:" + res);
					productId.id = id;
					resolve();
				}
			});
        });
		await promise;
		return productId;
	},
	update: async(id, price) => {
		var promise = new Promise((resolve, reject) => {
			Product.update({'id': id}, {'price': price}, function(err, res){
				if (err) {
					console.log("Error:" + err);
				}
				else {
					console.log(`Res -> id: ${id}, price: ${price}`);
				}
			});
        });
		await promise;
	},
	getProducts: async(ctx, next) => {
		var products =[];
		var promise = new Promise((resolve,reject) => {
            Product.find({}, function(err, res){  //数据库查询为异步操作
				if (err) {
					console.log("Error:" + err);
					reject(err);
				}
				else {
					//console.log("Res:" + res);
					res.forEach((p) => {
						products.push(p);
					})
					resolve(products);
				}
			});
        })
		await promise;
		return products;
    },
	getProduct: async(id) => {
		var product = null;
		console.log("id:" + id);
		var promise = new Promise((resolve,reject) => {    //数据库查询为异步操作
            Product.find({'_id': id}, function(err, res){
				if (err) {
					console.log("Error:" + err);
					reject(err);
				}
				else {
					console.log("Res:" + res);
					product = res;
					resolve(res);
				}
			});
        })
		await promise;
		return product;
		
		// await Product.find({'_id': id}, function(err, res){
		// 	if (err) {
		// 		console.log("Error:" + err);
		// 	}
		// 	else {
		// 		console.log("Res:" + res);
		// 		product = res;
		// 	}
		// });
	}
}