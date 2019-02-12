//==========================   Key　ボタン 追加 ===============================================
// 特別キーは40個まで超えるとエラーが出て数字キーボードが表示される。
// target 変更の時初期化
var cursorIndex =0;
var maxFlg = true;
var cursorLeft=0;
var switchLayoutTmp;
var oldTargetId;

$.keypad.addKeyDef("DEL", "del");

$.keypad.addKeyDef("BS", "backspace", function(inst){

	var val = inst._input.val();
	var valLength = val.length;
	
	//　フォカス変わった時変わった位置を反映
	cursorIndex = inst._input[0].selectionStart;
	
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
	
	moveCursorSet(inst._input[0].id, cursorIndex);
	inst._input.focus();
	
	var inputTargetId = inst._input[0].id;
	//漢字入力の場合 変換候補ウィンドウを非表示にする
	if(inputTargetId == "kanjiLayout01" || inputTargetId == "kanjiLayout02"){
		unDisplayList()

		//変換前のカナ文字の保持内容を初期化
		if(inputTargetId == "kanjiLayout01"){
			if($(".KANA_NAME_LAST_CONVERT").length){
				$(".KANA_NAME_LAST_CONVERT").val("");
			}
		}else if(inputTargetId == "kanjiLayout02"){
			if($(".KANA_NAME_FIRST_CONVERT").length){
				$(".KANA_NAME_FIRST_CONVERT").val("");
			}
		}
	}
});

//全削除
$.keypad.addKeyDef("Clear", "clear", function(inst){
	var inputTargetId = inst._input[0].id;
	//漢字入力の場合 変換候補ウィンドウを非表示にする
	if(inputTargetId == "kanjiLayout01" || inputTargetId == "kanjiLayout02"){
		unDisplayList()
		
		//変換前のカナ文字の保持内容を初期化
		if(inputTargetId == "kanjiLayout01"){
			if($(".KANA_NAME_LAST_CONVERT").length){
				$(".KANA_NAME_LAST_CONVERT").val("");
			}
		}else if(inputTargetId == "kanjiLayout02"){
			if($(".KANA_NAME_FIRST_CONVERT").length){
				$(".KANA_NAME_FIRST_CONVERT").val("");
			}
		}
	}
});

//カーソル右移動
$.keypad.addKeyDef("RIGHT", "right", function(inst) {
	var val = inst._input.val();
	var valLength = val.length;
	//　フォカス変わった時変わった位置を反映
	cursorIndex = inst._input[0].selectionStart;
	
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
	
	moveCursorSet(inst._input[0].id, cursorIndex);
    inst._input.focus();
	
	var inputTargetId = inst._input[0].id;
	//漢字入力の場合 変換候補ウィンドウを非表示にする
	if(inputTargetId == "kanjiLayout01" || inputTargetId == "kanjiLayout02"){
		unDisplayList()
	}
});

//カーソル左移動
$.keypad.addKeyDef("LEFT", "left", function(inst) {
	var val = inst._input.val();
	var valLength = val.length;
	//　フォカス変わった時変わった位置を反映
	cursorIndex = inst._input[0].selectionStart;
	
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
	
	moveCursorSet(inst._input[0].id, cursorIndex);
    inst._input.focus();
	    
	var inputTargetId = inst._input[0].id;
	//漢字入力の場合 変換候補ウィンドウを非表示にする
	if(inputTargetId == "kanjiLayout01" || inputTargetId == "kanjiLayout02"){
		unDisplayList()
	}
});


// カナ(住所入力)->小英数
$.keypad.addKeyDef("SWITCHKNTOLE", "switchkntole", function(inst) {
	var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
	// 現在のレイアウト保持
	switchLayoutTmp = keypadInstant.keypad("option", "layout");
    keypadInstant.keypad("option", "layout", lowerEngLayout);
});

// カナ(住所入力)->大英数
$.keypad.addKeyDef("SWITCHKNTOUE", "switchkntoue", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
	// 現在のレイアウト保持
	switchLayoutTmp = keypadInstant.keypad("option", "layout");
    keypadInstant.keypad("option", "layout", upperEngLayout);
});

