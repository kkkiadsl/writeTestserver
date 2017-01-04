/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
	name: String,
	author: String,
	published_date: { type:Date, defult: Date.now }
});

module.exports = mongoose.model('book', bookSchema);