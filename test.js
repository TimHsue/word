var fs = require('fs');
var pinyin = require("pinyin");
/*
var tarA = "w";
var tarB = "o3"

var audioA = document.createDocument("audioA");
audioA.src = "audio/" + tarA;
var audioB = document.createDocument("audioB");
audioB.src = "audio/" + tarB;

audioA.play();
audioB.play();
*/
function rand(top) {
	var tmp = Math.floor(Math.random() * 100000);
	tmp = tmp % top;
	return tmp;
}

function genTone(target) {
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

	return {"normal": py, "initial": Tinitial, "final": Tfinal, "tone": tone};
}

function check(tar) {
	if (!fs.existsSync("./audio/" + tar["initial"] + ".mp3")) {
		return false;
	}
	if (!fs.existsSync("./audio/" + tar["final"] + tar["tone"] + ".mp3")) {
		return false
	}
	return true;
}

function getNext() {
	var data = {};
	var text = fs.readFileSync('./source.in', "utf8");
	do {
		data["problem"] = text[rand(text.length - 1) + 1];
	} while(! check(genTone(data["problem"])));
	data["answer"] = rand(4) + 1;
	for (var i = 1; i <= 4; i++) {
		if (i === data["answer"]) {
			data[i] = genTone(data["problem"]);
		} else {
			var tmp = genTone(text[rand(text.length - 1) + 1]);
			while (! check(tmp)) {
				tmp = genTone(text[rand(text.length - 1) + 1]);
			}
			data[i] = tmp;
		}
	}
	return data;
}

var data = getNext();
console.log(data);