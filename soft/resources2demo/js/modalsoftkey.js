function modalSoftKey(cssClass){
    var offsettop;
    var ScrTop;
    $("input[type=text]").each(function(i,e){
        e.readOnly = true;
     });
    
    $("#softKeyModal").load("/Web-Ngb/Common/disp/softKeyModal.html");
    
    $("input[type=text]").focus(function(key) {
        setTimeout(function(){
            $('input[type=text]').attr('readonly',false);
        },10);
        
        
        
       ////基本
       /* if ($("#softKeyModal").css("display") == "none") {
        	offsettop = $(key.target).offset().top;
            $('html, body').animate({scrollTop : offsettop}, 400);
        	var windowHeight = $(window).height();
            var modalHeight = 1398*1.3;
            ScrTop = $(document).scrollTop();
            var dummyTr = $('<tr><td> </td></tr>');
            var dummyT = $("<table></table>").css("border","0").css("height",modalHeight);
            dummyT.append(dummyTr);
            $(".keypad-key").removeClass("itemDisabled");
            $(".keypad-special").removeClass("itemDisabled");
            $("#dummyT").append(dummyT);
            $('#dummyT').css('min-height', windowHeight + modalHeight + 'px');

            $('#softKeyModal').css("top", offsettop + 1398);
            $('#softKeyModal').fadeIn({queue : false,duration : 500});
            $('#softKeyModal').animate({top : offsettop + 150}, 500);
        }*/

        ////dummyT = modal_size
        //const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        /*if ($("#softKeyModal").css("display") == "none") {
        	offsettop = $(key.target).offset().top;
        	$('html, body').animate({scrollTop : offsettop}, 500);
            
        	var windowHeight = $(window).height();
            var modalHeight = ($(keypadArea).height());
            ScrTop = $(document).scrollTop();
            
            var dummyTr = $('<tr><td> </td></tr>');
            var dummyT = $("<table></table>").css("border","0").css("height",modalHeight);
            dummyT.append(dummyTr);
            $(".keypad-key").removeClass("itemDisabled");
            $(".keypad-special").removeClass("itemDisabled");

            $("#dummyT").append(dummyT);
            $('#dummyT').css('min-height',modalHeight + 'px');

            //ipad 適用できない！
            $('html, body').animate({scrollTop: offsettop}, 500);
            $('div.contents').animate({scrollTop : offsettop}, 500);
            $('body').scrollTop($(document).height());

            $('#softKeyModal').css("top", offsettop + modalHeight);
            $('#softKeyModal').animate({top : offsettop + 150}, 500);
            $('#softKeyModal').fadeIn({queue : false,duration : 500});
        }*/
        
        ////Body_Scroll
        if ($("#softKeyModal").css("display") == "none") {
            offsettop = $(key.target).offset().top;
            /*$('html').css('overflow','unset');*/
            
            /*var element = document.getElementById("test");
            element.style.overflow = "unset";*/
            
            ////bodyのoverflow=unset;
            document.body.style.overflow = "unset";
            
        	$(".keypad-key").removeClass("itemDisabled");
            $(".keypad-special").removeClass("itemDisabled");

            ////一番外htmlのsize(100%->125%)
            $('html, body',parent.parent.document).animate({ height: 125 +"%" },10);

            ////一番外htmlのscroll(中html_sizeの半分)
            $('html, body', parent.parent.document).animate({ scrollTop: offsettop / 2 },400);
            
/*            var modalHeight = $("#softKeyModal").height();
            ScrTop = $(document).scrollTop();            
            var dummyT = $("<table></table>").css("border","0").css("height",modalHeight);
            $("html, body").append(dummyT);
            $('#dummyT').css('min-height',modalHeight + 'px');*/
            
/*            $('html, body').animate({scrollTop : offsettop}, 400);*/
            
            $('#softKeyModal').css("top", offsettop + 1000);
            $('#softKeyModal').fadeIn({queue : false,duration : 300});
            $('#softKeyModal').animate({top : offsettop + 150}, 300);

        }
        
        //　選択したフィールド
        // html inputのidはxxx数字（2桁または無し）Layout数字（2桁） 一番後ろの2桁はid識別するため
        //　キーボードのレイアウト選択する時は消して利用する。
        var targetSel = key.target.id;
        var inx = targetSel.indexOf("Layout")+6;
        targetSel = targetSel.substr( 0, inx);

        // キーボードのケースを追加する部分↓↓↓↓↓
        if(targetSel === "kanaNameLayout"){
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
                convertText : '変換',convertStatus:"",
                confirmText : '確定',confirmStatus:"",
                previousText : '前候補',previousStatus:"",
                followingText : '後候補',followingStatus:"",
                
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
            changeTarget(key.target, true);
            
        }else if(targetSel === "kingakuLayout"){
        	$("#keypadArea").keypad({
        		target : $(key.target),
        		layout : kingakuLayout,
                keypadClass: cssClass,
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
        	// 選択したレイアウト適用
            changeTarget(key.target, true);
            // キーの非活性・活性制御
            keyCtr();

        }else if(targetSel === "romajiNameLayout"){
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
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }else if(targetSel === "postNoLayout"){
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
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }else if(targetSel === "telLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : telLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backspaceText : '1文字削除',backspaceStatus:"",
                // 必要かどうかレイアウト見て判断↓↓↓
                leftText : '←',leftStatus:"",
                rightText : '→',rightStatus:"",
                rightText : '→',rightStatus:"",
                zendakutenText : 'ﾞ',zendakutenstatus:"",
                zenhandakutenText : 'ﾟ',zenhandakutenstatus:"",
                switchkntoleText : '英数小',kntoleStatus:"",
                switchkntoueText : '英数大',kntoueStatus:"",
                switchletoknText : '全角カナ',letoknStatus:"",
                switchletoueText : '英数大',letoueStatus:"",
                switchuetoknText : '全角カナ',uetoknStatus:"",
                switchuetoleText : '英数小',uetoleStatus:"",
                
/*                //全角英数カナ
                switchzleText : '英数小',zleStatus:"",
                switchzueText : '英数大',zueStatus:"",
                switchzknText : '全角カナ',zknStatus:"",*/
                onKeypress : moveCursor,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }else if(targetSel === "branchLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : branchLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backText: '1文字削除',
                onKeypress : onKeypressFocus,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }else if(targetSel === "branchKanaLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : branchKanaLayout,
                keypadClass: cssClass ,
                clearText : '訂正',// 後で修正必要可能性ある  他の全削除と重複
                onKeypress : "",
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }else if(targetSel === "kanjiLayout"){
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
                
                clearmoneyText : "訂正",clearmoneyStatus:"",
                manText : "万",manStatus:"",
                senText : "千",senStatus:"",
                enText : "円",enStatus:"",
                zeroText : "0",zeroStatus:"",
                zero3Text : "000",zero3Status:"",
                cnfmText : "確定",cnfmStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }else if(targetSel === "passwdNoLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : passwdNoLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                onKeypress : onKeypressPassNoFocus,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }else if(targetSel === "passwdNoRandomLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : passwdNoRandomLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                shuffleText : '並び替え',shuffleStatus:"",
                onKeypress : onKeypressPassNoFocus,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }else if(targetSel === "tsubanNoLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : tsubanNoLayout,
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
                clearmoneyText : "訂正",clearmoneyStatus:"",
                
                manText : "万",manStatus:"",
                senText : "千",senStatus:"",
                enText : "円",enStatus:"",
                zeroText : "0",zeroStatus:"",
                zero3Text : "000",zero3Status:"",
                cnfmText : "確定",cnfmStatus:"",
                onKeypress : onKeypressFocus,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
        }


//====================================    英語カナ & 住所入力    ====================================
        if(targetSel === "kanaEngLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : kanaEngLayout,
                        keypadClass: cssClass ,
                        clearText : '全削除',
                        backspaceText : '1文字削除',backspaceStatus:"",
                        leftText : '←',leftStatus:"",
                        rightText : '→',rightStatus:"",
                        zendakutenText : 'ﾞ',zendakutenstatus:"",
                        zenhandakutenText : 'ﾟ',zenhandakutenstatus:"",
                        switchknText : '全角カナ',knStatus:"",
                        switchueText : '英数大',ueStatus:"",
                        switchleText : '英数小',leStatus:"",
                        
                        /*switchkntoleText : '英数小',kntoleStatus:"",
                        switchkntoueText : '英数大',kntoueStatus:"",
                        switchletoknText : '全角カナ',letoknStatus:"",
                        switchletoueText : '英数大',letoueStatus:"",
                        switchuetoknText : '全角カナ',uetoknStatus:"",
                        switchuetoleText : '英数小',uetoleStatus:"",*/
                        onKeypress : moveCursor,
                        keypadOnly : false
                    });
                 // 選択したレイアウト適用
                    changeTarget(key.target, true);
                    
                }else if(targetSel === "kanaAddrLayout"){
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
                        switchknText : '全角カナ',knStatus:"",
                        switchueText : '英数大',ueStatus:"",
                        switchleText : '英数小',leStatus:"",
                        
                        /*switchkntoleText : '英数小',kntoleStatus:"",
                        switchkntoueText : '英数大',kntoueStatus:"",
                        switchletoknText : '全角カナ',letoknStatus:"",
                        switchletoueText : '英数大',letoueStatus:"",
                        switchuetoknText : '全角カナ',uetoknStatus:"",
                        switchuetoleText : '英数小',uetoleStatus:"",*/
                        onKeypress : moveCursor,
                        keypadOnly : false
                	});
                	// 選択したレイアウト適用
                    changeTarget(key.target, true);
                    
                }else if(targetSel === "upperEngLayout"){
                    $("#keypadArea").keypad({
                        target : $(key.target),
                        layout : upperEngLayout,
                        keypadClass: cssClass ,
                        clearText : '全削除',
                        backspaceText : '1文字削除',backspaceStatus:"",
                        leftText : '←',leftStatus:"",
                        rightText : '→',rightStatus:"",
                        zendakutenText : 'ﾞ',zendakutenstatus:"",
                        zenhandakutenText : 'ﾟ',zenhandakutenstatus:"",
                        switchknText : '全角カナ',knStatus:"",
                        switchueText : '英数大',ueStatus:"",
                        switchleText : '英数小',leStatus:"",
                        
                        /*switchkntoleText : '英数小',kntoleStatus:"",
                        switchkntoueText : '英数大',kntoueStatus:"",
                        switchletoknText : '全角カナ',letoknStatus:"",
                        switchletoueText : '英数大',letoueStatus:"",
                        switchuetoknText : '全角カナ',uetoknStatus:"",
                        switchuetoleText : '英数小',uetoleStatus:"",*/
                        onKeypress : moveCursor,
                        keypadOnly : false
                    });
                 // 選択したレイアウト適用
                    changeTarget(key.target, true);
                    
                }else if(targetSel === "lowerEngLayout"){
                    $("#keypadArea").keypad({
                        target : $(key.target),
                        layout : lowerEngLayout,
                        keypadClass: cssClass ,
                        clearText : '全削除',
                        backspaceText : '1文字削除',backspaceStatus:"",
                        leftText : '←',leftStatus:"",
                        rightText : '→',rightStatus:"",
                        zendakutenText : 'ﾞ',zendakutenstatus:"",
                        zenhandakutenText : 'ﾟ',zenhandakutenstatus:"",
                        switchknText : '全角カナ',knStatus:"",
                        switchueText : '英数大',ueStatus:"",
                        switchleText : '英数小',leStatus:"",
                        
                        /*switchkntoleText : '英数小',kntoleStatus:"",
                        switchkntoueText : '英数大',kntoueStatus:"",
                        switchletoknText : '全角カナ',letoknStatus:"",
                        switchletoueText : '英数大',letoueStatus:"",
                        switchuetoknText : '全角カナ',uetoknStatus:"",
                        switchuetoleText : '英数小',uetoleStatus:"",*/
                        onKeypress : moveCursor,
                        keypadOnly : false
                    });
                 // 選択したレイアウト適用
                    changeTarget(key.target, true);
                    
                }
