/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var writeSchema = new Schema({
	title: String,
	contents : String,
	status: String,
	id:String,
	published_date: { type:Date, defult: Date.now }
});

module.exports = mongoose.model('write', writeSchema);