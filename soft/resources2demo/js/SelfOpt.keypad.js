//==========================   Key　ボタン 追加 ===============================================
// 特別キーは40個まで超えるとエラーが出て数字キーボードが表示される。
// target 変更の時初期化
var cursorIndex =0;
var maxFlg = true;
var cursorLeft=0;
var switchLayoutTmp;
var oldTargetId;

//$.keypad.addKeyDef("DEL", "del");

$.keypad.addKeyDef("BS", "backspace", function(inst){
	$('input[type=text]').attr('readonly',true);
	inst._input.focus();
	$('input[type=text]').attr('readonly',false);
	
	var inputTargetId = inst._input[0].id;
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
	
	moveCursorSet(inputTargetId, cursorIndex);
	inst._input.focus();
	
	//漢字入力の場合 変換候補ウィンドウを非表示にする
	if(inputTargetId == "kanjiLayout01" || inputTargetId == "kanjiLayout02"){
		unDisplayList();

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
		unDisplayList();
		
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
	
	if(inputTargetId.indexOf('passwdNoLayout') > -1 || inputTargetId.indexOf('passwdNoRandomLayout') > -1 ){
		if(inst._input[0].className.indexOf('PASSWD_NO_INPUT') > -1){
			$('.PASSWD_NO_INPUT').val('○○○○');
			$('.PASSWD_NO').val('');
		}else if(inst._input[0].className.indexOf('PASSWD_NO_CONF_INPUT') > -1){
			$('.PASSWD_NO_CONF_INPUT').val('○○○○');
			$('.PASSWD_NO_CONF').val('');
		}

	//ログインパスワード
		if(inst._input[0].className.indexOf('LOGON_PASSWD_INPUT') > -1){
			$('.LOGON_PASSWD_INPUT').val('○○○○○○');
			$('.LOGON_PASSWD').val('');
		}else if(inst._input[0].className.indexOf('LOGON_PASSWD_CONF_INPUT') > -1){
			$('.LOGON_PASSWD_CONF_INPUT').val('○○○○○○');
			$('.LOGON_PASSWD_CONF').val('');
		}
	}
});

//カーソル右移動
$.keypad.addKeyDef("RIGHT", "right", function(inst) {
	$('input[type=text]').attr('readonly',true);
	inst._input.focus();
	$('input[type=text]').attr('readonly',false);
	
	var inputTargetId = inst._input[0].id;
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
	
	moveCursorSet(inputTargetId, cursorIndex);
	inst._input.focus();

	//漢字入力の場合 変換候補ウィンドウを非表示にする
	if(inputTargetId == "kanjiLayout01" || inputTargetId == "kanjiLayout02"){
		unDisplayList();
	}
});

//カーソル左移動
$.keypad.addKeyDef("LEFT", "left", function(inst) {
	$('input[type=text]').attr('readonly',true);
	inst._input.focus();
	$('input[type=text]').attr('readonly',false);
	
	var inputTargetId = inst._input[0].id;
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
	
	moveCursorSet(inputTargetId, cursorIndex);
	inst._input.focus();

	//漢字入力の場合 変換候補ウィンドウを非表示にする
	if(inputTargetId == "kanjiLayout01" || inputTargetId == "kanjiLayout02"){
		unDisplayList();
	}
});

//====================================    英語カナ & 住所入力    ====================================
//->カナ(英数カナ)
$.keypad.addKeyDef("SWITCHKN", "switchkn", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
/*    if(lbm_Util_ItemIsNull(switchLayoutTmp)){
    	switchLayoutTmp = kanaEngLayout;
    }
    keypadInstant.keypad("option", "layout", switchLayoutTmp);*/
    keypadInstant.keypad("option", "layout", kanaEngLayout);
    dakutenKeyControl();
});

// ->カナ(住所入力)
$.keypad.addKeyDef("SWITCHKN", "switchkn", function(inst) {
 var keypadInstant = $(".jqueryKeypad").filter(function(index) {
     return ($.keypad._getInst(this) == inst);
 });
/* if(lbm_Util_ItemIsNull(switchLayoutTmp)){
 	switchLayoutTmp = kanaAddrLayout;
 }
 keypadInstant.keypad("option", "layout", switchLayoutTmp);*/
 keypadInstant.keypad("option", "layout", kanaAddrLayout);
 dakutenKeyControl();
});

// ->大英数
$.keypad.addKeyDef("SWITCHUE", "switchue", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
	// 現在のレイアウト保持
	switchLayoutTmp = keypadInstant.keypad("option", "layout");
    keypadInstant.keypad("option", "layout", upperEngLayout);
});

// ->小英数
$.keypad.addKeyDef("SWITCHLE", "switchle", function(inst) {
	var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
	// 現在のレイアウト保持
	switchLayoutTmp = keypadInstant.keypad("option", "layout");
    keypadInstant.keypad("option", "layout", lowerEngLayout);
});
//=============================================================================================