//=============================================================================================


//=======================    全角英語カナ    ========================================================
        else if(targetSel === "zenkanaEngLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : kanaEngLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backspaceText : '1文字削除',backspaceStatus:"",
                leftText : '←',leftStatus:"",
                rightText : '→',rightStatus:"",
                zendakutenText : 'ﾞ',zendakutenstatus:"",
                zenhandakutenText : 'ﾟ',zenhandakutenstatus:"",
                //全角英数カナ
                switchzknText : '全角カナ',zknStatus:"",
                switchzueText : '英数大',zueStatus:"",
                switchzleText : '英数小',zleStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }else if(targetSel === "zenupperEngLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : zenupperEngLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backspaceText : '1文字削除',backspaceStatus:"",
                leftText : '←',leftStatus:"",
                rightText : '→',rightStatus:"",
                zendakutenText : 'ﾞ',zendakutenstatus:"",
                zenhandakutenText : 'ﾟ',zenhandakutenstatus:"",
                //全角英数カナ
                switchzknText : '全角カナ',zknStatus:"",
                switchzueText : '英数大',zueStatus:"",
                switchzleText : '英数小',zleStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }else if(targetSel === "zenlowerEngLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : zenlowerEngLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backspaceText : '1文字削除',backspaceStatus:"",
                leftText : '←',leftStatus:"",
                rightText : '→',rightStatus:"",
                zendakutenText : 'ﾞ',zendakutenstatus:"",
                zenhandakutenText : 'ﾟ',zenhandakutenstatus:"",
                //全角英数カナ
                switchzknText : '全角カナ',zknStatus:"",
                switchzueText : '英数大',zueStatus:"",
                switchzleText : '英数小',zleStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }
