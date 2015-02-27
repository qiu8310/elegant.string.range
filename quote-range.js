var at,     // 当前字符在 text 中的索引
  ch,     // 当前字符
  escapee = {
    '"':  '"',
    '\'': '\'',
    '\\': '\\',
    '/':  '/',
    b:    '\b',
    f:    '\f',
    n:    '\n',
    r:    '\r',
    t:    '\t'
  },
  text, // 要处理的文本

  sq = '\'', // single quote
  dq = '"',  // double quote
  cq = null, // 当前的 quote
  quotes = [sq, dq], // 所有支持的引号

  result,// 结果数组，里面是一个个的对象，如 {index: 2, end: 5, str: 'xxx'}


  next = function (c) {
    ch = text.charAt(at);
    at += 1;
    return ch;
  },

  // unicode 没有解析成功就返回空字符串
  unicode = function() {
    var i, hex, uf = 0;
    if (ch === 'u') {
      for(i = 0; i < 4; i += 1) {
        hex = parseInt(next(), 16);
        if (!isFinite(hex)) {
          break;
        }
        uf = uf * 16 + hex;
      }
      return String.fromCharCode(uf);
    }
    return ''; // 如果用了 \u 开头后面没有接四个十六进制的数据编译就会出错，所以把这个非unicode字符忽略掉
  },

  pair = function () {
    var str = '', hex, i, uffff;
    if (~quotes.indexOf(ch)) {
      cq = ch;
      while(next()) {
        if (ch === cq) {
          cq = null;
          return {start: at - str.length - 2, end: at, str: str};
        }
        if (ch === '\\') {
          next();
          if (ch === 'u') {
            str += unicode();
          } else if (typeof escapee[ch] === 'string') {
            str += escapee[ch];
          } else {
            break;
          }
        } else {
          str += ch;
        }
      }
    }
    return false;
  };


//  single    只支持单引号，所有双引号当普通字符
//  double    只支持双引号，所有单引号当普通字符
//  duplex    支持两种引号，同时单引号中可以嵌入双引号，并且双引号中可以嵌入单引号(default)
function quote(content, mode) {
  at = 0;
  text = content;
  result = [];

  quotes = mode === 'single' ? [sq] : mode === 'double' ? [dq] : quotes;
  while(next()) {
    if (~quotes.indexOf(ch)) {
      var rtn = pair();
      if (rtn) {
        result.push(rtn);
      }
    }
  }
  return result;
}