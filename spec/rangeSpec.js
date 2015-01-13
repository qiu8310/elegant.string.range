/* global describe, it, xit, xdescribe, expect, require */

var RangedContent = require('../index.js'),
  Range = RangedContent.Range,
  RangeOverlapError = RangedContent.RangeOverlapError;


describe('RangedContent', function() {

  var replacer = function(word) {
    return '_';
  };

  it('should return empty string when input is empty', function() {
    var str = '';
    var rc = new RangedContent(str);
    var rtn = rc.replace(replacer);
    expect(rtn).toBe(str);
  });


  it('should return original string when no range added', function() {
    var str = 'ab-de';
    var rc = new RangedContent(str);
    var rtn = rc.replace(replacer);
    expect(rtn).toBe(str);
  });


  it('should return the replacer returns when the whole content is just one range', function() {
    var s = 'you';
    var rc = new RangedContent(s);
    rc.addRange(0, s.length, s);

    var rtn = rc.replace(replacer);

    expect(rtn).toBe('_');
  });


  it('should support two ranges in content', function() {
    var s = 'c-ab-cd-c';
    var rc = new RangedContent(s);
    rc.addRange(2, 4, 'ab');
    rc.addRange(5, 7, 'cd');
    var rtn = rc.replace(replacer);
    expect(rtn).toBe('c-_-_-c');
  });


  it('should support random add range in content', function() {
    var str = 'a-b-c-d-e-f-h-i-j!@$';
    var expectStr = 'aa-bb-cc-dd-ee-ff-hh-ii-jj!@$';
    var rep = function(w) { return w + w; };
    var random = function() { return Math.round(Math.random()*Math.random()*1000) % 2; };


    var test = function() {
      var list = [], rc = new RangedContent(str);
      str.replace(/[a-z]/g, function(w, index) {
        if (random()) {
          list.push([index, w.length + index, w]);
        } else {
          list.unshift([index, w.length + index, w]);
        }
      });
      list.forEach(function(it) {
        rc.addRange(it[0], it[1], it[2]);
      });
      expect(rc.replace(rep)).toBe(expectStr);
    };

    test();
    test();
    test();
    test();
    test();

  });

  it('should throws RangeOverlapError when two range is overlap', function() {

    var rc = new RangedContent('ab-cd-ef');
    rc.addRange(2, 6);
    expect(function() { rc.addRange(1, 3); }).toThrow();
    expect(function() { rc.addRange(3, 5); }).toThrow();
    expect(function() { rc.addRange(5, 7); }).toThrow();

  });

  it('should throws Error when range start large then end', function() {
    var rc = new RangedContent('abc');
    expect(function() { rc.addRange(3, 2); }).toThrow();
  });

});