//==============================================================================================
        
        
//=======================    multi Keyboard Layout(全角)    ====================================
        
        else if(targetSel === "multiKanjiLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : multiKanjiLayout,
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
                
                switchmtkjText : '漢字',mtkjStatus:"",
                switchmtknText : '全角カナ',mtknStatus:"",
                switchmtueText : '英数大',mtueStatus:"",
                switchmtleText : '英数小',mtleStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }else if(targetSel === "multikanaLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : multikanaLayout,
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
                
                switchmtkjText : '漢字',mtkjStatus:"",
                switchmtknText : '全角カナ',mtknStatus:"",
                switchmtueText : '英数大',mtueStatus:"",
                switchmtleText : '英数小',mtleStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }else if(targetSel === "multiUpEngLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : multiUpEngLayout,
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
                
                switchmtkjText : '漢字',mtkjStatus:"",
                switchmtknText : '全角カナ',mtknStatus:"",
                switchmtueText : '英数大',mtueStatus:"",
                switchmtleText : '英数小',mtleStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }else if(targetSel === "multiLowEngLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : multiLowEngLayout,
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
                
                switchmtkjText : '漢字',mtkjStatus:"",
                switchmtknText : '全角カナ',mtknStatus:"",
                switchmtueText : '英数大',mtueStatus:"",
                switchmtleText : '英数小',mtleStatus:"",
                onKeypress : moveCursor,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
            
        }
        
