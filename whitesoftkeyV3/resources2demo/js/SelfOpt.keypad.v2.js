//==========================   Key　ボタン 追加 ===============================================
// target 変更の時初期化
var cursorIndex =0;
var maxFlg = true;
var cursorLeft=0;

$.keypad.addKeyDef("DEL", "del");

$.keypad.addKeyDef("BS", "backspace", function(inst){
	
	var val = inst._input.val();
	var valLength = val.length;
	
	if(valLength==0){
		cursorIndex = 0;
	}else{
		if(cursorIndex == 0 || cursorIndex < 0){
			val = val.substr(0);
			cursorIndex=0;
		}else if(cursorIndex > 0 && cursorIndex < valLength ){
			val = val.substr(0, cursorIndex-1) + val.substr(cursorIndex);
			cursorIndex--;
			maxFlg = true;
		}else if(cursorIndex == valLength){
			val = val.substr(0, valLength-1);
			cursorIndex--;
			maxFlg = true;
		}
	}
	
	inst._input.val(val);
	
	moveCursorSet(cursorIndex);
	$("#keypadArea").keypad("option", "target").focus();
});

//カーソル移動
function moveCursorSet(cursorIndex){
	var cursorStart = (cursorLeft + cursorIndex*12) +"px";
	$(".blinker").css("left", cursorStart);
}

function cursorPosition(inputTop, inputLeft, tagPadding){
	
	if(tagPadding == null){
		tagPadding = "0px";
	}
	var inx = tagPadding.indexOf("px");
	cursorLeft = inputLeft + tagPadding.substr(0, inx)*1;
	
	$(".blinker").css("top", inputTop - 8);
	$(".blinker").css("left", cursorLeft);
	$(".blinker").css("display", "inline-block");
	moveCursorSet(0);
}

//function moveCursor1(cursorIndex){
//	var cursorPx = cursorIndex;
//	var spaceTxt = "";
//	while(cursorPx>0){
//		spaceTxt = spaceTxt + "d";
//		cursorPx--;
//	}
//	
//	$(".blinker2").val(spaceTxt);
//}

//カーソル右移動
$.keypad.addKeyDef("RIGHT", "right", function(inst) {
	var val = inst._input.val();
	var valLength = val.length;

	// カーソル設定
	if(valLength == 0){
		cursorIndex = 0;
	}else if( cursorIndex >= valLength){
		cursorIndex = valLength;
	}else if (cursorIndex <= 0 ){
		cursorIndex = 1;
	}else{
		cursorIndex++;
	}
	
	moveCursorSet(cursorIndex);
	$("#keypadArea").keypad("option", "target").focus();
});

//カーソル左移動
$.keypad.addKeyDef("LEFT", "left", function(inst) {
	var val = inst._input.val();
	var valLength = val.length;

	// カーソル設定
	if(valLength == 0){
		cursorIndex = 0;
	}else if( cursorIndex <= 0){
		cursorIndex=0;
	}else if( cursorIndex >= valLength){
		cursorIndex = valLength-1;
	}else{
		cursorIndex--;
	}

	moveCursorSet(cursorIndex);
	$("#keypadArea").keypad("option", "target").focus();
});

