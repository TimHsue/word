function refreshProblem() {
	var problemCount = parseInt(document.getElementById("problemCount").innerText);
	document.getElementById("unhandledRefresh").innerText = 0;
	console.log(problemCount);
	if(problemCount > 20) {
		show('statistic');
	} else {
		problemCount += 1;
		document.getElementById("problemCount").innerText = problemCount;
		document.getElementById("answered").innerText = "0";
		var xhr;
		if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject("Microsoft", "XMLHTTP");
		}
		xhr.open("GET", "?nextProblem", true);
		xhr.send(null);
		xhr.onreadystatechange = function () {
			// console.log(xhr.responseText);
			var data = JSON.parse(xhr.responseText);
			// console.log(data);
			var toChoice = {1: "A", 2: "B", 3: "C", 4: "D"};
			document.getElementById("problem").innerText = data["problem"];
			document.getElementById("answer").innerText = data["answer"];
			for (var i = 1; i <= 4; i++) {
				var target = document.getElementById("answer" + toChoice[i])
				target.innerText = toChoice[i] + "." + data[i]["normal"];
				console.log(target.getAttribute("class"));
				target.setAttribute("class", "btn btn-lg t-button");
				target.setAttribute("onmouseover",
					"readCh('" + data[i]["initial"] + "', '" + data[i]["final"] + data[i]["tone"] + "')");
			}
			/*

			document.getElementById("answerA").innerText = "A." + data["1"]["normal"];
			document.getElementById("answerA").setAttribute("class", "btn btn-lg t-button");
			document.getElementById("answerA").setAttribute("onmouseover",
				"readCh('" + data["1"]["initial"] + "', '" + data["1"]["final"] + data["1"]["tone"] + "')");
			document.getElementById("answerB").innerText = "B." + data["2"]["normal"];
			document.getElementById("answerB").setAttribute("class", "btn btn-lg t-button");
			document.getElementById("answerB").setAttribute("onmouseover",
				"readCh('" + data["2"]["initial"] + "', '" + data["2"]["final"] + data["2"]["tone"] + "')");
			document.getElementById("answerC").innerText = "C." + data["3"]["normal"];
			document.getElementById("answerC").setAttribute("class", "btn btn-lg t-button");
			document.getElementById("answerC").setAttribute("onmouseover",
				"readCh('" + data["3"]["initial"] + "', '" + data["3"]["final"] + data["3"]["tone"] + "')");
			document.getElementById("answerD").innerText = "D." + data["4"]["normal"];
			document.getElementById("answerD").setAttribute("class", "btn btn-lg t-button");
			document.getElementById("answerD").setAttribute("onmouseover",
				"readCh('" + data["4"]["initial"] + "', '" + data["4"]["final"] + data["4"]["tone"] + "')");
			*/
		}
	}
}

function checkAnswer(choice) {
	var answer = parseInt(document.getElementById("answer").innerText);
	var answered = document.getElementById("answered").innerText;
	if (answered == "1") return;
	var toChoice = {1: "A", 2: "B", 3: "C", 4: "D"};
	document.getElementById("answered").innerText = "1";
	if (answer === choice) {
		var rightCount = parseInt(document.getElementById("rightCount").innerText);
		rightCount += 1;
		document.getElementById("rightCount").innerText = rightCount;
		document.getElementById("answer" + toChoice[choice]).setAttribute("class", "btn btn-lg btn-right");
	} else {
		var wrongCount = parseInt(document.getElementById("wrongCount").innerText);
		wrongCount += 1;
		document.getElementById("wrongCount").innerText = wrongCount;
		document.getElementById("answer" + toChoice[answer]).setAttribute("class", "btn btn-lg btn-right");
		document.getElementById("answer" + toChoice[choice]).setAttribute("class", "btn btn-lg btn-error");
	}
	var readAnswer = document.getElementById("answer" + toChoice[answer]).getAttribute("onmouseover");
	for (var i = 1; i <= 4; i++) {
		document.getElementById("answer" + toChoice[i]).setAttribute("onmouseover", "");
		// console.log(document.getElementById("answer" + toChoice[i])..getAttribute("active"));
		// document.getElementById("answer" + toChoice[i]).setAttribute("checked", false);
	}
	document.getElementById("unhandledRefresh").innerText = 1;

	sleep(1500).then(() => {
		var unhandled = parseInt(document.getElementById("unhandledRefresh").innerText);
		if (unhandled === 1) eval(readAnswer);
	})

	sleep(3000).then(() => {
		document.getElementById("answered").innerText = "0";
		var unhandled = parseInt(document.getElementById("unhandledRefresh").innerText);
		if (unhandled === 1) refreshProblem();
	})
}