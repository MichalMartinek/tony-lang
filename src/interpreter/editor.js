import CodeMirror from 'codemirror'


var keywords = ["do", "times", "while", "end", "if", "else", "function", "return"];
var keywords2 = ["move", "turn"];
function arrayContains(needle, arrhaystack) {
  var lower = needle.toLowerCase();
  return (arrhaystack.indexOf(lower) > -1);
}

function isNormalInteger(str) {
  var n = Math.floor(Number(str));
  return String(n) === str;
}

  CodeMirror.defineMode("simplemode", function() {
  
    return {
      token: function(stream, state) {
        stream.eatWhile(/\w/);
      
        if (arrayContains(stream.current(), keywords)) {
          return "keyword";
        }
        else if (arrayContains(stream.current(), keywords2)) {
          return "atom";
        }
        else if (isNormalInteger(stream.current()))
          return "number"
        
        stream.next();
      }
    };
  
  });
CodeMirror.defineMIME("text/simple", "simple");

