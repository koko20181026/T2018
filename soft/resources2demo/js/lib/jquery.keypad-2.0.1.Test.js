﻿/* http://keith-wood.name/keypad.html
   Keypad field entry extension for jQuery v2.0.1.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2008.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/LICENSE.txt) license. 
   Please attribute the author if you use it. */
(function($) {
     var k = 'keypad';
     var l = [ '  BSCECA', '_1_2_3_+@X', '_4_5_6_-@U', '_7_8_9_*@E', '_0_._=_/' ];
     $.JQPlugin
               .createPlugin({
                    name : k,
                    defaultOptions : {
                         showOn : 'focus',
                         buttonImage : '',
                         buttonImageOnly : false,
                         showAnim : 'show',
                         showOptions : null,
                         duration : 'normal',
                         appendText : '',
                         useThemeRoller : false,
                         keypadClass : '',
                         prompt : '',
                         layout : [],
                         separator : '',
                         target : null,
                         keypadOnly : true,
                         randomiseAlphabetic : false,
                         randomiseNumeric : false,
                         randomiseOther : false,
                         randomiseAll : false,
                         beforeShow : null,
                         onKeypress : null,
                         onClose : null
                    },
                    regionalOptions : {
                         '' : {
                              buttonText : '...',
                              buttonStatus : 'Open the keypad',
                              closeText : 'Close',
                              closeStatus : 'Close the keypad',
                              clearText : 'Clear',
                              clearStatus : 'Erase all the text',
                              backText : 'Back',
                              backStatus : 'Erase the previous character',
                              spacebarText : '&#160;',
                              spacebarStatus : 'Space',
                              enterText : 'Enter',
                              enterStatus : 'Carriage return',
                              tabText : '→',
                              tabStatus : 'Horizontal tab',
                              shiftText : 'Shift',
                              shiftStatus : 'Toggle upper/lower case characters',
                              alphabeticLayout : [],
                              fullLayout : [],
                              isAlphabetic : null,
                              isNumeric : null,
                              toUpper : null,
                              isRTL : false
                         }
                    },
                    _getters : [ 'isDisabled' ],
                    _curInst : null,
                    _disabledFields : [],
                    _keypadShowing : false,
                    _keyCode : 0,
                    _specialKeys : [],
                    _mainDivClass : k + '-popup',
                    _inlineClass : k + '-inline',
                    _appendClass : k + '-append',
                    _triggerClass : k + '-trigger',
                    _disableClass : k + '-disabled',
                    _inlineEntryClass : k + '-keyentry',
                    _rtlClass : k + '-rtl',
                    _rowClass : k + '-row',
                    _promptClass : k + '-prompt',
                    _specialClass : k + '-special',
                    _namePrefixClass : k + '-',
                    _keyClass : k + '-key',
                    _keyDownClass : k + '-key-down',
                    qwertyAlphabetic : [ 'qwertyuiop', 'asdfghjkl', 'zxcvbnm' ],
                    qwertyLayout : [
                              '!@#$%^&*()_=' + this.HALF_SPACE + this.SPACE
                                        + this.CLOSE,
                              this.HALF_SPACE + '`~[]{}<>\\|/' + this.SPACE + '789',
                              'qwertyuiop\'"' + this.HALF_SPACE + '456',
                              this.HALF_SPACE + 'asdfghjkl;:' + this.SPACE + '123',
                              this.SPACE + 'zxcvbnm,.?' + this.SPACE
                                        + this.HALF_SPACE + '-0+',
                              '' + this.TAB + this.ENTER + this.SPACE_BAR
                                        + this.SHIFT + this.HALF_SPACE + this.BACK
                                        + this.CLEAR ],
                    addKeyDef : function(a, b, c, d) {
                         if (this._keyCode == 32) {
                              throw 'Only 32 special keys allowed';
                         }
                         this[a] = String.fromCharCode(this._keyCode++);
                         this._specialKeys.push({
                              code : this[a],
                              id : a,
                              name : b,
                              action : c,
                              noHighlight : d
                         });
                         return this
                    },
                    _init : function() {
                         this.mainDiv = $('<div class="' + this._mainDivClass
                                   + '" style="display: none;"></div>');
                         this._super()
                    },
                    _instSettings : function(a, b) {
                         var c = !a[0].nodeName.toLowerCase()
                                   .match(/input|textarea/);
                         return {
                              _inline : c,
                              ucase : false,
                              _mainDiv : (c ? $('<div class="' + this._inlineClass
                                        + '"></div>') : m.mainDiv)
                         }
                    },
                    _postAttach : function(a, b) {
                         if (b._inline) {
                              a.append(b._mainDiv).on('click.' + b.name, function() {
                                   b._input.focus()
                              });
                              this._updateKeypad(b)
                         } else if (a.is(':disabled')) {
                              this.disable(a)
                         }
                    },
                    _setInput : function(a, b) {
                         b._input = $(!b._inline ? a : b.options.target
                                   || '<input type="text" class="'
                                   + this._inlineEntryClass + '" disabled/>');
                         if (b._inline) {
                              a.find('input').remove();
                              if (!b.options.target) {
                                   a.append(b._input)
                              }
                         }
                    },
                    _optionsChanged : function(d, e, f) {
                         $.extend(e.options, f);
                         d.off('.' + e.name).siblings('.' + this._appendClass)
                                   .remove().end().siblings('.' + this._triggerClass)
                                   .remove();
                         var g = e.options.appendText;
                         if (g) {
                              d[e.options.isRTL ? 'before' : 'after']('<span class="'
                                        + this._appendClass + '">' + g + '</span>')
                         }
                         if (!e._inline) {
                              if (e.options.showOn == 'focus'
                                        || e.options.showOn == 'both') {
                                   d.on('focus.' + e.name, this.show).on(
                                             'keydown.' + e.name, this._doKeyDown)
                              }
                              if (e.options.showOn == 'button'
                                        || e.options.showOn == 'both') {
                                   var h = e.options.buttonStatus;
                                   var i = e.options.buttonImage;
                                   var j = $(e.options.buttonImageOnly ? $('<img src="'
                                             + i
                                             + '" alt="'
                                             + h
                                             + '" title="'
                                             + h
                                             + '"/>')
                                             : $(
                                                       '<button type="button" title="' + h
                                                                 + '"></button>').html(
                                                       i == '' ? e.options.buttonText
                                                                 : $('<img src="' + i
                                                                           + '" alt="' + h
                                                                           + '" title="' + h
                                                                           + '"/>')));
                                   d[e.options.isRTL ? 'before' : 'after'](j);
                                   j.addClass(this._triggerClass).click(function() {
                                        if (m._keypadShowing && m._lastField == d[0]) {
                                             m.hide()
                                        } else {
                                             m.show(d[0])
                                        }
                                        return false
                                   })
                              }
                         }
                         e.saveReadonly = d.attr('readonly');
                         d[e.options.keypadOnly ? 'attr' : 'removeAttr']('readonly',
                                   true).on('setData.' + e.name, function(a, b, c) {
                              e.options[b] = c
                         }).on('getData.' + e.name, function(a, b) {
                              return e.options[b]
                         });
                         this._setInput(d, e);
                         this._updateKeypad(e)
                    },
                    _preDestroy : function(a, b) {
                         if (this._curInst == b) {
                              this.hide()
                         }
                         a.siblings('.' + this._appendClass).remove().end()
                                   .siblings('.' + this._triggerClass).remove().end()
                                   .prev('.' + this._inlineEntryClass).remove();
                         a.empty().off('.' + b.name)[b.saveReadonly ? 'attr'
                                   : 'removeAttr']('readonly', true);
                         b._input.removeData(b.name)
                    },
                    enable : function(b) {
                         b = $(b);
                         if (!b.hasClass(this._getMarker())) {
                              return
                         }
                         var c = b[0].nodeName.toLowerCase();
                         if (c.match(/input|textarea/)) {
                              b.prop('disabled', false).siblings(
                                        'button.' + this._triggerClass).prop(
                                        'disabled', false).end().siblings(
                                        'img.' + this._triggerClass).css({
                                   opacity : '1.0',
                                   cursor : ''
                              })
                         } else if (c.match(/div|span/)) {
                              b.children('.' + this._disableClass).remove();
                              this._getInst(b)._mainDiv.find('button').prop(
                                        'disabled', false)
                         }
                         this._disabledFields = $.map(this._disabledFields,
                                   function(a) {
                                        return (a == b[0] ? null : a)
                                   })
                    },
                    disable : function(b) {
                         b = $(b);
                         if (!b.hasClass(this._getMarker())) {
                              return
                         }
                         var c = b[0].nodeName.toLowerCase();
                         if (c.match(/input|textarea/)) {
                              b.prop('disabled', true).siblings(
                                        'button.' + this._triggerClass).prop(
                                        'disabled', true).end().siblings(
                                        'img.' + this._triggerClass).css({
                                   opacity : '0.5',
                                   cursor : 'default'
                              })
                         } else if (c.match(/div|span/)) {
                              var d = b.children('.' + this._inlineClass);
                              var e = d.offset();
                              var f = {
                                   left : 0,
                                   top : 0
                              };
                              d.parents().each(function() {
                                   if ($(this).css('position') == 'relative') {
                                        f = $(this).offset();
                                        return false
                                   }
                              });
                              b
                                        .prepend('<div class="' + this._disableClass
                                                  + '" style="width: ' + d.outerWidth()
                                                  + 'px; height: ' + d.outerHeight()
                                                  + 'px; left: ' + (e.left - f.left)
                                                  + 'px; top: ' + (e.top - f.top)
                                                  + 'px;"></div>');
                              this._getInst(b)._mainDiv.find('button').prop(
                                        'disabled', true)
                         }
                         this._disabledFields = $.map(this._disabledFields,
                                   function(a) {
                                        return (a == b[0] ? null : a)
                                   });
                         this._disabledFields[this._disabledFields.length] = b[0]
                    },
                    isDisabled : function(a) {
                         return (a && $.inArray(a, this._disabledFields) > -1)
                    },
                    show : function(a) {
                         a = a.target || a;
                         if (m.isDisabled(a) || m._lastField == a) {
                              return
                         }
                         var b = m._getInst(a);
                         m.hide(null, '');
                         m._lastField = a;
                         m._pos = m._findPos(a);
                         m._pos[1] += a.offsetHeight;
                         var c = false;
                         $(a).parents().each(function() {
                              c |= $(this).css('position') == 'fixed';
                              return !c
                         });
                         var d = {
                              left : m._pos[0],
                              top : m._pos[1]
                         };
                         m._pos = null;
                         b._mainDiv.css({
                              position : 'absolute',
                              display : 'block',
                              top : '-1000px',
                              width : 'auto'
                         });
                         m._updateKeypad(b);
                         d = m._checkOffset(b, d, c);
                         b._mainDiv.css({
                              position : (c ? 'fixed' : 'absolute'),
                              display : 'none',
                              left : d.left + 'px',
                              top : d.top + 'px'
                         });
                         var e = b.options.duration;
                         var f = b.options.showAnim;
                         var g = function() {
                              m._keypadShowing = true
                         };
                         if ($.effects
                                   && ($.effects[f] || ($.effects.effect && $.effects.effect[f]))) {
                              var h = b._mainDiv.data();
                              for ( var i in h) {
                                   if (i.match(/^ec\.storage\./)) {
                                        h[i] = b._mainDiv.css(i.replace(
                                                  /ec\.storage\./, ''))
                                   }
                              }
                              b._mainDiv.data(h).show(f, b.options.showOptions || {},
                                        e, g)
                         } else {
                              b._mainDiv[f || 'show']((f ? e : 0), g)
                         }
                         if (b._input[0].type != 'hidden') {
                              b._input[0].focus()
                         }
                         m._curInst = b
                    },
                    _updateKeypad : function(a) {
                         var b = this._getBorders(a._mainDiv);
                         a._mainDiv
                                   .empty()
                                   .append(this._generateHTML(a))
                                   .removeClass()
                                   .addClass(
                                             a.options.keypadClass
                                                       + (a.options.useThemeRoller ? ' ui-widget ui-widget-content'
                                                                 : '')
                                                       + (a.options.isRTL ? ' '
                                                                 + this._rtlClass : '')
                                                       + ' '
                                                       + (a._inline ? this._inlineClass
                                                                 : this._mainDivClass));
                         if ($.isFunction(a.options.beforeShow)) {
                              a.options.beforeShow.apply((a._input ? a._input[0]
                                        : null), [ a._mainDiv, a ])
                         }
                    },
                    _getBorders : function(b) {
                         var c = function(a) {
                              return {
                                   thin : 1,
                                   medium : 3,
                                   thick : 5
                              }[a] || a
                         };
                         return [ parseFloat(c(b.css('border-left-width'))),
                                   parseFloat(c(b.css('border-top-width'))) ]
                    },
                    _checkOffset : function(a, b, c) {
                         var d = a._input ? this._findPos(a._input[0]) : null;
                         var e = window.innerWidth
                                   || document.documentElement.clientWidth;
                         var f = window.innerHeight
                                   || document.documentElement.clientHeight;
                         var g = document.documentElement.scrollLeft
                                   || document.body.scrollLeft;
                         var h = document.documentElement.scrollTop
                                   || document.body.scrollTop;
                         var i = 0;
                         a._mainDiv.find(':not(div)').each(
                                   function() {
                                        i = Math.max(i, this.offsetLeft
                                                  + $(this).outerWidth(true))
                                   });
                         a._mainDiv.css('width', i + 1);
                         if (a.options.isRTL
                                   || (b.left + a._mainDiv.outerWidth() - g) > e) {
                              b.left = Math.max((c ? 0 : g), d[0]
                                        + (a._input ? a._input.outerWidth() : 0)
                                        - (c ? g : 0) - a._mainDiv.outerWidth())
                         } else {
                              b.left = Math.max((c ? 0 : g), b.left - (c ? g : 0))
                         }
                         if ((b.top + a._mainDiv.outerHeight() - h) > f) {
                              b.top = Math.max((c ? 0 : h), d[1] - (c ? h : 0)
                                        - a._mainDiv.outerHeight())
                         } else {
                              b.top = Math.max((c ? 0 : h), b.top - (c ? h : 0))
                         }
                         return b
                    },
                    _findPos : function(a) {
                         while (a && (a.type == 'hidden' || a.nodeType != 1)) {
                              a = a.nextSibling
                         }
                         var b = $(a).offset();
                         return [ b.left, b.top ]
                    },
                    hide : function(a, b) {
                         var c = this._curInst;
                         if (!c || (a && c != $.data(a, this.name))) {
                              return
                         }
                         if (this._keypadShowing) {
                              b = (b != null ? b : c.options.duration);
                              var d = c.options.showAnim;
                              if ($.effects
                                        && ($.effects[d] || ($.effects.effect && $.effects.effect[d]))) {
                                   c._mainDiv.hide(d, c.options.showOptions || {}, b)
                              } else {
                                   c._mainDiv[(d == 'slideDown' ? 'slideUp'
                                             : (d == 'fadeIn' ? 'fadeOut' : 'hide'))]
                                             (d ? b : 0)
                              }
                         }
                         if ($.isFunction(c.options.onClose)) {
                              c.options.onClose.apply(
                                        (c._input ? c._input[0] : null), [
                                                  c._input.val(), c ])
                         }
                         if (this._keypadShowing) {
                              this._keypadShowing = false;
                              this._lastField = null
                         }
                         if (c._inline) {
                              c._input.val('')
                         }
                         this._curInst = null
                    },
                    _doKeyDown : function(a) {
                         if (a.keyCode == 9) {
                              m.mainDiv.stop(true, true);
                              m.hide()
                         }
                    },
                    _checkExternalClick : function(a) {
                         if (!m._curInst) {
                              return
                         }
                         var b = $(a.target);
                         if (b.closest('.' + m._mainDivClass).length === 0
                                   && !b.hasClass(m._getMarker())
                                   && b.closest('.' + m._triggerClass).length === 0
                                   && m._keypadShowing) {
                              m.hide()
                         }
                    },
                    _shiftKeypad : function(a) {
                         a.ucase = !a.ucase;
                         this._updateKeypad(a);
                         a._input.focus()
                    },
                    _clearValue : function(a) {
                         this._setValue(a, '', 0);
                         this._notifyKeypress(a, m.DEL)
                    },
                    _backValue : function(a) {
                         var b = a._input[0];
                         var c = a._input.val();
                         var d = [ c.length, c.length ];
                         d = (a._input.prop('readonly') || a._input.prop('disabled') ? d
                                   : (b.setSelectionRange ? [ b.selectionStart,
                                             b.selectionEnd ]
                                             : (b.createTextRange ? this._getIERange(b)
                                                       : d)));
                         this._setValue(a, (c.length == 0 ? '' : c.substr(0,
                                   d[0] - 1)
                                   + c.substr(d[1])), d[0] - 1);
                         this._notifyKeypress(a, m.BS)
                    },
                    _selectValue : function(a, b) {
                         this.insertValue(a._input[0], b);
                         this._setValue(a, a._input.val());
                         this._notifyKeypress(a, b)
                    },
                    insertValue : function(a, b) {
                         a = (a.jquery ? a : $(a));
                         var c = a[0];
                         var d = a.val();
                         var e = [ d.length, d.length ];
                         e = (a.attr('readonly') || a.attr('disabled') ? e
                                   : (c.setSelectionRange ? [ c.selectionStart,
                                             c.selectionEnd ]
                                             : (c.createTextRange ? this._getIERange(c)
                                                       : e)));
                         a.val(d.substr(0, e[0]) + b + d.substr(e[1]));
                         pos = e[0] + b.length;
                         if (a.is(':visible')) {
                              a.focus()
                         }
                         if (c.setSelectionRange) {
                              if (a.is(':visible')) {
                                   c.setSelectionRange(pos, pos)
                              }
                         } else if (c.createTextRange) {
                              e = c.createTextRange();
                              e.move('character', pos);
                              e.select()
                         }
                    },
                    _getIERange : function(e) {
                         e.focus();
                         var f = document.selection.createRange().duplicate();
                         var g = this._getIETextRange(e);
                         g.setEndPoint('EndToStart', f);
                         var h = function(a) {
                              var b = a.text;
                              var c = b;
                              var d = false;
                              while (true) {
                                   if (a.compareEndPoints('StartToEnd', a) == 0) {
                                        break
                                   } else {
                                        a.moveEnd('character', -1);
                                        if (a.text == b) {
                                             c += '\r\n'
                                        } else {
                                             break
                                        }
                                   }
                              }
                              return c
                         };
                         var i = h(g);
                         var j = h(f);
                         return [ i.length, i.length + j.length ]
                    },
                    _getIETextRange : function(a) {
                         var b = (a.nodeName.toLowerCase() == 'input');
                         var c = (b ? a.createTextRange() : document.body
                                   .createTextRange());
                         if (!b) {
                              c.moveToElementText(a)
                         }
                         return c
                    },
                    _setValue : function(a, b) {
                         var c = a._input.attr('maxlength');
                         if (c > -1) {
                              b = b.substr(0, c)
                         }
                         a._input.val(b);
                         if (!$.isFunction(a.options.onKeypress)) {
                              a._input.trigger('change')
                         }
                    },
                    _notifyKeypress : function(a, b) {
                         if ($.isFunction(a.options.onKeypress)) {
                              a.options.onKeypress.apply((a._input ? a._input[0]
                                        : null), [ b, a._input.val(), a ])
                         }
                    },
                    _generateHTML : function(b) {
                         var c = (!b.options.prompt ? ''
                                   : '<div class="'
                                             + this._promptClass
                                             + (b.options.useThemeRoller ? ' ui-widget-header ui-corner-all'
                                                       : '') + '">' + b.options.prompt
                                             + '</div>');
                         var d = this._randomiseLayout(b);
                         for (var i = 0; i < d.length; i++) {
                              c += '<div class="' + this._rowClass + '">';
                              var e = d[i].split(b.options.separator);
                              for (var j = 0; j < e.length; j++) {
                                   if (b.ucase) {
                                        e[j] = b.options.toUpper(e[j])
                                   }
                                   var f = this._specialKeys[e[j].charCodeAt(0)];
                                   if (f) {
                                        c += (f.action ? '<button type="button" class="'
                                                  + this._specialClass
                                                  + ' '
                                                  + this._namePrefixClass
                                                  + f.name
                                                  + (b.options.useThemeRoller ? ' ui-corner-all ui-state-default'
                                                            + (f.noHighlight ? ''
                                                                      : ' ui-state-highlight')
                                                            : '')
                                                  + '" title="'
                                                  + b.options[f.name + 'Status']
                                                  + '">'
                                                  + (b.options[f.name + 'Text'] || '&#160;')
                                                  + '</button>'
                                                  : '<div class="'
                                                            + this._namePrefixClass
                                                            + f.name + '"></div>')
                                   } else {
                                        c += '<button type="button" class="'
                                                  + this._keyClass
                                                  + (b.options.useThemeRoller ? ' ui-corner-all ui-state-default'
                                                            : '') + '">'
                                                  + (e[j] == ' ' ? '&#160;' : e[j])
                                                  + '</button>'
                                   }
                              }
                              c += '</div>'
                         }
                         c = $(c);
                         var g = b;
                         var h = this._keyDownClass
                                   + (b.options.useThemeRoller ? ' ui-state-active'
                                             : '');
                    //     c.find('button').mousedown(function() {
                         c.find('button').on('click',function() {
                              $(this).addClass(h)
                   //      }).mouseup(function() {
                         }).on('click',function() {
                              $(this).removeClass(h)
//                         }).mouseout(function() {
                         }).on('click',function() {
                              $(this).removeClass(h)
                         }).filter('.' + this._keyClass).click(function() {
                              m._selectValue(g, $(this).text())
                         });
                         $.each(this._specialKeys, function(i, a) {
                              c.find('.' + m._namePrefixClass + a.name).click(
                                        function() {
                                             a.action.apply(g._input, [ g ])
                                        })
                         });
                         return c
                    },
                    _randomiseLayout : function(b) {
                         if (!b.options.randomiseNumeric
                                   && !b.options.randomiseAlphabetic
                                   && !b.options.randomiseOther
                                   && !b.options.randomiseAll) {
                              return b.options.layout
                         }
                         var c = [];
                         var d = [];
                         var e = [];
                         var f = [];
                         for (var i = 0; i < b.options.layout.length; i++) {
                              f[i] = '';
                              var g = b.options.layout[i].split(b.options.separator);
                              for (var j = 0; j < g.length; j++) {
                                   if (this._isControl(g[j])) {
                                        continue
                                   }
                                   if (b.options.randomiseAll) {
                                        e.push(g[j])
                                   } else if (b.options.isNumeric(g[j])) {
                                        c.push(g[j])
                                   } else if (b.options.isAlphabetic(g[j])) {
                                        d.push(g[j])
                                   } else {
                                        e.push(g[j])
                                   }
                              }
                         }
                         if (b.options.randomiseNumeric) {
                              this._shuffle(c)
                         }
                         if (b.options.randomiseAlphabetic) {
                              this._shuffle(d)
                         }
                         if (b.options.randomiseOther || b.options.randomiseAll) {
                              this._shuffle(e)
                         }
                         var n = 0;
                         var a = 0;
                         var o = 0;
                         for (var i = 0; i < b.options.layout.length; i++) {
                              var g = b.options.layout[i].split(b.options.separator);
                              for (var j = 0; j < g.length; j++) {
                                   f[i] += (this._isControl(g[j]) ? g[j]
                                             : (b.options.randomiseAll ? e[o++]
                                                       : (b.options.isNumeric(g[j]) ? c[n++]
                                                                 : (b.options
                                                                           .isAlphabetic(g[j]) ? d[a++]
                                                                           : e[o++]))))
                                             + b.options.separator
                              }
                         }
                         return f
                    },
                    _isControl : function(a) {
                         return a < ' '
                    },
                    isAlphabetic : function(a) {
                         return (a >= 'A' && a <= 'Z') || (a >= 'a' && a <= 'z')
                    },
                    isNumeric : function(a) {
                         return (a >= '0' && a <= '9')
                    },
                    toUpper : function(a) {
                         return a.toUpperCase()
                    },
                    _shuffle : function(a) {
                         for (var i = a.length - 1; i > 0; i--) {
                              var j = Math.floor(Math.random() * a.length);
                              var b = a[i];
                              a[i] = a[j];
                              a[j] = b
                         }
                    }
               });
     var m = $.keypad;
     m.addKeyDef('CLOSE', 'close', function(a) {
          m._curInst = (a._inline ? a : m._curInst);
          m.hide()
     });
     m.addKeyDef('CLEAR', 'clear', function(a) {
          m._clearValue(a)
     });
     m.addKeyDef('BACK', 'back', function(a) {
          m._backValue(a)
     });
     m.addKeyDef('SHIFT', 'shift', function(a) {
          m._shiftKeypad(a)
     });
     m.addKeyDef('SPACE_BAR', 'spacebar', function(a) {
          m._selectValue(a, ' ')
     }, true);
     m.addKeyDef('SPACE', 'space');
     m.addKeyDef('HALF_SPACE', 'half-space');
     m.addKeyDef('ENTER', 'enter', function(a) {
          m._selectValue(a, '\x0D')
     }, true);
     m.addKeyDef('TAB', 'tab', function(a) {
          m._selectValue(a, '\x09')
     }, true);
     m.numericLayout = [ '123' + m.CLOSE, '456' + m.CLEAR, '789' + m.BACK,
               m.SPACE + '0' ];
     m.qwertyLayout = [
               '!@#$%^&*()_=' + m.HALF_SPACE + m.SPACE + m.CLOSE,
               m.HALF_SPACE + '`~[]{}<>\\|/' + m.SPACE + '789',
               'qwertyuiop\'"' + m.HALF_SPACE + '456',
               m.HALF_SPACE + 'asdfghjkl;:' + m.SPACE + '123',
               m.SPACE + 'zxcvbnm,.?' + m.SPACE + m.HALF_SPACE + '-0+',
               '' + m.TAB + m.ENTER + m.SPACE_BAR + m.SHIFT + m.HALF_SPACE
                         + m.BACK + m.CLEAR ], $.extend(m.regionalOptions[''], {
          alphabeticLayout : m.qwertyAlphabetic,
          fullLayout : m.qwertyLayout,
          isAlphabetic : m.isAlphabetic,
          isNumeric : m.isNumeric,
          toUpper : m.toUpper
     });
     m.setDefaults($.extend({
          layout : m.numericLayout
     }, m.regionalOptions['']));
     $(function() {
          $(document.body).append(m.mainDiv).on('mousedown.' + k,
                    m._checkExternalClick)
     })
})(jQuery);