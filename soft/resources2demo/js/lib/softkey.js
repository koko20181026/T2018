function softKey(layoutName, targetId, cssClass){
	
    $("input[type=text]").each(function(i,e){
        e.readOnly = true;
     });

    // 最初キーボード設定↓↓↓↓↓
    // キーボードのケースを追加する部分↓↓↓↓↓  kanaNameLayout
    if(layoutName === "kanaAddrLayout"){
        $("#keypadArea").keypad({
            target : "#"+targetId,
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
        
    }else if(layoutName === "kanaNameLayout"){
        $("#keypadArea").keypad({
            target : "#"+targetId,
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
        
    }else if(layoutName === "kingakuLayout"){
        $("#keypadArea").keypad({
            target : "#"+targetId,
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
            target : "#"+targetId,
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
            target : "#"+targetId,
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
            target : "#"+targetId,
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
            target : "#"+targetId,
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
            target : "#"+targetId,
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
            target : "#"+targetId,
            layout : branchLayout,
            keypadClass: cssClass ,
            clearText : '全削除',
            backText: '1文字削除',
            onKeypress : onKeypressFocus,
            keypadOnly : false
        });
        
    }else if(layoutName === "branchKanaLayout"){
        $("#keypadArea").keypad({
            target : "#"+targetId,
            layout : branchKanaLayout,
            keypadClass: cssClass ,
            clearText : '訂正',// 後で修正必要可能性ある  他の全削除と重複
            onKeypress : "",
            keypadOnly : false
        });
        
    }else if(layoutName === "kanjiLayout"){
        $("#keypadArea").keypad({
            target : "#"+targetId,
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
            target : "#"+targetId,
            layout : passwdNoLayout,
            keypadClass: cssClass ,
            clearText : '全削除',
            onKeypress : "",
            keypadOnly : false
        });
        
    }else if(layoutName === "passwdNoRandomLayout"){
        $("#keypadArea").keypad({
            target : "#"+targetId,
            layout : passwdNoRandomLayout,
            keypadClass: cssClass ,
            clearText : '全削除',
            shuffleText : '並び替え',shuffleStatus:"",
            onKeypress : "",
            keypadOnly : false
        });
        
    }
    
    setOldTargetId(targetId);
    $("#"+targetId).focus();
    setTimeout(function(){
        $('input[type=text]').attr('readonly',false);
    },20);
    
    dakutenKeyControl();
    
    // キーボードのケースを追加する部分↑↑↑↑↑
    // 最初キーボード設定↑↑↑↑↑

    // イベントによるキーボードＴａｒｇｅｔ変更↓↓↓↓↓
//    $("input[type=text]").mouseup(function(key) {
      $("input[type=text]").focus(function(key){
        //  選択したフィールド
        // html inputのidはxxx数字（2桁または無し）Layout数字（2桁） 一番後ろの2桁はid識別するため
        //  キーボードのレイアウト選択する時は消して利用する。
        var targetSelId = key.target.id;
        var inx = targetSelId.indexOf("Layout")+6;
        targetSel = targetSelId.substr( 0, inx);
        
        inputTop = $("#"+targetSelId).offset().top;
        inputLeft = $("#"+targetSelId).offset().left;
        tagPadding = $("#"+targetSelId).css("padding-left");
        
        // キーボードのケースを追加する部分↓↓↓↓↓
        if(targetSel === "kanaAddrLayout"){
            // 選択したレイアウト適用
            changeTarget(key.target);
            

        }else if(targetSel === "kanaNameLayout"){
            // 選択したレイアウト適用
            changeTarget(key.target);
            

        }else if(targetSel === "kingakuLayout"){
            // 入力した後入力フィールドクリックすると変になるのを防ぐ。
            return;
            
        }else if(targetSel === "lowerEngLayout"){
            // 選択したレイアウト適用
            changeTarget(key.target);

        }else if(targetSel === "upperEngLayout"){
            // 選択したレイアウト適用
            changeTarget(key.target);

        }else if(targetSel === "romajiNameLayout"){
            // 選択したレイアウト適用
            changeTarget(key.target);

        }else if(targetSel === "postNoLayout"){
            // 選択したレイアウト適用
            changeTarget(key.target);

        }else if(layoutName === "telLayout"){
            // 選択したレイアウト適用
            changeTarget(key.target);

        }else if(layoutName === "branchLayout"){
            // 選択したレイアウト適用
            changeTarget(key.target);

        }else if(layoutName === "branchKanaLayout"){
            // 選択したレイアウト適用
            changeTarget(key.target);

            
        }else if(layoutName === "kanjiLayout"){
            // 選択したレイアウト適用
            changeTarget(key.target);
        }
        
        setTimeout(function(){
            $('input[type=text]').attr('readonly',false);
        },20);
        
        
        // キーボードのケースを追加する部分↑↑↑↑↑
           // イベントによるキーボード変更↑↑↑↑↑
    });
    
    // password ↓
    $("input[type=password]").mouseup(function(key) {
        if(layoutName === "passwdNoLayout"){
            // 選択したレイアウト適用
            changeTarget(key.target);

        }else if(layoutName === "passwdNoRandomLayout"){
            
            // 選択したレイアウト適用
            changeTarget(key.target);

        }
    });
    // password ↑
    
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