//=======================    全角英数カナ    =======================================================
//->カナ
$.keypad.addKeyDef("SWITCHZKN", "switchzkn", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", zenkanaEngLayout);
    dakutenKeyControl();
});

// ->大英数
$.keypad.addKeyDef("SWITCHZUE", "switchzue", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", zenupperEngLayout);
});

// ->小英数
$.keypad.addKeyDef("SWITCHZLE", "switchzle", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", zenlowerEngLayout);
});

//=============================================================================================


//=======================    multi Keyboard Layout(全角)    ====================================
//漢字
$.keypad.addKeyDef("SWITCHMTKJ", "switchmtkj", function(inst) {
	var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", multiKanjiLayout);
    dakutenKeyControl();
});

//カナ
$.keypad.addKeyDef("SWITCHMTKN", "switchmtkn", function(inst) {
	var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", multikanaLayout);
    dakutenKeyControl();
});

//大英数
$.keypad.addKeyDef("SWITCHMTUE", "switchmtue", function(inst) {
	var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", multiUpEngLayout);
});

//小英数
$.keypad.addKeyDef("SWITCHMTLE", "switchmtle", function(inst) {
	var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });
    keypadInstant.keypad("option", "layout", multiLowEngLayout);
});



//==============================================================================================
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
//	$(".NEXT").removeClass("itemDisabled");
	// 金額入力後円か確認を押下しなかった場合金額が反映されないため確認用フラグ
	setValueByClass("KINGAKU_CNFM","EN");
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
	
//	$(".NEXT").removeClass("itemDisabled");
	// 金額入力後円か確認を押下しなかった場合金額が反映されないため確認用フラグ
	setValueByClass("KINGAKU_CNFM","EN");
});

//金額(訂正)入力用
$.keypad.addKeyDef("CLEARMONEY", "clearmoney", function(inst) {
	var val = inst._input.val();
	inst._input.val(null);
	
	// 万、千の初期化
	manSenFlg = false;
	senFlg = false;
	manCnt = 0;
	senCnt = 0;
	manSenCnt = 0;
	manSenArray =[];
	
	keyCtr();
	keyPadAbled();
	
	// 数字金額 
	setValueByClass("DISPLAY_KINGAKU",val.replace(/,/g,""));
	// 金額入力後円か確認を押下しなかった場合金額が反映されないため確認用フラグ
	setValueByClass("KINGAKU_CNFM","");
	
});

/*//金額(1文字訂正)入力用
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
});*/

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
// フォーカスが変わった時フォーカスをまた設定：getConvertTargetTextの中でtargetId取るのができないため
	var targetId = $("#keypadArea").keypad("option", "target", "#" + inst._input[0].id);
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
/*$.keypad.addKeyDef("DAKUTEN", "dakuten", function(inst) {
	moveCursorSpKey("ﾞ", inst);
});*/
//半角半濁点
/*$.keypad.addKeyDef("HANDAKUTEN", "handakuten", function(inst) {
	moveCursorSpKey("ﾟ", inst);
});*/

//小数点
$.keypad.addKeyDef("DECIMAL", "decimal", function(inst) {
	var val = inst._input.val() + ".";
	inst._input.val(val);
    inst._input.focus();
	decimalOff();
});


//==================    Layout           ===============================
//全角カナ(カナ氏名)
var kanaNameLayout = [
'アカサタナハマヤラワァャ' ,
'イキシチニヒミユリヲィュ' ,
'ウクスツヌフムヨルンゥョ' ,
'エケセテネヘメ'  +  $.keypad.SPACE+ 'レ' + $.keypad.ZENDAKUTEN + 'ェッ',
'オコソトノホモーロ' + $.keypad.ZENHANDAKUTEN +'ォ',
$.keypad.CLEAR + $.keypad.BS + $.keypad.LEFT+ $.keypad.RIGHT];

//全角カナ(支店名)
var branchKanaLayout = [
'アカサタナハマヤラワ',
'イキシチニヒミユリヲ',
'ウクスツヌフムヨルン',
'エケセテネヘメ' + $.keypad.SPACE + 'レ゛',
'オコソトノホモーロ゜',
$.keypad.CLEAR];

//支店番号
var branchLayout = [ '123'+ $.keypad.CLEAR, '456',
'789','0'];

//口座番号入力用
var kozaNoLayout = [ '123' + $.keypad.CLEAR, '456',
'789','0'];

//郵便番号入力用
var postNoLayout = [ '123' + $.keypad.CLEAR, '456',
'789','0'];

//金額入力用
var kingakuLayout = [ '123' + $.keypad.MAN + $.keypad.CLEARMONEY, '456' + $.keypad.SEN,
'789'  + $.keypad.EN, $.keypad.ZERO + $.keypad.ZERO3 + $.keypad.CNFM];

