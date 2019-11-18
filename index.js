var timers = [];//弹幕定时数组
var start = true;//弹幕是否开启

$("#send").on("click", function () {
    var text = $("#text").val();
    var screen = newbullet($("#text").val()); //创建弹幕
    addInterval(screen); //添加定时
    $("#text").val(""); //清空发送区
});

$("#clear").on("click", function () {
    for (var i = 0; i < timers.length; i++) {
        clearInterval(timers[i]);
    };
    $(".bullet").remove();
});

function newbullet(text) {
    var screen = $("<div class='bullet'>" + text + "</div>"); //显示弹幕div
    //获取随机颜色
    var color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random()) + ")";
    var left = $(".screen").width() + "px";
    var top = Math.floor(Math.random() * 400) + "px";
    top = parseInt(top) > 360 ? "360px" : top; //大于360为360，小于为top
    screen.css({
        "position": "absolute",
        "color": color,
        "font-size": "20px",
        "left": left,
        "top": top
    });
    $(".screen").append(screen);
    return screen;
}

//弹幕定时
function addInterval(screen) {
    var left = screen.offset().left - $(".screen").offset().left;
    var timer = setInterval(function () {
        left--;
        screen.css("left", left + "px");
        if (screen.offset().left + screen.width() < $(".screen").offset().left) {
            screen.remove();
            clearInterval(timer);
        }
    }, 10);
    timers.push(timer);
}