// 大英数->小英数
$.keypad.addKeyDef("SWITCHUETOLE", "switchuetole", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", lowerEngLayout);
});

// 大英数->カナ(住所入力)
$.keypad.addKeyDef("SWITCHUETOKN", "switchuetokn", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    
    if(lbm_Util_ItemIsNull(switchLayoutTmp)){
    	switchLayoutTmp = kanaAddrLayout;
    }
    keypadInstant.keypad("option", "layout", switchLayoutTmp);
    dakutenKeyControl();
});

// 小英数->大英数
$.keypad.addKeyDef("SWITCHLETOUE", "switchletoue", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", upperEngLayout);    
});

// 小英数->カナ(住所入力)
$.keypad.addKeyDef("SWITCHLETOKN", "switchletokn", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    if(lbm_Util_ItemIsNull(switchLayoutTmp)){
    	switchLayoutTmp = kanaAddrLayout;
    }
    keypadInstant.keypad("option", "layout", switchLayoutTmp);
    dakutenKeyControl();
});

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
	val = val.replace(/,/g,"");
	if(val=="" || val ==null){
		val = 10000;
	}else{
		val = val * 10000;
	}
	inst._input.val(val);
	// 特別キーの場合値をセットした後フォカスしないと新しい入力する値が一番頭に付く
	// 普通のキーはクリックすると一番後ろに値が付く
    inst._input.focus();
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
	
	val = val.replace(/,/g,"");
	
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
	// 特別キーの場合値をセットした後フォカスしないと新しい入力する値が一番頭に付く
	// 普通のキーはクリックすると一番後ろに値が付く
    inst._input.focus();
	// モード変更-＞5000 -> 5001 -> 5012 -> 5123
	manSenFlg = true;
	senFlg = true;
	senCnt++;
	manSenCnt=0;
	amountKeypad_OnKeypress();
});

//金額(円)入力用
$.keypad.addKeyDef("EN", "en", function(inst) {

	var val = inst._input.val();
	// 数字金額 
	setValueByClass("DISPLAY_KINGAKU",val.replace(/,/g,""));
	
	// 漢字金額  
	val = getKanziMoney(val);
	inst._input.val(val);
	//キーパッド非活性(半透明、クリック出来ない)
	keyPadDisabled();
	$(".NEXT").removeClass("itemDisabled");
});

//金額(確定)入力用
$.keypad.addKeyDef("CNFM", "cnfm", function(inst) {
	    
	var val = inst._input.val();
	// 数字金額
	setValueByClass("DISPLAY_KINGAKU",val.replace(/,/g,""));
	
	// 漢字金額  
	val = getKanziMoney(val);
	inst._input.val(val);
	//キーパッド非活性(半透明、クリック出来ない)
	keyPadDisabled();
	$(".NEXT").removeClass("itemDisabled");
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
	val = val.replace(/,/g,"");
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
	// 特別キーの場合値をセットした後フォカスしないと新しい入力する値が一番頭に付く
	// 普通のキーはクリックすると一番後ろに値が付く
    inst._input.focus();
	amountKeypad_OnKeypress();
});

//金額(0)入力用
$.keypad.addKeyDef("ZERO", "zero", function(inst) {
	var val = inst._input.val() + "0";
	inst._input.val(val);
	// 特別キーの場合値をセットした後フォカスしないと新しい入力する値が一番頭に付く
	// 普通のキーはクリックすると一番後ろに値が付く
    inst._input.focus();
	amountKeypad_OnKeypress();
});