//ローマ字
var romajiNameLayout = ['ABCDEFGHIJ','KLMNOPQRST','UVWXYZ.-<',
$.keypad.BS + $.keypad.CLEAR + $.keypad.LEFT+ $.keypad.RIGHT];

//電話番号
var telLayout = [ '123'+ $.keypad.CLEAR, '456' + $.keypad.BS,
'789'/*+ $.keypad.LEFT+ $.keypad.RIGHT*/,'0-'];

//小数点
var decimalNoLayout = [ '123'+ $.keypad.CLEAR, '456',
'789', '0'+ $.keypad.DECIMAL];

//暗証番号---確認必要
var passwdNoLayout = [ '123'+ $.keypad.CLEAR, '456',
'789','0'];

//暗証番号並び替え---確認必要
var passwdNoRandomLayout = [ '123'+ $.keypad.CLEAR, '456',
'789' + $.keypad.SHUFFLE,'0'];

//暗証番号Error---確認必要
var passwdNoLayoutError = [ '123'+ $.keypad.CLEAR, '456',
'789','0'];

//暗証番号Ope---確認必要
var passwdNoLayoutOpe = [ '123'+ $.keypad.CLEAR, '456',
'789','0'];

//通番入力用
var tsubanNoLayout = [ '123' + $.keypad.CLEAR, '456',
'789','0'];

// 漢字入力
var kanjiLayout = [
'あかさたなはまやらわぁゃ' + $.keypad.CONVERT,
'いきしちにひみゆりをぃゅ',
'うくすつぬふむよるんぅょ' + $.keypad.PREVIOUS,
'えけせてねへめ' +  $.keypad.SPACE+ 'れ' + $.keypad.ZENDAKUTEN  + 'ぇっ' + $.keypad.FOLLOWING,
'おこそとのほもーろ' + $.keypad.ZENHANDAKUTEN + 'ぉ'+  $.keypad.SPACE + $.keypad.CONFIRM,
$.keypad.CLEAR + $.keypad.BS + $.keypad.LEFT+ $.keypad.RIGHT];


//====================================    英語カナ & 住所入力    ====================================
//全角カナ(英数カナ)
var kanaEngLayout = [
'アカサタナハマヤラワァャ',
'イキシチニヒミユリヲィュ',
'ウクスツヌフムヨルンゥョ',
'エケセテネヘメ'  +  $.keypad.SPACE+ 'レ' + $.keypad.ZENDAKUTEN  + 'ェッ',
'オコソトノホモーロ' + $.keypad.ZENHANDAKUTEN + 'ォ',
$.keypad.HALF_SPACE,
$.keypad.CLEAR + $.keypad.BS  + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHUE + $.keypad.SWITCHLE];

//全角カナ(住所入力)
var kanaAddrLayout = [
'アカサタナハマヤラワァャ',
'イキシチニヒミユリヲィュ',
'ウクスツヌフムヨルンゥョ',
'エケセテネヘメ'  +  $.keypad.SPACE+ 'レ' + $.keypad.ZENDAKUTEN  + 'ェッ',
'オコソトノホモーロ' + $.keypad.ZENHANDAKUTEN + 'ォ',
$.keypad.CLEAR + $.keypad.BS  + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHUE + $.keypad.SWITCHLE];

//大英語(半角、全角)
var upperEngLayout = [
//半角
'ABCDEFGHIJ',
'KLMNOPQRST',
'UVWXYZ','0123456789',
//全角
/*'ＡＢＣＤＥＦＧＨＩＪ',
'ＫＬＭＮＯＰＱＲＳＴ',
'ＵＶＷＸＹＺ','０１２３４５６７８９',*/
$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,
$.keypad.CLEAR + $.keypad.BS + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHKN + $.keypad.SWITCHLE];


//小英語(半角、全角)
var lowerEngLayout = [
//半角
'abcdefghij', 'klmnopqrst', 'uvwxyz','0123456789',
//全角
/*'ａｂｃｄｅｆｇｈｉｊ', 'ｋｌｍｎｏｐｑｒｓｔ', 'ｕｖｗｘｙｚ','０１２３４５６７８９',*/
$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,
$.keypad.CLEAR + $.keypad.BS + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHKN + $.keypad.SWITCHUE];