// OnKeypress カーソル移動ボタン適用 
function moveCursor(key, value, inst) {
	
	var val = inst._input.val();
	var maxlength = inst._input.attr('maxlength');
	var valLength = val.length; // 押下したキーを含んだ長さ
	key = removeTab(key);
	
	// カーソル初期化（全削除の時初期化）
	if(valLength==0){
		cursorIndex = 0;
        moveCursorSet(0);
        maxFlg=true;
        return;
    }

	val = val.substr(0, valLength-1);
	// 最初ＭＡＸ桁数になった時はいる（maxFlg　初期化の時trueにする必要があるs）
	if((valLength >= maxlength) && maxFlg){
		
		if(cursorIndex == 0){
			val = key + val.substr(0);
		}else if(cursorIndex > 0 && cursorIndex < valLength-1 ){
			var val1 = val.substr(0, cursorIndex);
			var val2 = val.substr(cursorIndex);
			val = val1 + key + val2;
			
		}else if(cursorIndex == valLength-1){
			val = val.substr(0) + key;
		}
		cursorIndex++;
		maxFlg=false;
		inst._input.val(val);
		
	}else if(valLength >= maxlength){
		inst._input.val(value);
		
	}else{
		if(cursorIndex == 0){
			val = key + val.substr(0);
		}else if(cursorIndex > 0 && cursorIndex < valLength-1 ){
			val = val.substr(0, cursorIndex) + key + val.substr(cursorIndex);
		}else if(cursorIndex == valLength-1){
			val = val.substr(0) + key;
		}
		cursorIndex++;
		inst._input.val(val);
		
	}

//	// 郵便番号レイアウトの場合、郵便番号3桁の時フォカス変更
//	var keypadInstant = $(".jqueryKeypad").keypad("option", "layout");
//	if(keypadInstant == postNoLayout && val.length == 3){
//		$("#keypadArea").keypad("option", "target", $("#postNoLayout02"));
//	}else{
//		moveCursorSet(cursorIndex);
//		$("#keypadArea").keypad("option", "target").focus();
//	}
//	// 郵便番号レイアウトの場合、郵便番号3桁の時フォカス変更
	
	moveCursorSet(cursorIndex);
	$("#keypadArea").keypad("option", "target").focus();
}

// OnKeypress
function postOnKeypress(key, value, inst){
	
	cursorMove(key, value, inst);
	
	
}

// カナ(住所入力)->小英数
$.keypad.addKeyDef("SWITCHKNTOLE", "switchkntole", function(inst) {
	var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", lowerEngLayout);
    
})

// カナ(住所入力)->大英数
$.keypad.addKeyDef("SWITCHKNTOUE", "switchkntoue", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", upperEngLayout);   
})

// 大英数->小英数
$.keypad.addKeyDef("SWITCHUETOLE", "switchuetole", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", lowerEngLayout);
})

// 大英数->カナ(住所入力)
$.keypad.addKeyDef("SWITCHUETOKN", "switchuetokn", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", kanaAddrLayout);
})

// 小英数->大英数
$.keypad.addKeyDef("SWITCHLETOUE", "switchletoue", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", upperEngLayout);    
})

// 小英数->カナ(住所入力)
$.keypad.addKeyDef("SWITCHLETOKN", "switchletokn", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", kanaAddrLayout);
})

//金額用 変数↓↓↓↓
//万、千フラグ　万と千押下でモード変更
//モード変更（万）->50000 -> 50001 -> 50012 -> 50123 -> 51234
//モード変更（千）->5000  -> 5001  -> 5012  -> 5123
var manSenFlg = false;
var manSenCnt = 0;
var manSenArray = [];

//万使うと千ボタン活性
var senFlg = false;
var manFlg = false;

//千カウント
var senCnt = 0;
var manCnt = 0;
//金額用 変数↑↑↑↑

//金額(万)入力用
$.keypad.addKeyDef("MAN", "man", function(inst) {
	var val = inst._input.val();
	val = removeComma(val);
	if(val=="" || val ==null){
		val = 10000;
	}else{
		val = val * 10000;
	}
  inst._input.val(val);
  
  // モード変更-＞50000 -> 50001 -> 50012 -> 50123 -> 51234
  manSenFlg = true;
  manFlg = true;
  manCnt ++;   
  amountKeypad_OnKeypress();
});

//金額(千)入力用
$.keypad.addKeyDef("SEN", "sen", function(inst) {
	var endNum ="";
	var val = inst._input.val();
	
	val = removeComma(val);
	
	if(val=="" || val ==null){
		val = 1000;
	}else if(manFlg){
		endNum= val.substr(val.length-1,1);
		val = val - endNum;
		val = val + endNum * 1000;
	}else{
		val = val * 1000;
	}
  inst._input.val(val);
	
  // モード変更-＞5000 -> 5001 -> 5012 -> 5123
  manSenFlg = true;
  senFlg = true;
  senCnt++;
  manSenCnt=0;
  amountKeypad_OnKeypress();
});

