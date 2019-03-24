function sleep (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

function readCh(tarA, tarB) {
	let isPlaying = parseInt(document.getElementById("isPlaying").innerText);
	if (isPlaying) return;
	if (!isPlaying) {
		document.getElementById("isPlaying").innerText = "1";
		playAudio(tarA);
		sleep(250).then(() => {
			playAudio(tarB);
			sleep(1000).then(() => {
				document.getElementById("isPlaying").innerText = "0";
			})
		})

	}
}

function playAudio(tar) {
	var audio = new Audio("audio/" + tar + ".mp3");
	audio.play();
}