/*
//小英語(半角、全角)
var lowerEngLayout = [
//半角
'abcdefghij', 'klmnopqrst', 'uvwxyz','0123456789',
	
//全角
'ａｂｃｄｅｆｇｈｉｊ', 'ｋｌｍｎｏｐｑｒｓｔ', 'ｕｖｗｘｙｚ','０１２３４５６７８９',
$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,
$.keypad.CLEAR + $.keypad.BS + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHLETOUE + $.keypad.SWITCHLETOKN];

//大英語(半角、全角)
var upperEngLayout = [
//半角
'ABCDEFGHIJ',
'KLMNOPQRST',
'UVWXYZ','0123456789',
	
//全角
'ＡＢＣＤＥＦＧＨＩＪ',
'ＫＬＭＮＯＰＱＲＳＴ',
'ＵＶＷＸＹＺ','０１２３４５６７８９',
$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,
$.keypad.CLEAR + $.keypad.BS + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHUETOKN + $.keypad.SWITCHUETOLE];

//全角カナ(英語カナ)
var kanaEngLayout = [
'アカサタナハマヤラワァャ',
'イキシチニヒミユリヲィュ',
'ウクスツヌフムヨルンゥョ',
'エケセテネヘメ'  +  $.keypad.SPACE+ 'レ' + $.keypad.ZENDAKUTEN  + 'ェッ',
'オコソトノホモーロ' + $.keypad.ZENHANDAKUTEN + 'ォ',
$.keypad.HALF_SPACE,
$.keypad.CLEAR + $.keypad.BS  + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHKNTOUE + $.keypad.SWITCHKNTOLE];

//全角カナ(住所入力)
var kanaAddrLayout = [
'アカサタナハマヤラワァャ',
'イキシチニヒミユリヲィュ',
'ウクスツヌフムヨルンゥョ',
'エケセテネヘメ'  +  $.keypad.SPACE+ 'レ' + $.keypad.ZENDAKUTEN  + 'ェッ',
'オコソトノホモーロ' + $.keypad.ZENHANDAKUTEN + 'ォ',
$.keypad.CLEAR + $.keypad.BS  + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHKNTOUE + $.keypad.SWITCHKNTOLE];*/
//=============================================================================================


//=======================   全角英数カナ    =======================================================
//全角カナ(全角英語カナ)
var zenkanaEngLayout = [
	'アカサタナハマヤラワァャ',
	'イキシチニヒミユリヲィュ',
	'ウクスツヌフムヨルンゥョ',
	'エケセテネヘメ'  +  $.keypad.SPACE+ 'レ' + $.keypad.ZENDAKUTEN  + 'ェッ',
	'オコソトノホモーロ' + $.keypad.ZENHANDAKUTEN + 'ォ',
	$.keypad.HALF_SPACE,
	$.keypad.CLEAR + $.keypad.BS  + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHZUE + $.keypad.SWITCHZLE];

//大英語(全角)
var zenupperEngLayout = [
'ＡＢＣＤＥＦＧＨＩＪ',
'ＫＬＭＮＯＰＱＲＳＴ',
'ＵＶＷＸＹＺ','０１２３４５６７８９',
$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,
$.keypad.CLEAR + $.keypad.BS + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHZKN + $.keypad.SWITCHZLE];

//小英語(全角)
var zenlowerEngLayout = [
'ａｂｃｄｅｆｇｈｉｊ', 'ｋｌｍｎｏｐｑｒｓｔ', 'ｕｖｗｘｙｚ','０１２３４５６７８９',
$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,
$.keypad.CLEAR + $.keypad.BS + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHZKN + $.keypad.SWITCHZUE];
//============================================================================================


//=======================   multi Keyboard Layout(全角)    ====================================
//漢字入力
var multiKanjiLayout = [
	'あかさたなはまやらわぁゃ' + $.keypad.CONVERT,
	'いきしちにひみゆりをぃゅ',
	'うくすつぬふむよるんぅょ' + $.keypad.PREVIOUS,
	'えけせてねへめ' +  $.keypad.SPACE+ 'れ' + $.keypad.ZENDAKUTEN  + 'ぇっ' + $.keypad.FOLLOWING,
	'おこそとのほもーろ' + $.keypad.ZENHANDAKUTEN + 'ぉ'+  $.keypad.SPACE + $.keypad.CONFIRM,
	$.keypad.CLEAR + $.keypad.BS + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHMTKN + $.keypad.SWITCHMTUE + $.keypad.SWITCHMTLE];

//全角カナ(全角カナ)
var multikanaLayout = [
	'アカサタナハマヤラワァャ',
	'イキシチニヒミユリヲィュ',
	'ウクスツヌフムヨルンゥョ',
	'エケセテネヘメ'  +  $.keypad.SPACE+ 'レ' + $.keypad.ZENDAKUTEN  + 'ェッ',
	'オコソトノホモーロ' + $.keypad.ZENHANDAKUTEN + 'ォ',
	$.keypad.HALF_SPACE,
	$.keypad.CLEAR + $.keypad.BS + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHMTKJ + $.keypad.SWITCHMTUE + $.keypad.SWITCHMTLE];

//大英語(全角)
var multiUpEngLayout = [
	'ＡＢＣＤＥＦＧＨＩＪ',
	'ＫＬＭＮＯＰＱＲＳＴ',
	'ＵＶＷＸＹＺ','０１２３４５６７８９',
	$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,
	$.keypad.CLEAR + $.keypad.BS + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHMTKJ + $.keypad.SWITCHMTKN + $.keypad.SWITCHMTLE];

