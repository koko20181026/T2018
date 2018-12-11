$(document).ready(function() {
    var offsettop;
    var ScrTop;
    


        
        $("#nameKeypad").keypad({
            target : dummy1,
            clearText : '全削除',
            backText : '1文字削除',
            spacebarText : 'ｽﾍﾟｰｽ',
            switchText : '英数字選択',
            layout : kanaLayout02,
            switchLayout : qwertyLayout02,
            onKeypress : keypad_OnKeypress,
            keypadOnly : false
        });




    $("input[type=text]").mouseup(function(key) {
        $("#nameKeypad").keypad("option", {layout: kanaLayout02, target:$(key.target)});
    });
    
    $(".physickey").mousedown(function(key) {
         $("input[type=text]").each(function(i,e){
            if(e.readOnly == false){
                e.readOnly = true;
                $(".physickey").css("background","green");
            }else{
                e.readOnly = false;
                $(".physickey").css("background","gray");
            }
         });
    });
});

function keypad_OnKeypress() {
  $("#nameKeypad").keypad("option", "target").focus();
}
