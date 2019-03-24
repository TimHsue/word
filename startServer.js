var http = require('http');
var fs = require('fs');
var pinyin = require("pinyin");
var documentRoot = '.';

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

	var origin = pinyin(target)[0][0];

	var Tfinal = py.replace(Tinitial, "");

	var tone = pinyin(target, {
		style: pinyin.STYLE_TONE2
	})[0][0].replace(py, "")

	return {"normal": origin, "initial": Tinitial, "final": Tfinal, "tone": tone};
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
	data[data["answer"]] = genTone(data["problem"]);
	for (var i = 1; i <= 4; i++) {
		if (i === data["answer"]) {
			continue;
		} else {
			var tmp = genTone(text[rand(text.length - 1) + 1]);
			while (true) {
				tmp = genTone(text[rand(text.length - 1) + 1]);
				var checked = check(tmp);
				if (tmp["normal"] === data[data["answer"]]["normal"]) checked = false;
				for (var j = 1; j < i; j++) {
					if (tmp["normal"] === data[j]["normal"]) checked = false;
				}
				if (checked) break;
			}
			data[i] = tmp;
		}
	}
	return data;
}


http.createServer(function(req, res){
	var url = req.url;
	console.log('new link to' + url);

	if (url.startsWith("/?")) {
		var content = url.replace("/?", "");
		if (content === "nextProblem") {
			res.writeHead(200, {
				'content-type' : 'text/html;charset="utf-8"'
			});
			var data = getNext();
			console.log(data)
			res.write(JSON.stringify(data));
			res.end();
		} else {
			res.writeHeader(404, {
				'content-type' : 'text/html;charset="utf-8"'
			});
			res.write("404 Notfound!");
			res.end();
		}
	} else if (url === "/") {
		var file = documentRoot + "/index.html";
		fs.readFile(file, function(err, data){
			if (err) {
				res.writeHeader(404, {
					'content-type' : 'text/html;charset="utf-8"'
				});
				res.write("404 Notfound!");
				res.end();
			} else {
				res.writeHead(200, {
					'content-type' : 'text/html;charset="utf-8"'
				});
				res.write(data);
				res.end();
			}
		})
	} else {
		var file = documentRoot + url;
		var type = file.substr(file.lastIndexOf(".")+1,file.length)
		fs.readFile(file, function(err, data){
			if (err) {
				res.writeHeader(404, {
					'content-type' : 'text/html;charset="utf-8"'
				});
				res.write("404 Notfound!");
				res.end();
			} else {
				res.writeHead(200, {
					'content-type' : 'text/' + type + ';charset="utf-8"'
				});
				res.write(data);
				res.end();
			}
		})
	}
}).listen(8888);