//小英語(全角)
var multiLowEngLayout = [
	'ａｂｃｄｅｆｇｈｉｊ', 'ｋｌｍｎｏｐｑｒｓｔ', 'ｕｖｗｘｙｚ','０１２３４５６７８９',
	$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,$.keypad.SPACE,
	$.keypad.CLEAR + $.keypad.BS + $.keypad.LEFT+ $.keypad.RIGHT + $.keypad.SWITCHMTKJ + $.keypad.SWITCHMTKN + $.keypad.SWITCHMTUE];
//=======================================================================================


//=======================   modal Layout    ====================================

//金額入力用_mod
var modalkingakuLayout = [ $.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+'123' + $.keypad.MAN + $.keypad.CLEARMONEY, 
	$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+'456' + $.keypad.SEN,
	$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+'789'  + $.keypad.EN, 
	$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.ZERO + $.keypad.ZERO3 + $.keypad.CNFM];

//通番入力用_mod
var modaltsubanNoLayout = [ $.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+'123' + $.keypad.CLEAR, 
	$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+'456',
	$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+'789',
	$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+'0'];

//電話番号_mod
var modaltelLayout = [ $.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+'123'+ $.keypad.CLEAR, 
	$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+'456' + $.keypad.BS,
	$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+'789'/*+ $.keypad.LEFT+ $.keypad.RIGHT*/,
	$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+$.keypad.SPACE+'0-'];

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
		inst._input.focus();
		maxFlg=true;
		return;
    }
	
	val = val.substr(0, valLength-1);
	// 最初ＭＡＸ桁数になった時はいる（maxFlg　初期化の時trueにする必要がある）
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
		
		moveCursorSet(inst._input[0].id, cursorIndex);
		inst._input.focus();
		
	}else if(valLength >= maxlength){
//		val = value;
//		inst._input.val(val);
		
		moveCursorSet(inst._input[0].id, cursorIndex);
		inst._input.focus();
		
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
		
		moveCursorSet(inst._input[0].id, cursorIndex);
		inst._input.focus();
	}

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
	
	dakutenKeyControl();
}

function moveCursorMoto(key, value, inst) {
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
		inst._input.focus();
		maxFlg=true;
		return;
    }
	
	val = val.substr(0, valLength-1);
	// 最初ＭＡＸ桁数になった時はいる（maxFlg　初期化の時trueにする必要がある）
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
		
//	    $('input[type=text]').attr('readonly',true);
//		inst._input.focus();
//		$('input[type=text]').attr('readonly',false);
//		
		moveCursorSet(inst._input[0].id, cursorIndex);
