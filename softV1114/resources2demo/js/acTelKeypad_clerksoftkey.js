$(document).ready(function() {
    var offsettop;
    var ScrTop;
    
//    $("#acTelKeypad_clerk").load("acTelKeypad_clerk.html");
    
    $("input[type=text]").mouseup(function(key) {

        offsettop = $(key.target).offset().top;

        $('html, body').animate({scrollTop : offsettop}, 400);

        if ($("#acTelKeypad_clerk").css("display") == "none") {
            $('#acTelKeypad_clerk').css("top", offsettop + 1000);
            $('#acTelKeypad_clerk').fadeIn({queue : false,duration : 500});
            $('#acTelKeypad_clerk').animate({top : offsettop + 50}, 500);

            var acTelKeypad_clerkHeight = $("#acTelKeypad_clerk").height();
            ScrTop = $(document).scrollTop();            
            var dummyT = $("<table></table>").css("border","0").css("height",acTelKeypad_clerkHeight);
            $("#dummyT").append(dummyT);
        }
        
        $("#nameKeypad1").keypad({
            target : $(key.target),
            clearText : '全削除',
            backText : '1文字削除',
            spacebarText : 'ｽﾍﾟｰｽ',
            switchText : '英数字選択',
            layout : kanaLayout02,
            switchLayout : qwertyLayout02,
            onKeypress : keypad_OnKeypress,
            keypadOnly : false
        });
    });

    $(document).on("click touchstart","#acTelKeypad_clerkclose",function(){
        if ($("#acTelKeypad_clerk").css("display") != "none") {
            $('#acTelKeypad_clerk').fadeOut({queue : false,duration : 500});
            $('#acTelKeypad_clerk').animate({top : offsettop + 600}, 500);

            $('html, body').animate({scrollTop : ScrTop}, 500);
            $("#dummyT").empty();
        }
    });

    $("input").keydown(function(key) {
        if (key.keyCode == 13 && ($("#acTelKeypad_clerk").css("display") != "none")) {
                $('#acTelKeypad_clerk').fadeOut({queue : false,duration : 500});
                $('#acTelKeypad_clerk').animate({top : offsettop + 600}, 500);

                $('html, body').animate({scrollTop : ScrTop}, 500);
                $("#dummyT").empty();
        }
    });

    $("input[type=text]").mouseup(function(key) {
        $("#nameKeypad1").keypad("option", {layout: kanaLayout02, target:$(key.target)});
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
  $("#nameKeypad1").keypad("option", "target").focus();
}