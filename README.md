# elegant.string.range

> Range string and then replace the ranges with new string

```
var str = 'abc-def';
var rc = new RangedContent(str);

rc.add(0, 3, 'abc');
rc.add(4, 7, 'def');

console.log(rc.replace(function(data) {
  return data[0] + data[0] + data[0];
}));

// output: aaa-ddd

```

## Install

### bower

`bower install elegant.string.range --save`


### node

`npm install elegant.string.range --save`