//		inst._input.focus();
		
		
//	    $('input[type=text]').attr('readonly',true);
//		inst._input.focus();
//		$('input[type=text]').attr('readonly',false);
//		inst._input[0].selectionStart=cursorIndex;
//		inst._input[0].selectionEnd=cursorIndex;
		
	}else if(valLength >= maxlength){
//		val = value;
//		inst._input.val(val);
//		
//	    $('input[type=text]').attr('readonly',true);
//		inst._input.focus();
//		$('input[type=text]').attr('readonly',false);
//		
//		moveCursorSet(inst._input[0].id, cursorIndex);
//	    $('input[type=text]').attr('readonly',true);
//		inst._input.focus();
//		$('input[type=text]').attr('readonly',false);
//		inst._input[0].selectionStart=cursorIndex;
//		inst._input[0].selectionEnd=cursorIndex;
		
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
	    $('input[type=text]').attr('readonly',true);
		inst._input.focus();
		$('input[type=text]').attr('readonly',false);
		
//		inst._input.focus();
		moveCursorSet(inst._input[0].id, cursorIndex);
//		inst._input[0].selectionStart=cursorIndex;
//		inst._input[0].selectionEnd=cursorIndex;
	}

	

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
	$(".keypad-zero").removeClass("itemDisabled");
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
			manSenFlg = false;
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
	
	// 入力フィールドmaxlength
	var maxlength = $(targetTmp).attr('maxlength');

	// 入力フィールドの円をチェック
	enVal = amt.includes('円');
 
	// コンマ削除
	amt = amt.replace(/,/g, "");
	
	// 円がある場合 キーパッド非活性
	if (enVal == true) {
		// キーパッド非活性(半透明、クリック出来ない)
		keyPadDisabledByLength();// キー、万、千、０、０００
		// 円
		$(".keypad-en").addClass("itemDisabled");
		// 確定
		$(".keypad-cnfm").addClass("itemDisabled");
		
	} else {
		// キーの桁数による制御
		if (amt == "" || amt == null) {
			// 非活性(半透明、クリック出来ない)
			// 0
			// $(".keypad-special.keypad-zero").addClass("itemDisabled");
			// 000
			$(".keypad-special.keypad-zero3").addClass("itemDisabled");
			// 円
			$(".keypad-en").addClass("itemDisabled");
			// 確定
			$(".keypad-cnfm").addClass("itemDisabled");
		} else {
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
	}
  
  //maxlengthのコンマ区切り
  //10,987,654,321
  var commaNo = 0;
  var mansenOff = 0;
  if(maxlength <= 3){
	commaNo = 0;
  }else if(maxlength == 6){
	  commaNo = 1;
	  mansenOff = 1;
  }else if(maxlength == 7){
	  commaNo = 1;
	  mansenOff = 1;
  }else if(maxlength < 8){
	commaNo = 1;
  }else if(maxlength < 12){
	commaNo = 2;
  }else if(maxlength < 16){
	commaNo = 3;
  }
  //maxlengthがある場合、キー非活性
  /*if (maxlength != null) {*/
		if(amt.length == (maxlength-commaNo)-mansenOff && !manSenFlg){
			//キーパッド非活性(半透明、クリック出来ない)
			keyPadDisabledByLength();// キー、万、千、０、０００
		}else if(manSenCnt == 4 && senFlg){
			
		}else {
			//キーパッド活性
			keyPadAbledByLength();   //キー、万、千、一文字訂正
		}
		//0円の時、キーパッド非活性(半透明、クリック出来ない)
		if(amt == "0" || enVal == true){
			//キーパッド非活性(半透明、クリック出来ない)
			keyPadDisabledByLength();// キー、万、千、０、０００
		}
		
		if (amt.length > (maxlength-commaNo)-4 || maxlength <= 3 || senFlg) {
			// 000キー非活性(半透明、クリック出来ない)
			$(".keypad-special.keypad-zero3").addClass("itemDisabled");
		}
		if (amt.length > (maxlength-commaNo)-5 || maxlength <= 3 || manCnt>0 || senFlg) {
			//万　非活性(半透明、クリック出来ない)
			$(".keypad-man").addClass("itemDisabled");
		}
		if (amt.length > 1 && !senFlg || maxlength <= 3 || senFlg) {
			//千　非活性(半透明、クリック出来ない)
			$(".keypad-sen").addClass("itemDisabled");
		}
		if(manSenFlg){
			// 000キー非活性(半透明、クリック出来ない)
			$(".keypad-special.keypad-zero3").addClass("itemDisabled");
		}
		
	/*} else {

		// 数字桁数10まで99億(桁数数字１０桁まで入力可、コンマまで１３桁)->数字桁数11まで999億まで変更(桁数数字11桁まで入力可、コンマまで14桁)
		if (amt.length > 10 && !manSenFlg) {
			// キーパッド非活性(半透明、クリック出来ない)
			keyPadDisabledByLength();// キー、万、千、０、０００
		} else {
			// キーパッド活性
			keyPadAbledByLength(); // キー、万、千、一文字訂正
		}
		if (amt.length > 8 || senFlg) {
			// 000キー非活性(半透明、クリック出来ない)
			$(".keypad-special.keypad-zero3").addClass("itemDisabled");
		}
		if (amt.length > 7 || manCnt > 0 || senFlg) {
			// 万 非活性(半透明、クリック出来ない)
			$(".keypad-man").addClass("itemDisabled");
		}
		if (amt.length > 1 && !senFlg || senFlg) {
			// 千 非活性(半透明、クリック出来ない)
			$(".keypad-sen").addClass("itemDisabled");
		}
		if (manSenFlg) {
			// 000キー非活性(半透明、クリック出来ない)
			$(".keypad-special.keypad-zero3").addClass("itemDisabled");
		}
	}*/
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
	
	// 入力フィールドクリックした時の
	  var targetTmp = $("#keypadArea").keypad("option", "target");
	  var Targetval = $(targetTmp).val();
  
	// XX億0103 → for 4回　5，6，7,8 → 0確認削除0でないと止まり。4回削除したら万消す、
	// 4回なら億のindexから0確認　0なら千削除
	// 億のindexから3回0確認0確認削除0でないと止まり。
	// 0ではないと千のindexから3回0確認0確認削除0でないと止まり。
	if(allLength>0){
		//円の下保存
		var startInx = allLength-3 >0 ? allLength-3 : 0;
		var endInx = allLength-3 >0 ? 3 : allLength;
		var enStr = strMoney.substr(startInx, endInx);

		if(Targetval =="0"){
			p_money[0]=enStr;	//0 円の表示
		}else{
			enStr = removeZero(enStr);
			p_money[3]=enStr;
		}
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
	kanziMoney = kanziMoney + '円';
	return kanziMoney;
}

//条件によるターゲット変更
function changeTarget(target, flg){

	if(oldTargetId != target.id){
		// カーソル初期化（キーアウトレットが変わるとカーソル位置初期化）
		$("#keypadArea").keypad("option", "target", target);
		$("#keypadAreaOpe").keypad("option", "target", target);
		
		var maxlength = $(target).attr('maxlength');
		var val = $(target).val();
		
		cursorIndex = val.length;
		
		if(val.length != maxlength){
			maxFlg = true;
		}else{
			maxFlg = false;
		}
		if(flg){
			var targetSel = target.id;
			selectedLayout(targetSel);
		}

	}

	oldTargetId = target.id;
	dakutenKeyControl();
}

function selectedLayout(targetId){

	   var inx = targetId.indexOf("Layout")+6;
	   targetId = targetId.substr( 0, inx);
	    var selLayout;
	    
		var keypadInstant = $(".jqueryKeypad");
		
	    if(targetId == "kanjiLayout"){
			keypadInstant.keypad("option", "layout", kanjiLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }else if(targetId =="kingakuLayout"){
			keypadInstant.keypad("option", "layout", kingakuLayout);
			keypadInstant.keypad("option", "onKeypress", amountKeypad_OnKeypress);
	    }else if(targetId =="kanaAddrLayout"){
			keypadInstant.keypad("option", "layout", kanaAddrLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }else if(targetId =="tsubanNoLayout"){
			keypadInstant.keypad("option", "layout", tsubanNoLayout);
			keypadInstant.keypad("option", "onKeypress", onKeypressFocus);
	    }else if(targetId =="lowerEngLayout"){
			keypadInstant.keypad("option", "layout", lowerEngLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }else if(targetId =="upperEngLayout"){
			keypadInstant.keypad("option", "layout", upperEngLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }else if(targetId =="kanaEngLayout"){
			keypadInstant.keypad("option", "layout", kanaEngLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }
	    else if(targetId =="zenlowerEngLayout"){
			keypadInstant.keypad("option", "layout", zenlowerEngLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }else if(targetId =="zenupperEngLayout"){
			keypadInstant.keypad("option", "layout", zenupperEngLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }else if(targetId =="zenkanaEngLayout"){
			keypadInstant.keypad("option", "layout", zenkanaEngLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }
	    else if(targetId =="kanaNameLayout"){
			keypadInstant.keypad("option", "layout", kanaNameLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }else if(targetId =="branchKanaLayout"){
			keypadInstant.keypad("option", "layout", branchKanaLayout);
			keypadInstant.keypad("option", "onKeypress", "");
	    }else if(targetId =="branchLayout"){
			keypadInstant.keypad("option", "layout", branchLayout);
			keypadInstant.keypad("option", "onKeypress", onKeypressFocus);
	    }else if(targetId =="kozaNoLayout"){
			keypadInstant.keypad("option", "layout", kozaNoLayout);
			keypadInstant.keypad("option", "onKeypress", onKeypressFocus);
	    }else if(targetId =="postNoLayout"){
			keypadInstant.keypad("option", "layout", postNoLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }else if(targetId =="romajiNameLayout"){
			keypadInstant.keypad("option", "layout", romajiNameLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }else if(targetId =="telLayout"){
			keypadInstant.keypad("option", "layout", telLayout);
			keypadInstant.keypad("option", "onKeypress", onKeypressFocus);
	    }else if(targetId =="decimalNoLayout"){
			keypadInstant.keypad("option", "layout", decimalNoLayout);
			keypadInstant.keypad("option", "onKeypress", onKeypressDecimalFocus);
	    }else if(targetId =="passwdNoLayout"){
			keypadInstant.keypad("option", "layout", passwdNoLayout);
			keypadInstant.keypad("option", "onKeypress", onKeypressPassNoFocus);
	    }else if(targetId =="passwdNoRandomLayout"){
			keypadInstant.keypad("option", "layout", passwdNoRandomLayout);
			keypadInstant.keypad("option", "onKeypress", onKeypressPassNoFocus);
	    }
	    else if(targetId =="passwdNoLayoutError"){
			keypadInstant.keypad("option", "layout", passwdNoLayoutError);
			keypadInstant.keypad("option", "onKeypress", onKeypressPassNoFocus);
	    }else if(targetId =="passwdNoLayoutOpe"){
			keypadInstant.keypad("option", "layout", passwdNoLayoutOpe);
			keypadInstant.keypad("option", "onKeypress", onKeypressPassNoFocus);
	    }
	    else if(targetId =="modalkingakuLayout"){
			keypadInstant.keypad("option", "layout", modalkingakuLayout);
			keypadInstant.keypad("option", "onKeypress", amountKeypad_OnKeypress);
	    }else if(targetId =="modaltsubanNoLayout"){
			keypadInstant.keypad("option", "layout", modaltsubanNoLayout);
			keypadInstant.keypad("option", "onKeypress", onKeypressFocus);
	    }else if(targetId =="modaltelLayout"){
			keypadInstant.keypad("option", "layout", modaltelLayout);
			keypadInstant.keypad("option", "onKeypress", onKeypressFocus);
	    }
	    else if(targetId =="multiKanjiLayout"){
			keypadInstant.keypad("option", "layout", multiKanjiLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }else if(targetId =="multikanaLayout"){
			keypadInstant.keypad("option", "layout", multikanaLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }else if(targetId =="multiUpEngLayout"){
			keypadInstant.keypad("option", "layout", multiUpEngLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }else if(targetId =="multiLowEngLayout"){
			keypadInstant.keypad("option", "layout", multiLowEngLayout);
			keypadInstant.keypad("option", "onKeypress", moveCursor);
	    }
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

//小数点onKeypressでmoveCursorを使わない場合利用
function onKeypressDecimalFocus(key, value, inst) {
    $('input[type=text]').attr('readonly',true);
    inst._input.focus();
    $('input[type=text]').attr('readonly',false);
    decimalOff();
}


//暗証番号onKeypressでmoveCursorを使わない場合利用
function onKeypressPassNoFocus(key, value, inst) {
    $('input[type=text]').attr('readonly',true);
    inst._input.focus();
    $('input[type=text]').attr('readonly',false);
    
    var val = inst._input.val();
	var maxlength = inst._input.attr('maxlength');
	var valLength = val.length; // 押下したキーを含んだ長さ
	var tmpVal01;
	var tmpVal02;
	
	if(maxlength == 4) {
		if(val.length == 0){
			inst._input.val('○○○○');
		}
	} else if (maxlength == 6) {
		if (val.length == 0) {
			inst._input.val('○○○○○○');
		}
	}
	if(val.indexOf('○') != -1){
		tmpVal01 = val.replace('○', '●');
		
		inst._input.val(tmpVal01);
		
		if(inst._input[0].className.indexOf('PASSWD_NO_INPUT') > -1){
			var tmp = $('.PASSWD_NO').val();
			tmp = tmp + key;
			$('.PASSWD_NO').val(tmp);
		}else if(inst._input[0].className.indexOf('PASSWD_NO_CONF_INPUT') > -1){
			var tmp = $('.PASSWD_NO_CONF').val();
			tmp = tmp + key;
			$('.PASSWD_NO_CONF').val(tmp);
		}
		
		//ログインパスワード
		if(inst._input[0].className.indexOf('LOGON_PASSWD_INPUT') > -1){
			var tmp = $('.LOGON_PASSWD').val();
			tmp = tmp + key;
			$('.LOGON_PASSWD').val(tmp);
		}else if(inst._input[0].className.indexOf('LOGON_PASSWD_CONF_INPUT') > -1){
			var tmp = $('.LOGON_PASSWD_CONF').val();
			tmp = tmp + key;
			$('.LOGON_PASSWD_CONF').val(tmp);
		}
	}
	
	if(!lbm_Util_ItemIsNull(key)){
		key = key.replace(/\t/g,"");
	}

}

//全角濁点と半濁点キーボード制御
function dakutenKeyControl(){
    var markEnableKeyDakuten = [];
    var markEnableKeyHandakuten = [];
    var checkValue = "";
    var checkValueRear = "";
    
    layoutName = $("#keypadArea").keypad("option", "layout");
    
    if(lbm_Util_ItemIsNull(layoutName) == false){
        if(layoutName == kanjiLayout || layoutName == multiKanjiLayout){
        	//濁点
            markEnableKeyDakuten =  ["か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","は","ひ","ふ","へ","ほ","う"];
            markEnableKeyHandakuten = ["は","ひ","ふ","へ","ほ"];
        } else if(layoutName == kanaAddrLayout || layoutName == kanaNameLayout || kanaEngLayout ||layoutName == zenkanaEngLayout ||layoutName == multikanaLayout){
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

//小数点
function decimalOff(){
	
	// ターゲット取得
	var targetTmp = $("#keypadArea").keypad("option", "target");
	var tarVal = $(targetTmp).val();
	
	var maxlength = $(targetTmp).attr('maxlength');
	
	// 入力フィールドの(.)をチェック
	subtarVal = (".");
	decimalVal = tarVal.indexOf(subtarVal);
	
	//初値を0入力の場合キー非活性
	if (tarVal != "0" || tarVal == "" || tarVal == null) {
		$(".keypad-key").removeClass("itemDisabled");
	}else{
		$(".keypad-key").addClass("itemDisabled");
	}
	
	//(.)がある場合(.)非活性
	if (decimalVal >= 0 || tarVal == "" || tarVal == null){
		$(".keypad-decimal").addClass("itemDisabled");
	}else{
		$(".keypad-decimal").removeClass("itemDisabled");
	}
	
	//入力値とmaxlengthを比較
	if(tarVal.length == maxlength-1){
		$(".keypad-decimal").addClass("itemDisabled");
	}else if(tarVal.length == maxlength){
		$(".keypad-key").addClass("itemDisabled");
		$(".keypad-decimal").addClass("itemDisabled");
	}
}
