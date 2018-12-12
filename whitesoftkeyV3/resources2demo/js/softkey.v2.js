function softKey(layoutName, targetId, cssClass){
	//
	var inputTop;
	var inputLeft;
	var tagPadding;
	
    $("input[type=text]").each(function(i,e){
        e.readOnly = true;
     });
    
    inputTop = $("#"+targetId).offset().top;
    inputLeft = $("#"+targetId).offset().left;
    tagPadding = $("#"+targetId).css("padding-left");
    
    cursorPosition(inputTop, inputLeft, tagPadding);

    // 最初キーボード設定↓↓↓↓↓
    // キーボードのケースを追加する部分↓↓↓↓↓
    if(layoutName === "kanaAddrLayout"){
    	$("#keypadArea").keypad({
    		target : "#"+targetId,
    		layout : kanaAddrLayout,
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
    	
    }else if(layoutName === "kingakuLayout"){
    	$("#keypadArea").keypad({
    		target : "#"+targetId,
            layout : kingakuLayout,
            keypadClass: cssClass,
            clearmoneyText : "訂正",clearmoneyStatus:"",
            onebackclearText : "1文字訂正",
            manText : "万",manStatus:"",
            senText : "千",senStatus:"",
            enText : "円",enStatus:"",
            zeroText : "0",zeroStatus:"",
            zero3Text : "000",zero3Status:"",
            cnfmText : "確定",cnfmStatus:"",
            onKeypress : amountKeypad_OnKeypress,
    		keypadOnly : false
    	});
    	
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
    		onKeypress : keypad_OnKeypress,
    		keypadOnly : false
    	});
    }else if(layoutName === "branchKanaLayout"){
    	$("#keypadArea").keypad({
    		target : "#"+targetId,
    		layout : branchKanaLayout,
    		keypadClass: cssClass ,
    		clearText : '訂正',// 後で修正必要性ある　他の全削除と重複
    		onKeypress : narrowKeyboardClicked,
    		keypadOnly : false
    	});
    }
	
    
    
    
    // キーボードのケースを追加する部分↑↑↑↑↑
    // 最初キーボード設定↑↑↑↑↑
    
    // イベントによるキーボード変更↓↓↓↓↓
    $("input[type=text]").mouseup(function(key) {
    	//　選択したフィールド
        // html inputのidはxxx数字（2桁または無し）Layout数字（2桁） 一番後ろの2桁はid識別するため
        //　キーボードのレイアウト選択する時は消して利用する。
        var targetSelId = key.target.id;
        var inx = targetSelId.indexOf("Layout")+6;
        targetSel = targetSelId.substr( 0, inx);
        
        inputTop = $("#"+targetSelId).offset().top;
        inputLeft = $("#"+targetSelId).offset().left;
        tagPadding = $("#"+targetSelId).css("padding-left");
        
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
	    		switchkntoleText : '英数小',kntoleStatus:"",
	    		switchkntoueText : '英数大',kntoueStatus:"",
	    		onKeypress : moveCursor,
	    		keypadOnly : false
        	});
	    	
	    	// 選択したレイアウト適用
	    	changeKeypad(kanaAddrLayout, $(key.target));
	        cursorPosition(inputTop, inputLeft, tagPadding);
	    	
	    }else if(targetSel === "kingakuLayout"){
	    	$("#keypadArea").keypad({
        		target : $(key.target),
        		layout : kingakuLayout,
                keypadClass: cssClass,
                clearmoneyText : "訂正",clearmoneyStatus:"",
                onebackclearText : "1文字訂正",
                manText : "万",manStatus:"",
                senText : "千",senStatus:"",
                enText : "円",enStatus:"",
                zeroText : "0",zeroStatus:"",
                zero3Text : "000",zero3Status:"",
                cnfmText : "確定",cnfmStatus:"",
                onKeypress : amountKeypad_OnKeypress,
        		keypadOnly : false
	    	});
	    	
	    	// 選択したレイアウト適用
	    	changeKeypad(kingakuLayout, $(key.target));
	        cursorPosition(inputTop, inputLeft, tagPadding);
	    	
	    }else if(targetSel === "lowerEngLayout"){
        	$("#keypadArea").keypad({
        		target : $(key.target),
        		layout : lowerEngLayout,
        		keypadClass: cssClass ,
        		clearText : '全削除',
        		backspaceText : '1文字削除',backspaceStatus:"",
        		leftText : '←',leftStatus:"",
        		rightText : '→',rightStatus:"",
        		switchletoknText : '全角カナ',letoknStatus:"",
        		switchletoueText : '英数大',letoueStatus:"",
        		onKeypress : moveCursor,
        		keypadOnly : false
        	});
        	
        	// 選択したレイアウト適用
        	changeKeypad(lowerEngLayout, $(key.target));
            cursorPosition(inputTop, inputLeft, tagPadding);
        	
	    }else if(targetSel === "upperEngLayout"){
        	$("#keypadArea").keypad({
        		target : $(key.target),
        		layout : upperEngLayout,
        		keypadClass: cssClass ,
        		clearText : '全削除',
        		backspaceText : '1文字削除',backspaceStatus:"",
        		leftText : '←',leftStatus:"",
        		rightText : '→',rightStatus:"",
        		switchuetoknText : '全角カナ',uetoknStatus:"",
        		switchuetoleText : '英数小',uetoleStatus:"",
        		onKeypress : moveCursor,
        		keypadOnly : false
        	});
        	
        	// 選択したレイアウト適用
        	changeKeypad(upperEngLayout, $(key.target));
            cursorPosition(inputTop, inputLeft, tagPadding);
        	
	    }else if(targetSel === "romajiNameLayout"){
        	$("#keypadArea").keypad({
        		target : $(key.target),
        		layout : romajiNameLayout,
        		keypadClass: cssClass ,
        		clearText : '全削除',
        		backspaceText : '1文字削除',backspaceStatus:"",
        		leftText : '←',leftStatus:"",
        		rightText : '→',rightStatus:"",
        		onKeypress : moveCursor,
        		keypadOnly : false
        	});
        	
        	// 選択したレイアウト適用
        	changeKeypad(romajiNameLayout, $(key.target));
            cursorPosition(inputTop, inputLeft, tagPadding);
        	
	    }else if(targetSel === "postNoLayout"){
        	$("#keypadArea").keypad({
        		target : $(key.target),
        		layout : postNoLayout,
        		keypadClass: cssClass ,
        		clearText : '全削除',
        		backspaceText : '1文字削除',backspaceStatus:"",
        		leftText : '←',leftStatus:"",
        		rightText : '→',rightStatus:"",
        		onKeypress : moveCursor,
        		keypadOnly : false
        	});
        	
        	// 選択したレイアウト適用
        	changeKeypad(postNoLayout, $(key.target));
            cursorPosition(inputTop, inputLeft, tagPadding);
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
	    	
	    	// 選択したレイアウト適用
	    	changeKeypad(telLayout, $(key.target));
	    	cursorPosition(inputTop, inputLeft, tagPadding);
	    }else if(layoutName === "branchLayout"){
	    	$("#keypadArea").keypad({
	    		target : "#"+targetId,
	    		layout : branchLayout,
	    		keypadClass: cssClass ,
	    		clearText : '全削除',
	    		backText: '1文字削除',
	    		onKeypress : keypad_OnKeypress,
	    		keypadOnly : false
	    	});
	    	
	    	// 選択したレイアウト適用
	    	changeKeypad(branchLayout, $(key.target));
	    	cursorPosition(inputTop, inputLeft, tagPadding);
	    }else if(layoutName === "branchKanaLayout"){
	    	$("#keypadArea").keypad({
	    		target : "#"+targetId,
	    		layout : branchKanaLayout,
	    		keypadClass: cssClass ,
	    		clearText : '訂正',// 後で修正必要性ある　他の全削除と重複
	    		onKeypress : narrowKeyboardClicked,
	    		keypadOnly : false
	    	});
	    	// 選択したレイアウト適用
	    	changeKeypad(branchKanaLayout, $(key.target));
	    	cursorPosition(inputTop, inputLeft, tagPadding);
	    	
	    }
	    
	    // キーボードのケースを追加する部分↑↑↑↑↑
	 　　　// イベントによるキーボード変更↑↑↑↑↑
    });
    
    $("input[type=text]").focus(function(key){
        $("#keypadArea").keypad("option", "target", $(key.target));
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