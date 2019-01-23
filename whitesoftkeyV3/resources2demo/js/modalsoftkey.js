$(document).ready(function() {
    
    var agt = navigator.userAgent;
    alert(agt);
//     if (agt.indexOf("chrome") != -1) return 'Chrome'; 
//     if (agt.indexOf("opera") != -1) return 'Opera'; 
//     if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
//     if (agt.indexOf("webtv") != -1) return 'WebTV'; 
//     if (agt.indexOf("beonex") != -1) return 'Beonex'; 
//     if (agt.indexOf("chimera") != -1) return 'Chimera'; 
//     if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
//     if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
//     if (agt.indexOf("firefox") != -1) return 'Firefox'; 
//     if (agt.indexOf("safari") != -1) return 'Safari'; 
//     if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
//     if (agt.indexOf("netscape") != -1) return 'Netscape'; 
//     if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
    
    
    
    var offsettop;
    var ScrTop;
    
    $("#modal").load("modal.html");
    
   $("input[type=text]").focus(function(key){
//      $(document).on("click touchstart","input[type=text]",function(key){
//     $("input[type=text]").mouseup(function(key) {
       $(this).css("background-color","red");
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
        
         $("#nameKeypad").keypad("option", {layout: kanaLayout02, target:$(key.target)});
        
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
       
//            $('input[type=text]').attr('readonly',true);
           $('input[type=text]').attr('readonly',false);
       
       
    });
    
    $('input[type=text]').blur(function(){
    	$('input[type=text]').attr('readonly',true);
        $(this).css("background-color","white");
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

// 20190123
	 $("input[type=text]").click(function(key){
		 cursorIndex = key.target.selectionStart;
		$("#"+ key.target.id).get(0).setSelectionRange(cursorIndex, cursorIndex);
	 });

function keypad_OnKeypress(key, value, inst) {
    $('input[type=text]').attr('readonly',true);
    inst._input.focus();
    $('input[type=text]').attr('readonly',false);
//   $("#nameKeypad").keypad("option", "target").focus();
}
