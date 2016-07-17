/**
 * simple packaging O(∩_∩)O~
 */

var fs = require('fs')

let lib = 'c3'

let banner = '/*! The MIT License (MIT) https://github.com/vace/c3.js */'



var template = code => `
${banner}
(function moduledefine(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["${lib}"] = factory();
	else
		root["${lib}"] = factory();
})(this,function(){
${code}
return c3
})
`
var code = fs.readFileSync('dist/c3-unpack.js')

fs.writeFileSync('dist/c3.js',template(code))

console.log('success output~')