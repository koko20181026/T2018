$(document).ready(function() {
    var offsettop;
    var ScrTop;
    
    $("#modal").load("modal.html");
    
    $(document).on("click touchstart","input[type=text]",function(key){
//     $("input[type=text]").mouseup(function(key) {
        setTimeout(function(){
            $('input[type=text]').attr('readonly',false);
        },20);
        
        offsettop = $(key.target).offset().top;

        $('html, body').animate({scrollTop : offsettop}, 400);

        if ($("#modal").css("display") == "none") {
            $('#modal').css("top", offsettop + 1000);
            $('#modal').fadeIn({queue : false,duration : 500});
            $('#modal').animate({top : offsettop + 50}, 500);

            var modalHeight = $("#modal").height();
            ScrTop = $(document).scrollTop();            
            var dummyT = $("<table></table>").css("border","0").css("height",modalHeight);
            $("#dummyT").append(dummyT);
        }
        
        $("#nameKeypad").keypad({
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
    
    $('input[type=text]').blur(function(){
        alert("1");
    	$('input[type=text]').attr('readonly',true);
    });

    $(document).on("click touchstart","#modalclose",function(){
        if ($("#modal").css("display") != "none") {
            $('#modal').fadeOut({queue : false,duration : 500});
            $('#modal').animate({top : offsettop + 600}, 500);

            $('html, body').animate({scrollTop : ScrTop}, 500);
            $("#dummyT").empty();
        }
    });

    $("input[type=text]").keydown(function(key) {
        if (key.keyCode == 13 && ($("#modal").css("display") != "none")) {
                $('#modal').fadeOut({queue : false,duration : 500});
                $('#modal').animate({top : offsettop + 600}, 500);

                $('html, body').animate({scrollTop : ScrTop}, 500);
                $("#dummyT").empty();
        }
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