//==============================================================================================
        
        
//===============================    modal用      =================================================
        else if(targetSel === "modaltsubanNoLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : modaltsubanNoLayout,
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
                clearmoneyText : "訂正",clearmoneyStatus:"",
                
                manText : "万",manStatus:"",
                senText : "千",senStatus:"",
                enText : "円",enStatus:"",
                zeroText : "0",zeroStatus:"",
                zero3Text : "000",zero3Status:"",
                cnfmText : "確定",cnfmStatus:"",
                onKeypress : onKeypressFocus,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
        }else if(targetSel === "modalkingakuLayout"){
        	$("#keypadArea").keypad({
        		target : $(key.target),
        		layout : modalkingakuLayout,
                keypadClass: cssClass,
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
        	// 選択したレイアウト適用
            changeTarget(key.target, true);
            // キーの非活性・活性制御
            keyCtr();
        }else if(targetSel === "modaltelLayout"){
            $("#keypadArea").keypad({
                target : $(key.target),
                layout : modaltelLayout,
                keypadClass: cssClass ,
                clearText : '全削除',
                backspaceText : '1文字削除',backspaceStatus:"",
                // 必要かどうかレイアウト見て判断↓↓↓
                leftText : '←',leftStatus:"",
                rightText : '→',rightStatus:"",
                zendakutenText : 'ﾞ',zendakutenstatus:"",
                zenhandakutenText : 'ﾟ',zenhandakutenstatus:"",
                
                //全角英数カナ
                switchzleText : '英数小',zleStatus:"",
                switchzueText : '英数大',zueStatus:"",
                switchzknText : '全角カナ',zknStatus:"",
                onKeypress : onKeypressFocus,
                keypadOnly : false
            });
         // 選択したレイアウト適用
            changeTarget(key.target, true);
        }
//==============================================================================================
        
//        $('input[type=text]').attr('readonly',false);
            
        dakutenKeyControl();
    });
    
    
    $('input[type=text]').blur(function(){
    	$('input[type=text]').attr('readonly',true);
    });

    // マウスでクリックしたカーソルの位置で文字入力可能にするため↓↓
    $(document).on("click touchstart touchmove","input[type=text]", function(key){
		cursorIndex = key.target.selectionStart;
	});
	// ↑↑
	  
    // X(閉じるボタン)押下時モーダル閉じる
    /*$(document).on("click touchstart","#softKeyModalClose",function(){
        if ($("#softKeyModal").css("display") != "none") {
        	$('input[type=text]').blur();
            $('#softKeyModal').fadeOut({queue : false,duration : 500});
            $('#softKeyModal').animate({top : offsettop + 600}, 500);
            $('html, body').animate({scrollTop : ScrTop}, 500);
            $("#dummyT").empty();
            $('#dummyT').animate({'min-height' : 0 + 'px'}, 500);
        }
    });*/
	// X(閉じるボタン)押下時モーダル閉じる
    $(document).on("click touchstart","#softKeyModalClose",function(){
        if ($("#softKeyModal").css("display") != "none") {
        	$(".keypad-key").addClass("itemDisabled");
        	$(".keypad-special").addClass("itemDisabled");
        	$('input[type=text]').blur();
        	
            $('#softKeyModal').fadeOut({queue : false,duration : 500});
            $('#softKeyModal').animate({top : offsettop + 400}, 500);
            $('html, body').animate({scrollTop : ScrTop}, 800);
//            $('#dummyT').animate({'min-height' : 0 + 'px'}, 1000);
//            $("#dummyT").empty();
            
            $('html, body', parent.parent.document).animate({ height: 100 +"%" },400);
            document.body.style.overflow = "hidden";
        }
    });

    // enter押下時モーダル閉じる
    $("input[type=text]").keydown(function(key) {
        if (key.keyCode == 13 && ($("#softKeyModal").css("display") != "none")) {
        	$('input[type=text]').blur();
        	
            $('#softKeyModal').fadeOut({queue : false,duration : 500});
            $('#softKeyModal').animate({top : offsettop + 600}, 500);
            $('html, body').animate({scrollTop : ScrTop}, 500);
            
            $("#dummyT").empty();
            /*$('#dummyT').css('min-height', 0 + 'px');*/
            $('#dummyT').animate({'min-height' : 0 + 'px'}, 500);
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