//漢字（変換）入力用
$.keypad.addKeyDef("CONVERT", "convert", function(inst) {
	//漢字変換処理を実行
	$(".KANJI_CONVERT").trigger("click");
});
//漢字（確定）入力用
$.keypad.addKeyDef("CONFIRM", "confirm", function(inst) {
	//変換対象のカナ文字を取得
	let kana = getConvertTargetText()
	let targetkana = inst._input[0].id;
	if(targetkana === "kanjiLayout01"){
		if($(".KANA_NAME_LAST_CONVERT").length){
			let kanaConv = $(".KANA_NAME_LAST_CONVERT").val()
			$(".KANA_NAME_LAST_CONVERT").val(kanaConv + kana)
		}
		console.log($(".KANA_NAME_LAST_CONVERT").val());
	}else if(targetkana=== "kanjiLayout02"){
		let kanaConv = $(".KANA_NAME_FIRST_CONVERT").val()
		if($(".KANA_NAME_FIRST_CONVERT").length){
			let kanaConv = $(".KANA_NAME_FIRST_CONVERT").val()
			$(".KANA_NAME_FIRST_CONVERT").val(kanaConv + kana)
		}
	}
	// 漢字変換候補ウィンドウで選択している漢字を入力項目に設定する
	confirmClicked();
});
//漢字（前候補）入力用
$.keypad.addKeyDef("PREVIOUS", "previous", function(inst) {
	// 漢字変換候補ウィンドウの選択を一つ上に移動する
	candidatesBackwardClicked();
});
//漢字（後候補）入力用
$.keypad.addKeyDef("FOLLOWING", "following", function(inst) {
	// 漢字変換候補ウィンドウの選択を一つ下に移動する
	candidatesForwardClicked();
});


//暗証番号（並び替え）入力用
$.keypad.addKeyDef("SHUFFLE", "shuffle", function(inst) {

	randomNum();
});

//暗証番号（整列）入力用
$.keypad.addKeyDef("SORT", "sort", function(inst) {
	
	resetNum();
});

