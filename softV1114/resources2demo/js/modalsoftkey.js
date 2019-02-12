function modalSoftKey(cssClass){
    var offsettop;
    var ScrTop;
    $("input[type=text]").each(function(i,e){
        e.readOnly = true;
     });
    
    $("#modal").load("../disp/modal.html");
    
    $("input[type=text]").focus(function(key) {
    	
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
        
        //　選択したフィールド
        // html inputのidはxxx数字（2桁または無し）Layout数字（2桁） 一番後ろの2桁はid識別するため
        //　キーボードのレイアウト選択する時は消して利用する。
        var targetSel = key.target.id;
        var inx = targetSel.indexOf("Layout")+6;
        targetSel = targetSel.substr( 0, inx);

        // キーボードのケースを追加する部分↓↓↓↓↓
        if(targetSel === "kanaAddrLayout"){
        	$("#keypadArea").keypad({
        		target : $(key.target),
        		layout : kanaAddrLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backspaceText : '1文字削除',backspaceStatus:"",
                leftText : '←',leftStatus:"",
                rightText : '→',rightStatus:"",
                zendakutenText : '゛',zendakutenstatus:"",
                zenhandakutenText : '゜',zenhandakutenstatus:"",
                switchkntoleText : '英数小',kntoleStatus:"",
                switchkntoueText : '英数大',kntoueStatus:"",
                switchletoknText : '全角カナ',letoknStatus:"",
                switchletoueText : '英数大',letoueStatus:"",
                switchuetoknText : '全角カナ',uetoknStatus:"",
                switchuetoleText : '英数小',uetoleStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
        	});

            // 選択したレイアウト適用
            changeTarget(key.target);
        }else if(targetSel === "kanaNameLayout"){
        	$("#keypadArea").keypad({
        		target : $(key.target),
        		layout : kanaNameLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backspaceText : '1文字削除',backspaceStatus:"",
                leftText : '←',leftStatus:"",
                rightText : '→',rightStatus:"",
                zendakutenText : 'ﾞ',zendakutenstatus:"",
                zenhandakutenText : 'ﾟ',zenhandakutenstatus:"",
                switchkntoleText : '英数小',kntoleStatus:"",
                switchkntoueText : '英数大',kntoueStatus:"",
                switchletoknText : '全角カナ',letoknStatus:"",
                switchletoueText : '英数大',letoueStatus:"",
                switchuetoknText : '全角カナ',uetoknStatus:"",
                switchuetoleText : '英数小',uetoleStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
        	});
            // 選択したレイアウト適用
            changeTarget(key.target);
        }else if(targetSel === "kingakuLayout"){
        	$("#keypadArea").keypad({
        		target : $(key.target),
        		layout : kingakuLayout,
                keypadClass: cssClass,
                clearmoneyText : "訂正",clearmoneyStatus:"",
                manText : "万",manStatus:"",
                senText : "千",senStatus:"",
                enText : "円",enStatus:"",
                zeroText : "0",zeroStatus:"",
                zero3Text : "000",zero3Status:"",
                cnfmText : "確定",cnfmStatus:"",
                onKeypress : amountKeypad_OnKeypress,
                keypadOnly : false
        	});
            // キーの非活性・活性制御
            keyCtr();

        }else if(layoutName === "lowerEngLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : lowerEngLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backspaceText : '1文字削除',backspaceStatus:"",
                leftText : '←',leftStatus:"",
                rightText : '→',rightStatus:"",
                switchkntoleText : '英数小',kntoleStatus:"",
                switchkntoueText : '英数大',kntoueStatus:"",
                switchletoknText : '全角カナ',letoknStatus:"",
                switchletoueText : '英数大',letoueStatus:"",
                switchuetoknText : '全角カナ',uetoknStatus:"",
                switchuetoleText : '英数小',uetoleStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
            });

        }else if(layoutName === "upperEngLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : upperEngLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backspaceText : '1文字削除',backspaceStatus:"",
                leftText : '←',leftStatus:"",
                rightText : '→',rightStatus:"",
                switchkntoleText : '英数小',kntoleStatus:"",
                switchkntoueText : '英数大',kntoueStatus:"",
                switchletoknText : '全角カナ',letoknStatus:"",
                switchletoueText : '英数大',letoueStatus:"",
                switchuetoknText : '全角カナ',uetoknStatus:"",
                switchuetoleText : '英数小',uetoleStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
            });

        }else if(layoutName === "romajiNameLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : romajiNameLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backspaceText : '1文字削除',backspaceStatus:"",
                // 必要かどうかレイアウト見て判断↓↓↓
                leftText : '←',leftStatus:"",
                rightText : '→',rightStatus:"",
                switchkntoleText : '英数小',kntoleStatus:"",
                switchkntoueText : '英数大',kntoueStatus:"",
                switchletoknText : '全角カナ',letoknStatus:"",
                switchletoueText : '英数大',letoueStatus:"",
                switchuetoknText : '全角カナ',uetoknStatus:"",
                switchuetoleText : '英数小',uetoleStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
            });

        }else if(layoutName === "postNoLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : postNoLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backspaceText : '1文字削除',backspaceStatus:"",
                // 必要かどうかレイアウト見て判断↓↓↓
                leftText : '←',leftStatus:"",
                rightText : '→',rightStatus:"",
                switchkntoleText : '英数小',kntoleStatus:"",
                switchkntoueText : '英数大',kntoueStatus:"",
                switchletoknText : '全角カナ',letoknStatus:"",
                switchletoueText : '英数大',letoueStatus:"",
                switchuetoknText : '全角カナ',uetoknStatus:"",
                switchuetoleText : '英数小',uetoleStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
            });

        }else if(layoutName === "telLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : telLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backspaceText : '1文字削除',backspaceStatus:"",
                // 必要かどうかレイアウト見て判断↓↓↓
                leftText : '←',leftStatus:"",
                rightText : '→',rightStatus:"",
                switchkntoleText : '英数小',kntoleStatus:"",
                switchkntoueText : '英数大',kntoueStatus:"",
                switchletoknText : '全角カナ',letoknStatus:"",
                switchletoueText : '英数大',letoueStatus:"",
                switchuetoknText : '全角カナ',uetoknStatus:"",
                switchuetoleText : '英数小',uetoleStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
            });

        }else if(layoutName === "branchLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : branchLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backText: '1文字削除',
                onKeypress : onKeypressFocus,
                keypadOnly : false
            });

        }else if(layoutName === "branchKanaLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : branchKanaLayout,
                keypadClass: cssClass ,
                clearText : '訂正',// 後で修正必要可能性ある  他の全削除と重複
                onKeypress : "",
                keypadOnly : false
            });

        }else if(layoutName === "kanjiLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : kanjiLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backspaceText : '1文字削除',backspaceStatus:"",
                leftText : '←',leftStatus:"",
                rightText : '→',rightStatus:"",
                zendakutenText : 'ﾞ',zendakutenstatus:"",
                zenhandakutenText : 'ﾟ',zenhandakutenstatus:"",
                convertText : '変換',convertStatus:"",
                confirmText : '確定',confirmStatus:"",
                previousText : '前候補',previousStatus:"",
                followingText : '後候補',followingStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
            });

        }else if(layoutName === "passwdNoLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : passwdNoLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                onKeypress : "",
                keypadOnly : false
            });

        }else if(layoutName === "passwdNoRandomLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : passwdNoRandomLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                shuffleText : '並び替え',shuffleStatus:"",
                onKeypress : "",
                keypadOnly : false
            });

        }
        $('input[type=text]').attr('readonly',false);
            
        dakutenKeyControl();
    });
    
    
    $('input[type=text]').blur(function(){
    	$('input[type=text]').attr('readonly',true);
    });

    // X(閉じるボタン)押下時モーダル閉じる
    $(document).on("click touchstart","#modalclose",function(){
        if ($("#modal").css("display") != "none") {
            $('#modal').fadeOut({queue : false,duration : 500});
            $('#modal').animate({top : offsettop + 600}, 500);
            $('html, body').animate({scrollTop : ScrTop}, 500);
            $("#dummyT").empty();
        }
    });

    // enter押下時モーダル閉じる
    $("input[type=text]").keydown(function(key) {
        if (key.keyCode == 13 && ($("#modal").css("display") != "none")) {
                $('#modal').fadeOut({queue : false,duration : 500});
                $('#modal').animate({top : offsettop + 600}, 500);
                $('html, body').animate({scrollTop : ScrTop}, 500);
                $("#dummyT").empty();
        }
    });
    
    // 物理キーボードの繋がりによるreadOnly(true/false)
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
}
