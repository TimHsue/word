function showStatistic() {
    var rightCount = parseInt(document.getElementById("rightCount").innerText);
    var problemCount = parseInt(document.getElementById("problemCount").innerText);
    var wrongCount = parseInt(document.getElementById("wrongCount").innerText);
    var score = rightCount * 100 / 20;
    var green = rightCount * 100 / 20;
    var red = wrongCount * 100 / 20;
    var yellow = (problemCount - 1 - wrongCount - rightCount) * 100 / 20;
    document.getElementById("innderContent").innerHTML = '    <div class="t-title">\
<div class="page-header">\
    <h1>&ensp;统计结果 <small>&ensp;共20题，您已完成'+ (problemCount - 1) + '题，\
    正确'+ rightCount + '题，' + '错误' + wrongCount + '题，分数：' + score + '</small></h1>\
</div>\
</div>\
<br><br>\
<div class="progress t-progress">\
        <div class="progress-bar progress-bar-success" style="width: ' + green + '%">\
        <span class="sr-only">aaa</span></div>\
        <div class="progress-bar progress-bar-warning" style="width: ' + yellow + '%">\
        <span class="sr-only"></span></div>\
        <div class="progress-bar progress-bar-danger" style="width: ' + red + '%">\
        <span class="sr-only"></span></div>\
</div>'
}

function showPinyin() {
    document.getElementById("innderContent").innerHTML = '<div class="t-title">\
<div class="page-header">\
    <h1 id="problemTittle">&ensp;选择正确读音 <small>&ensp;悬停播放音频，单击提交答案</small></h1>\
</div>\
</div>\
\
<div class="t-content">\
    <div class="jumbotron">\
        <div id="problem" class="t-problem">\
            &ensp;\
        </div>\
        <br><br>\
        <div id="answerAB" class="t-answer">\
            <p>\
                <button id = "answerA" type="button" class="btn btn-lg t-button" onmouseover=""\
                        onclick="checkAnswer(1)">\
                    A\
                </button>\
                &ensp;&ensp;&ensp;&ensp;\
                <button id = "answerB" type="button" class="btn btn-lg t-button" onmouseover=""\
                        onclick="checkAnswer(2)">\
                    B\
                </button>\
            </p>\
        </div>\
        <div id="answerCD" class="t-answer">\
            <p>\
                <button id = "answerC" type="button" class="btn btn-lg t-button" onmouseover=""\
                        onclick="checkAnswer(3)">\
                    C\
                </button>\
                &ensp;&ensp;&ensp;&ensp;\
                <button id = "answerD" type="button" class="btn btn-lg t-button" onmouseover=""\
                        onclick="checkAnswer(4)">\
                    D\
                </button>\
            </p>\
        </div>\
    </div>\
    <br>\
    <div id = "nextProblem" class="t-answer">\
        <button id="nextProblemB" type="button" class="btn btn-lg btn-default t-next" onclick="refreshProblem()">\
            下一题\
        </button>\
    </div>\
</div>';
    document.getElementById("problemCount").innerText = 0;
    document.getElementById("rightCount").innerText = 0;
    document.getElementById("wrongCount").innerText = 0;
    refreshProblem();
}

function showAbout() {
    document.getElementById("innderContent").innerHTML = '<div class="t-title">\
<div class="page-header">\
    <h1>&ensp;天天的一个小作业 <small>&ensp;js真有趣（并不</small></h1>\
</div>\
<div class="t-about"> 主要是用来练习js和nodejs的，后续可能会更新更多内容=w=<br>Email:TimHsue@gmail.com</div>\
'
}

function showWord() {
    document.getElementById("innderContent").innerHTML = '<div class="t-title">\
<div class="page-header">\
    <h1>&ensp;啊哦<small>&ensp;这里还没有开放qwq</small></h1>\
</div>\
<div class="t-about"> 天天正在加油写了ovo </div>\
'
}

function switchToCh() {
    document.getElementById("pinyin").innerHTML = 
        '<a href="javascript:void(0);" onclick="show(\'pinyin\')">汉语拼音</a>';
    document.getElementById("word").innerHTML = 
        '<a href="javascript:void(0);" onclick="show(\'word\')">英语单词</a>';
    document.getElementById("statistic").innerHTML = 
        '<a href="javascript:void(0);" onclick="show(\'statistic\')">统计</a>';
    document.getElementById("about").innerHTML = 
        '<a href="javascript:void(0);" onclick="show(\'about\')">关于</a>';
    document.getElementById("option").innerHTML = '选项 <span class="caret"></span>';
    document.getElementById("record").innerText = "记录选项";
    document.getElementById("opencookie").innerText = "打开Cookie记录";
    var problemTittle = document.getElementById("problemTittle");
    if (problemTittle != null) {
        problemTittle.innerHTML = "&ensp;选择正确读音 <small>&ensp;悬停播放音频，单击提交答案</small>"
    }
    var nextProblemB = document.getElementById("nextProblemB");
    if (nextProblemB != null) {
        nextProblemB.innerText = "下一题";
    }
}

function switchToEn() {
    document.getElementById("pinyin").innerHTML = 
        '<a href="javascript:void(0);" onclick="show(\'pinyin\')">PinYin</a>';
    document.getElementById("word").innerHTML = 
        '<a href="javascript:void(0);" onclick="show(\'word\')">Word</a>';
    document.getElementById("statistic").innerHTML = 
        '<a href="javascript:void(0);" onclick="show(\'statistic\')">Statistic</a>';
    document.getElementById("about").innerHTML = 
        '<a href="javascript:void(0);" onclick="show(\'about\')">About</a>';
    document.getElementById("option").innerHTML = 'Option <span class="caret"></span>';
    document.getElementById("record").innerText = "Record";
    document.getElementById("opencookie").innerText = "Record Cookie";
    var problemTittle = document.getElementById("problemTittle");
    if (problemTittle != null) {
        problemTittle.innerHTML = "&ensp;Choose The Correct Pronunciation\
            <small>&ensp;Hover to pronounce, click to submit</small>"
    }
    var nextProblemB = document.getElementById("nextProblemB");
    if (nextProblemB != null) {
        nextProblemB.innerText = "Next";
    }
}


function show(tar) {
    var list = {1: "pinyin", 2: "word", 3: "statistic", 4: "about"};
    for (var i = 1; i <= 4; i++) {
        var tmp = document.getElementById(list[i]);
        if (list[i] === tar) {
            tmp.setAttribute("class", "active");
            continue;
        }
        if (tmp.getAttribute("class") != null) {
            tmp.removeAttribute("class");
        }
    }
    if (tar === list[3]) showStatistic();
    if (tar === list[1]) showPinyin();
    if (tar === list[2]) showWord();
    if (tar === list[4]) showAbout();
}