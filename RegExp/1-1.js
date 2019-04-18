//横向模糊匹配
//正则匹配的字符串的长度不是固定的，可以是多种情况的
//实现方式，使用量词如{m,n}
var regex = /ab{2,5}c/g //g表示global，表示全局匹配，找到满足匹配模式的所有的字符串，强调“所有”，而不是“第一个”
var str = "abc abbc abbbc abbbbc abbbbbc abbbbbbc"
console.log(str.match(regex))
// ['abbc','abbbc','abbbbc','abbbbbc']

//纵向模糊匹配
//具体到某一位字符时，可以不是某个确定的字符
//实现方式是字符数组，如[abc]
var regex = /a[123]b/g
var str = 'a0b a1b a2b a3b a4b'
console.log(str.match(regex))
//['a1b','a2b','a3b']

// 字符组
//范围表示 [a-z] [1-6a-fG-M]
//但是假如真的是想匹配a,-,z这三个字符，需要写成[a\-z] [-az] [az-]

//模糊