//金額(円)入力用
$.keypad.addKeyDef("EN", "en", function(inst) {
//  var val = inst._input.val() + "円";
  var val = inst._input.val();
  val = getKanziMoney(val);
  inst._input.val(val);

  //キーパッド非活性
  keyPadDisabled();
  $(".keypad-next").removeClass("itemDisabled");
});

//金額(確定)入力用
$.keypad.addKeyDef("CNFM", "cnfm", function(inst) {
  var val = inst._input.val();
  val = getKanziMoney(val);
  inst._input.val(val);
  
  //キーパッド非活性
  keyPadDisabled();
  $(".keypad-next").removeClass("itemDisabled");
});

//金額(訂正)入力用
$.keypad.addKeyDef("CLEARMONEY", "clearmoney", function(inst) {
	var val = inst._input.val();
	inst._input.val(null);

	keyCtr();
	keyPadAbled();
	  
	// 万、千の初期化
	manSenFlg = false;
	senFlg = false;
	manCnt = 0;
	senCnt = 0;
	manSenCnt = 0;
	manSenArray =[];
});

//金額(1文字訂正)入力用
$.keypad.addKeyDef("ONEBACKCLEAR", "onebackclear", function(inst) {
	var val = inst._input.val();
	val = removeComma(val);
	val = val.substr(0,val.length-1);
	inst._input.val(val);
	keyCtr();
	keyPadAbled();
	  
	manSenFlg = false;
	senFlg = false;
	manCnt = 0;
	senCnt = 0;
	manSenCnt = 0;
	manSenArray =[];
	amountKeypad_OnKeypress();
});

//金額(000)入力用
$.keypad.addKeyDef("ZERO3", "zero3", function(inst) {
  var val = inst._input.val() + "000";
  inst._input.val(val);
  amountKeypad_OnKeypress();
});

//金額(0)入力用
$.keypad.addKeyDef("ZERO", "zero", function(inst) {
  var val = inst._input.val() + "0";
  inst._input.val(val);
  amountKeypad_OnKeypress();
});

//==================    Layout           ===============================
//小英語
var lowerEngLayout = [
 'abcdefghij'+ $.keypad.HALF_SPACE + $.keypad.SWITCHLETOKN,
 'klmnopqrst'+ $.keypad.HALF_SPACE + $.keypad.SWITCHLETOUE,
 'uvwxyz','0123456789',$.keypad.BS + $.keypad.CLEAR + $.keypad.LEFT+ $.keypad.RIGHT];

//大英語
var upperEngLayout = [
 'ABCDEFGHIJ'+ $.keypad.HALF_SPACE + $.keypad.SWITCHUETOKN,
 'KLMNOPQRST'+ $.keypad.HALF_SPACE + $.keypad.SWITCHUETOLE,
 'UVWXYZ','0123456789',$.keypad.BS + $.keypad.CLEAR + $.keypad.LEFT+ $.keypad.RIGHT];

//カナ(住所入力)
var kanaAddrLayout = [
'ｱｶｻﾀﾅﾊﾏﾔﾗﾜ'  +  $.keypad.HALF_SPACE+ 'ｧｬ' + $.keypad.SWITCHKNTOLE,
'ｲｷｼﾁﾆﾋﾐﾕﾘｦ' +  $.keypad.HALF_SPACE+ 'ｨｭ' + $.keypad.SWITCHKNTOUE,
'ｳｸｽﾂﾇﾌﾑﾖﾙﾝ'  +  $.keypad.HALF_SPACE+ 'ｩｮ',
'ｴｹｾﾃﾈﾍﾒ'  +  $.keypad.SPACE+ 'ﾚﾞ'  +  $.keypad.HALF_SPACE+ 'ｪｯ',
'ｵｺｿﾄﾉﾎﾓｰﾛﾟ' +$.keypad.HALF_SPACE +'ｫ',
$.keypad.BS + $.keypad.CLEAR  + $.keypad.LEFT+ $.keypad.RIGHT];