//全角濁点
$.keypad.addKeyDef("ZENDAKUTEN", "zendakuten", function(inst) {
	moveCursorSpKey("゛", inst);
});
//全角半濁点
$.keypad.addKeyDef("ZENHANDAKUTEN", "zenhandakuten", function(inst) {
	moveCursorSpKey("゜", inst);
});
//半角濁点
$.keypad.addKeyDef("DAKUTEN", "dakuten", function(inst) {
	moveCursorSpKey("ﾞ", inst);
});
//半角半濁点
$.keypad.addKeyDef("HANDAKUTEN", "handakuten", function(inst) {
	moveCursorSpKey("ﾟ", inst);
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

//全角カナ(住所入力)
var kanaAddrLayout = [
'アカサタナハマヤラワ'+$.keypad.HALF_SPACE+ 'ァャ' + $.keypad.SWITCHKNTOUE,
'イキシチニヒミユリヲ' +  $.keypad.HALF_SPACE+ 'ィュ' + $.keypad.SWITCHKNTOLE,
'ウクスツヌフムヨルン'  +  $.keypad.HALF_SPACE+ 'ゥョ',
'エケセテネヘメ'  +  $.keypad.SPACE+ 'レ' + $.keypad.ZENDAKUTEN  +  $.keypad.HALF_SPACE+ 'ェッ',
'オコソトノホモーロ' + $.keypad.ZENHANDAKUTEN + $.keypad.HALF_SPACE +'ォ',
$.keypad.BS + $.keypad.CLEAR  + $.keypad.LEFT+ $.keypad.RIGHT];

//全角カナ(カナ氏名)
var kanaNameLayout = [
'アカサタナハマヤラワ'  +  $.keypad.HALF_SPACE + 'ァャ' +  $.keypad.HALF_SPACE + '．' + $.keypad.SWITCHKNTOUE,
'イキシチニヒミユリヲ' +  $.keypad.HALF_SPACE + 'ィュ' +  $.keypad.HALF_SPACE + $.keypad.SPACE + $.keypad.SWITCHKNTOLE,
'ウクスツヌフムヨルン'  +  $.keypad.HALF_SPACE + 'ゥョ',
'エケセテネヘメ'  +  $.keypad.SPACE+ 'レ' + $.keypad.ZENDAKUTEN  +  $.keypad.HALF_SPACE+ 'ェッ',
'オコソトノホモーロ' + $.keypad.ZENHANDAKUTEN +$.keypad.HALF_SPACE +'ォ',
$.keypad.BS + $.keypad.CLEAR  + $.keypad.LEFT+ $.keypad.RIGHT];

//全角カナ(支店名)
var branchKanaLayout = [
'アカサタナハマヤラワ'  +  $.keypad.HALF_SPACE+ 'ァャ' + $.keypad.SPACE + $.keypad.CLEAR,
'イキシチニヒミユリヲ' +  $.keypad.HALF_SPACE+ 'ィュ',
'ウクスツヌフムヨルン' +  $.keypad.HALF_SPACE+ 'ゥョ',
'エケセテネヘメ' + $.keypad.SPACE+ 'レ゛' + $.keypad.HALF_SPACE+ 'ェッ',
'オコソトノホモーロ゜' + $.keypad.HALF_SPACE +'ォ'];

//支店番号
var branchLayout = [ '123'+ $.keypad.CLEAR, '456',
'789','0'];

//郵便番号入力用
var postNoLayout = [ '123' + $.keypad.CLEAR, '456' + $.keypad.BS,
'789'  + $.keypad.LEFT+ $.keypad.RIGHT,'0'];

//金額入力用
var kingakuLayout = [ '123' + $.keypad.MAN, '456' + $.keypad.SEN,
'789'  + $.keypad.EN, $.keypad.ZERO +  $.keypad.ZERO3 + $.keypad.CNFM, $.keypad.CLEARMONEY];

//ローマ字
var romajiNameLayout = ['ABCDEFGHIJ','KLMNOPQRST','UVWXYZ.-',
$.keypad.BS + $.keypad.CLEAR + $.keypad.LEFT+ $.keypad.RIGHT];

//電話番号
var telLayout = [ '123'+ $.keypad.CLEAR, '456' + $.keypad.BS,
'789' + $.keypad.LEFT+ $.keypad.RIGHT,'0-'];

//暗証番号---確認必要
var passwdNoLayout = [ '123'+ $.keypad.CLEAR, '456',
'789','0'];

//暗証番号並び替え---確認必要
var passwdNoRandomLayout = [ '123'+ $.keypad.CLEAR, '456',
'789' + $.keypad.SHUFFLE,'0'];

// 漢字入力
var kanjiLayout = [
'あかさたなはまやらわ'  +  $.keypad.HALF_SPACE+ 'ぁゃ' + $.keypad.CONVERT,
'いきしちにひみゆりを' +  $.keypad.HALF_SPACE+ 'ぃゅ' + $.keypad.PREVIOUS + $.keypad.FOLLOWING,
'うくすつぬふむよるん'  +  $.keypad.HALF_SPACE+ 'ぅょ'+ $.keypad.CONFIRM,
'えけせてねへめ'  +  $.keypad.SPACE+ 'れ' + $.keypad.ZENDAKUTEN  +  $.keypad.HALF_SPACE+ 'ぇっ',
'おこそとのほもーろ' + $.keypad.ZENHANDAKUTEN +$.keypad.HALF_SPACE +'ぉ',
$.keypad.BS + $.keypad.CLEAR  + $.keypad.LEFT+ $.keypad.RIGHT];

// =======================   関数    ====================================
//カーソル位置設定
function moveCursorSet(targetId, cursorIndex){
	$("#"+ targetId).get(0).setSelectionRange(cursorIndex, cursorIndex);
}
//function moveCursor(key, value, inst) {
//	
////	var t1 = inst._input[0].selectionStart;
////	var t2 = cursorIndex;
//	cursorIndex = inst._input[0].selectionStart;
//	
////----------------------------------------------------------
//	// 郵便番号レイアウトの場合、郵便番号3桁の時フォカス変更↓↓↓↓↓
//	// input id => postNoLayout01, postNoLayout02で設定する必要がある。
//	var keypadInstant = $(".jqueryKeypad").keypad("option", "layout");
//	var targetTmp = inst._input[0].id;
//	
//	if(keypadInstant == postNoLayout && targetTmp == "postNoLayout01" && value.length == 3){
//	   changeTarget($("#postNoLayout02"));
//	   $("#keypadArea").keypad("option", "target",$("#postNoLayout02"));
//	   inst._input.focus();
//	   return;
//	}
//	// 郵便番号レイアウトの場合、郵便番号3桁の時フォカス変更↑↑↑↑↑
//	
//	inst._input.focus();
//	
//	//ローマ字氏名入力の場合、入力されたローマ字をカタカナに変換する
//	if(targetTmp == "romajiNameLayout01" || targetTmp == "romajiNameLayout02"){
//		//フォーカス中の画面要素を取得
//		var currentItem = document.activeElement;
//		var ROMAJI_NAME;
//		var KANA_NAME;
//		if(currentItem.id == "romajiNameLayout01") {
//			//名の要素を取得
//			ROMAJI_NAME = $(".ROMAJI_NAME_FIRST");
//			KANA_NAME = $("#KANA_NAME_FIRST");
//		}else if(currentItem = "romajiNameLayout02"){
//			//姓の要素を取得
//			ROMAJI_NAME = $(".ROMAJI_NAME_LAST");
//			KANA_NAME = $("#KANA_NAME_LAST");
//		};
//		//ローマ字氏名からカタカナ変換後の文字列を設定
//		KANA_NAME.text(romanAlphabetToKatakana(ROMAJI_NAME.val()));
//	}
////----------------------------------------------------------
//	dakutenKeyControl();
//}



function moveCursor(key, value, inst) {
	//　フォカス変わった時変わった位置を反映
//	cursorIndex = inst._input[0].selectionStart;
	
	$('input[type=text]').attr('readonly',true);
	inst._input.focus();
	$('input[type=text]').attr('readonly',false);
	
	var val = inst._input.val();
	var maxlength = inst._input.attr('maxlength');
	var valLength = val.length; // 押下したキーを含んだ長さ

	if(!lbm_Util_ItemIsNull(key)){
		key = key.replace(/\t/g,"");
	}
	// カーソル初期化（全削除の時初期化）
	if(valLength==0){
		cursorIndex = 0;
		moveCursorSet(inst._input[0].id, 0);
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
		val = value;
		inst._input.val(val);
		
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

	moveCursorSet(inst._input[0].id, cursorIndex);
//----------------------------------------------------------
	// 郵便番号レイアウトの場合、郵便番号3桁の時フォカス変更↓↓↓↓↓
	// input id => postNoLayout01, postNoLayout02で設定する必要がある。
	var keypadInstant = $(".jqueryKeypad").keypad("option", "layout");
	var targetTmp = inst._input[0].id;
	
	if(keypadInstant == postNoLayout && targetTmp == "postNoLayout01" && value.length == 3){
	   changeTarget($("#postNoLayout02"));
	   $("#keypadArea").keypad("option", "target",$("#postNoLayout02"));
	   inst._input.focus();
	   return;
	}
	// 郵便番号レイアウトの場合、郵便番号3桁の時フォカス変更↑↑↑↑↑
	inst._input.focus();
	
	dakutenKeyControl();
}

// スペーシャルキーの場合onKeypress関数が使えない
// 値取得も仕組みが違いのでスペーシャルキー用の関数
// スペーシャルキーで値を入力する時使う必要がある
function moveCursorSpKey(key, inst) {

	$('input[type=text]').attr('readonly',true);
	inst._input.focus();
	$('input[type=text]').attr('readonly',false);

	// クリックした値がまだ桁数反映されてない状態
	var val = inst._input.val();
	var maxlength = inst._input.attr('maxlength');
	var valLength = val.length; // 押下したキーを含んだ長さ
	
	if(!lbm_Util_ItemIsNull(key)){
		key = key.replace(/\t/g,"");
	}
	
	// 最初ＭＡＸ桁数になった時はいる（maxFlg　初期化の時trueにする必要がある）
	if(valLength + 1 == maxlength){
	
	    if(cursorIndex == 0){
	        val = key + val.substr(0);
	    }else if(cursorIndex > 0 && cursorIndex < valLength ){
	        var val1 = val.substr(0, cursorIndex);
	        var val2 = val.substr(cursorIndex);
	        val = val1 + key + val2;
	        
	    }else if(cursorIndex == valLength){
	        val = val.substr(0) + key;
	    }
	    cursorIndex++;
	    maxFlg=false;
	    inst._input.val(val);
	
	}else if(valLength >= maxlength){
	    inst._input.val(val);
	}else{
	    if(cursorIndex == 0){
	        val = key + val.substr(0);
	    }else if(cursorIndex > 0 && cursorIndex < valLength ){
		    val = val.substr(0, cursorIndex) + key + val.substr(cursorIndex);
	    }
	    else if(cursorIndex == valLength){
		    val = val.substr(0) + key;
		}
	    cursorIndex++;
	    inst._input.val(val);
	}
	
	moveCursorSet(inst._input[0].id, cursorIndex);
	inst._input.focus();

	dakutenKeyControl();
}

//金額用 画面ボタン非活性(半透明、クリック出来ない)
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

//金額用 画面ボタン非活性(半透明、クリック出来ない)
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
	// キーの非活性(半透明、クリック出来ない)・活性制御
	keyCtr();

	// ターゲット取得
//	var targetTmp = $(".jqueryKeypad").keypad("option", "target");
	var targetTmp = $("#keypadArea").keypad("option", "target");
  
	// 万、千フラグ　万、千入力モードの時処理。
	if(manSenFlg){
  
		// ターゲット共通化の時修正必要
		var valTmp = $(targetTmp).val();
		valTmp = valTmp.replace(/,/g,"");
		
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
		  
		$(targetTmp).val(valTmp);
		
		// 万、千モードの時入力最後にキー非活性(半透明、クリック出来ない)
		if(manSenCnt == 5 || (manSenCnt == 4 && senFlg)){
			keyPadDisabledByLength();
		}
		
		// 万押下直後1数字押すと千使うようになる。
		if(manSenFlg && senCnt == 0 && manSenCnt == 2){
			$(".keypad-sen").removeClass("itemDisabled");
		}
	}
	//金額にコンマをつける
	var num = $(targetTmp).val().replace(/,/g, '');
	$(targetTmp).val(num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
	
}

//金額用 キーの非活性(半透明、クリック出来ない)・活性制御
function keyCtr(){
  // 次へボタン非活性(半透明、クリック出来ない)
  $(".NEXT").addClass("itemDisabled");

  // 入力フィールドクリックした時の動き調整

  var targetTmp = $("#keypadArea").keypad("option", "target");
  var amt = $(targetTmp).val();

  // コンマ削除
  amt = amt.replace(/,/g,"");

  // キーの桁数による制御
  if(amt=="" || amt == null){
  // 非活性(半透明、クリック出来ない)
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

  // 数字桁数10まで99億(桁数数字１０桁まで入力可、コンマまで１３桁)->数字桁数11まで999億まで変更(桁数数字11桁まで入力可、コンマまで14桁)
  if(amt.length > 10 && !manSenFlg){
      //キーパッド非活性(半透明、クリック出来ない)
	  keyPadDisabledByLength();// キー、万、千、０、０００
  }else{
	//キーパッド活性
	keyPadAbledByLength();   //キー、万、千、一文字訂正
  }
  if(amt.length > 8 || senFlg){
      // 000キー非活性(半透明、クリック出来ない)
      $(".keypad-special.keypad-zero3").addClass("itemDisabled");
  }
  if(amt.length > 7 || manCnt>0 || senFlg){
	  //万　非活性(半透明、クリック出来ない)
	  $(".keypad-man").addClass("itemDisabled");
  }
  if(amt.length > 1 && !senFlg  || senFlg ){
	  //千　非活性(半透明、クリック出来ない)
	  $(".keypad-sen").addClass("itemDisabled");
  }
  if(manSenFlg){
	  // 000キー非活性(半透明、クリック出来ない)
      $(".keypad-special.keypad-zero3").addClass("itemDisabled");
  }
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
	// コンマ削除
	var strMoney = p_Money.replace(/,/g,"");
	
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

//条件によるターゲット変更
function changeTarget(target){
	
	if(oldTargetId != target.id){
		// カーソル初期化（キーアウトレットが変わるとカーソル位置初期化）
		$("#keypadArea").keypad("option", "target", target);
		
		var maxlength = $(target).attr('maxlength');
		var val = $(target).val();
		
		cursorIndex = val.length;
		
		if(val.length != maxlength){
			maxFlg = true;
		}else{
			maxFlg = false;
		}
	}

	oldTargetId = target.id;
	dakutenKeyControl();
}


function setOldTargetId(targetId){
	oldTargetId = targetId;
}


//キーパッドランダム変更
function randomNum() {
    var key = ['1','2','3','4','5','6','7','8','9','0'];
    var j, x, i;
    for (i = key.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = key[i - 1];
        key[i - 1] = key[j];
        key[j] = x;
    }

    $(".keypad-key").each(function(n, e){
        $(e).text(key[n]);
    });
}

//　暗証番号（整列）入力 キーパッド元に戻す
function resetNum(){
    var key = ['1','2','3','4','5','6','7','8','9','0'];
    $(".keypad-key").each(function(n, e){
        $(e).text(key[n]);
    });
}

// onKeypressでmoveCursorを使わない場合利用
function onKeypressFocus(key, value, inst) {
    $('input[type=text]').attr('readonly',true);
    inst._input.focus();
    $('input[type=text]').attr('readonly',false);
}

//全角濁点と半濁点キーボード制御
function dakutenKeyControl(){
    var markEnableKeyDakuten = [];
    var markEnableKeyHandakuten = [];
    var checkValue = "";
    var checkValueRear = "";
    
    layoutName = $("#keypadArea").keypad("option", "layout");
    
    if(lbm_Util_ItemIsNull(layoutName) == false){
        if(layoutName == kanjiLayout){
        	//濁点
            markEnableKeyDakuten =  ["か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","は","ひ","ふ","へ","ほ","う"];
            markEnableKeyHandakuten = ["は","ひ","ふ","へ","ほ"];
        } else if(layoutName == kanaAddrLayout || layoutName == kanaNameLayout){
        	//濁点
        	markEnableKeyDakuten = ["カ","キ","ク","ケ","コ","サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト","ハ","ヒ","フ","ヘ","ホ","ウ"];
        	markEnableKeyHandakuten = ["ハ","ヒ","フ","ヘ","ホ"];
        }

        // 入力値取得
        var targetId = $("#keypadArea").keypad("option", "target");
        var itemValue = $(targetId).val();
        
        // 濁点、、半濁点適用  
        if(lbm_Util_ItemIsNull(itemValue) == false){
            checkValue = itemValue.substr(cursorIndex-1, 1);
            checkValueRear = itemValue.substr(cursorIndex, 1);
        }

        if(markEnableKeyDakuten.indexOf(checkValue) == -1 || checkValueRear == "ﾞ" || checkValueRear == "゛" || checkValueRear == "゜" || checkValueRear == "ﾟ"){
            $(".keypad-zendakuten").addClass("itemDisabled");
            $(".keypad-dakuten").addClass("itemDisabled");
        }else {
            $(".keypad-zendakuten").removeClass("itemDisabled");
            $(".keypad-dakuten").removeClass("itemDisabled");
        }
        if(markEnableKeyHandakuten.indexOf(checkValue) == -1 || checkValueRear == "ﾞ" || checkValueRear == "゛" || checkValueRear == "゜" || checkValueRear == "ﾟ"){
            $(".keypad-zenhandakuten").addClass("itemDisabled");
            $(".keypad-handakuten").addClass("itemDisabled");
        }else {
            $(".keypad-zenhandakuten").removeClass("itemDisabled");
            $(".keypad-handakuten").removeClass("itemDisabled");
        }
    }
}

function lbm_Util_ItemIsNull(p_Item) {
    if(p_Item == null || p_Item == "" || p_Item == undefined)
    {
        return true;
    }

    return false;
}
