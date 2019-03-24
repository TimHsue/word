var pinyin = require("pinyin");

var target = "男";

var Tinitial = pinyin(target, {
	style: pinyin.STYLE_INITIALS
})[0][0];

var py = pinyin(target, {
	style: pinyin.STYLE_NORMAL
})[0][0];

var Tfinal = py.replace(Tinitial, "");

var tone = pinyin(target, {
	style: pinyin.STYLE_TONE2
})[0][0].replace(py, "")

console.log(Tinitial, Tfinal, tone);