//カナ(支店名)
var branchKanaLayout = [
'ｱｶｻﾀﾅﾊﾏﾔﾗﾜ'  +  $.keypad.HALF_SPACE+ 'ｧｬ' + $.keypad.SPACE + $.keypad.CLEAR,
'ｲｷｼﾁﾆﾋﾐﾕﾘｦ' +  $.keypad.HALF_SPACE+ 'ｨｭ',
'ｳｸｽﾂﾇﾌﾑﾖﾙﾝ'  +  $.keypad.HALF_SPACE+ 'ｩｮ',
'ｴｹｾﾃﾈﾍﾒ'  +  $.keypad.SPACE+ 'ﾚﾞ'  +  $.keypad.HALF_SPACE+ 'ｪｯ',
'ｵｺｿﾄﾉﾎﾓｰﾛﾟ' +$.keypad.HALF_SPACE +'ｫ'];

//郵便番号入力用
var postNoLayout = [ '123' + $.keypad.CLEAR, '456' + $.keypad.BS,
   '789'  + $.keypad.LEFT+ $.keypad.RIGHT,'0'];

//金額入力用
var kingakuLayout = [ '123' + $.keypad.MAN, '456' + $.keypad.SEN,
   '789'  + $.keypad.EN, $.keypad.ZERO +  $.keypad.ZERO3 + $.keypad.CNFM, $.keypad.CLEARMONEY + $.keypad.ONEBACKCLEAR];

//ローマ字
var romajiNameLayout = ['ABCDEFGHIJ','KLMNOPQRST','UVWXYZ.-',
	$.keypad.BS + $.keypad.CLEAR + $.keypad.LEFT+ $.keypad.RIGHT];

//電話番号
var telLayout = [ '123'+ $.keypad.CLEAR, '456' + $.keypad.BS,
   '789' + $.keypad.LEFT+ $.keypad.RIGHT,'0-'];

//支店番号
var branchLayout = [ '123'+ $.keypad.CLEAR, '456' + $.keypad.BACK,
   '789','0'];
// =======================   関数    ====================================

//金額用 画面ボタン非活性
function keyPadDisabled(){
	$(".keypad-key").addClass("itemDisabled");
	$(".keypad-zero").addClass("itemDisabled");
	$(".keypad-zero3").addClass("itemDisabled");
	$(".keypad-man").addClass("itemDisabled");
	$(".keypad-sen").addClass("itemDisabled");
	$(".keypad-en").addClass("itemDisabled");
	// 確定
	$(".keypad-cnfm").addClass("itemDisabled");
	// 一文字訂正
	$(".keypad-onebackclear").addClass("itemDisabled");
}

//金額用 画面ボタン活性
function keyPadAbled(){
	$(".keypad-key").removeClass("itemDisabled");
	$(".keypad-man").removeClass("itemDisabled");
	$(".keypad-sen").removeClass("itemDisabled");
  $(".keypad-en").addClass("itemDisabled");
  // 確定
  $(".keypad-cnfm").addClass("itemDisabled");
  // 一文字訂正
  $(".keypad-onebackclear").removeClass("itemDisabled");
}

//金額用 画面ボタン非活性
function keyPadDisabledByLength(){
	$(".keypad-key").addClass("itemDisabled");
	$(".keypad-zero").addClass("itemDisabled");
	$(".keypad-zero3").addClass("itemDisabled");
	$(".keypad-man").addClass("itemDisabled");
	$(".keypad-sen").addClass("itemDisabled");
}

//金額用 画面ボタン活性
function keyPadAbledByLength(){
	$(".keypad-key").removeClass("itemDisabled");
	$(".keypad-man").removeClass("itemDisabled");
	$(".keypad-sen").removeClass("itemDisabled");
	$(".keypad-onebackclear").removeClass("itemDisabled");
}

//金額用 callBack
function amountKeypad_OnKeypress() {
  // キーの非活性・活性制御
  keyCtr();

  // 万、千フラグ　万、千入力モードの時処理。
  if(manSenFlg){

  	var valTmp = $("#areaNumber").val();
  	valTmp = removeComma(valTmp);

  	if(valTmp.length>=4){
  		
	    	if(manSenCnt==0){
  			//千の時(valTmp.length==4)  万の時
	    		manSenArray[0] = valTmp.length==4 ? "": valTmp.substr(0, valTmp.length - 4);
	    		manSenArray[1] = valTmp.substr(valTmp.length - 4, 1);
	    		manSenArray[2] = valTmp.substr(valTmp.length - 3, 1);
	    		manSenArray[3] = valTmp.substr(valTmp.length - 2, 1);
	    		manSenArray[4] = valTmp.substr(valTmp.length - 1, 1);
	    	}else{
	    		var tmp=0;
	    		
	    		for(var i=0 ; i <manSenCnt ; i++){
	    			tmp = valTmp.substr(valTmp.length -i-1 , 1);
	    			manSenArray[4-i] = tmp;
	    		}
	    		
	    		valTmp = manSenArray[0] + manSenArray[1] + manSenArray[2] + manSenArray[3] + manSenArray[4];
	    	}
	    	manSenCnt++;
  	}

  	$("#areaNumber").val(valTmp);

  	// 万、千モードの時入力最後にキー非活性
  	if(manSenCnt == 5 || (manSenCnt == 4 && senFlg)){
  		keyPadDisabledByLength();
  	}

      // 万押下直後1数字押すと千使うようになる。
  	if(manSenFlg && senCnt == 0 && manSenCnt == 2){
  		$(".keypad-sen").removeClass("itemDisabled");
  	}
  }

  var num = $("#areaNumber").val().replace(/,/g, '');
  $("#areaNumber").val(num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
}

//金額用 キーの非活性・活性制御
function keyCtr(){
  // 次へボタン非活性
  $(".keypad-next").addClass("itemDisabled");

  // ターゲット共通化の時修正必要
  var amt = $("#areaNumber").val();

  // コンマ削除
  amt = removeComma(amt);

  // キーの桁数による制御
  if(amt=="" || amt == null){
  	// 非活性
      // 0
      $(".keypad-special.keypad-zero").addClass("itemDisabled");
      // 000
      $(".keypad-special.keypad-zero3").addClass("itemDisabled");
      // 円
      $(".keypad-en").addClass("itemDisabled");
      // 確定
      $(".keypad-cnfm").addClass("itemDisabled");
  }else{
  	// 活性
      // 0
      $(".keypad-special.keypad-zero").removeClass("itemDisabled");
      // 000
      $(".keypad-special.keypad-zero3").removeClass("itemDisabled");
      // 円
      $(".keypad-en").removeClass("itemDisabled");
      // 確定
      $(".keypad-cnfm").removeClass("itemDisabled");
  }

  // 数字桁数10まで99億
  if(amt.length > 9 && !manSenFlg){
      //キーパッド非活性
  	keyPadDisabledByLength();// キー、万、千、０、０００
  }else{
  	//キーパッド活性
  	keyPadAbledByLength();   //キー、万、千、一文字訂正
  }

  if(amt.length > 7 || senFlg){
      // 000キー非活性
      $(".keypad-special.keypad-zero3").addClass("itemDisabled");
  }

  if(amt.length > 6 || manCnt>0 || senFlg){
  	$(".keypad-man").addClass("itemDisabled");// 万　非活性
  }

  if(amt.length > 1 && !senFlg  || senFlg ){
  	$(".keypad-sen").addClass("itemDisabled");// 千　非活性
  }
}

//入力フィールドの"|"削除
function removeCursor(val){
	while(val.indexOf("|")>-1){
		val=val.replace("|","");
	}
	return val;
}
//入力フィールドの"	"削除(全削除)
function removeTab(val){
	while(val.indexOf("	")>-1){
		val=val.replace("	","");
	}
	return val;
}

//入力フィールドのコンマ削除
function removeComma(val){
	while(val.indexOf(",")>0){
		val=val.replace(",","");
	}
	return val;
}

//頭から0削除0では無い時止まる。
function removeZero(val){
	while(val.charAt(0)=="0"){
		val=val.substr(1);
	}
	return val;
}

//金額を漢数字化(ｘｘ億ｘｘｘｘ万ｘ千ｘｘｘ)
function getKanziMoney(p_Money){
  // コマ削除
  var strMoney = removeComma(p_Money);

  // 金額一時保存
  var kanziMoney ="";
  // 漢数字入力
  var allLength = strMoney.length;
  var p_money=[];
  
  // XX億0103 → for 4回　5，6，7,8 → 0確認削除0でないと止まり。4回削除したら万消す、
  // 4回なら億のindexから0確認　0なら千削除
  // 億のindexから3回0確認0確認削除0でないと止まり。
  // 0ではないと千のindexから3回0確認0確認削除0でないと止まり。
	if(allLength>0){
	    //円の下保存
		var startInx = allLength-3 >0 ? allLength-3 : 0;
		var endInx = allLength-3 >0 ? 3 : allLength;
	    var enStr = strMoney.substr(startInx, endInx);
	    enStr = removeZero(enStr);
	    p_money[3]=enStr;
	}
	if(allLength>3){
	    //千 length > 3
	    //千の下保存
		var startInx = allLength-4 >0 ? allLength-4 : 0;
	    var senStr = strMoney.substr(startInx, 1);
	    senStr = removeZero(senStr);
	    if(senStr!=""){senStr=senStr +"千";}
	    p_money[2]=senStr;
	}
	if(allLength>4){
	    //万 length > 4
	    //万の下保存
		var startInx = allLength-8 >0 ? allLength-8 : 0;
		var endInx = allLength-8 >0 ? 4 : allLength-4;
	    var manStr = strMoney.substr(startInx, endInx);
	    
	    manStr = removeZero(manStr);
	    if(manStr!=""){manStr=manStr +"万";}
	    p_money[1]=manStr;
	}
	if(allLength>8){
	    //憶length > 8
	    //憶の下保存
	    var okuStr = strMoney.substr(0, allLength-8);
	    okuStr = okuStr + "億";
	    p_money[0]=okuStr;
	}

  for(key in p_money){
  	kanziMoney = kanziMoney + p_money[key];
  }
  
  return kanziMoney;
}

//選択したレイアウト適用(選択したキーボードのレイアウトをすぐ適用)
function changeKeypad(targetLayout, target){
	// カーソル初期化（キーアウトレットが変わるとカーソル位置初期化）
	cursorIndex = 0;
	leftFlg = true;
	rightFlg = true;
	
	var maxlength = $(target).attr('maxlength');
	var val = $(target).val();
	val = removeCursor(val);
	
	$(target).val(val);
	
	if(val.length != maxlength){
		maxFlg = true;
	}
	
	var keypadInstant = $(".jqueryKeypad");
    // レイアウトを切り替える
    keypadInstant.keypad("option", "layout", targetLayout);
}

function keypad_OnKeypress() {
    $("#keypadArea").keypad("option", "target").focus();
}

//20181211 ==========================
function narrowKeyboardClicked() {
	var tt = getCodeName("TENBAN", "201");
}

//銀行情報、支店情報処理キー制御
function bankInfoKeyBoardControl(p_Data){

	// データ構成による修正必要
    // データよりキーを制御
    var kanaKey = new Array();
    for(var shitenIndex in p_Data)
    {
        var kanaText = p_Data[shitenIndex][3];
        kanaText = kanaText.replace('"','');
        kanaText = kanaText.replace('"','');

        if(bankInfoFilterKey.length > 0)
        {
            kanaText = kanaText.substr(bankInfoFilterKey.length);
        }

        var kana = kanaText.substr(0,1);
        if(kanaKey.indexOf(hankana2zenkana(kana)) == -1)
        {
            kanaKey.push(hankana2zenkana(kana));
        }
    }

    var elements = document.getElementsByClassName('key');

    for(var eleIndex in elements)
    {
        if(elements[eleIndex] == null)
        {
            continue;
        }

        if(elements[eleIndex].innerText == undefined)
        {
            continue;
        }

        elements[eleIndex].classList.add("itemDisabled");

        var kana = elements[eleIndex].innerText;
        if(kanaKey.indexOf(kana) != -1)
        {
            elements[eleIndex].classList.remove("itemDisabled");
        }
    }

    // 空白キー特別設定
    if(kanaKey.indexOf("　") != -1)
    {
        document.getElementsByClassName('key03')[0].classList.remove("itemDisabled");
    }
    else
    {
        document.getElementsByClassName('key03')[0].classList.add("itemDisabled");
    }
}