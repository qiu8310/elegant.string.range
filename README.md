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


## TODO

* 支持 replace 后的数据恢复
* replace 之后要更新每个 range 的 start 和 end
* 添加 range 时可能抛出 range out content Error
* 支持遍历 range 之外的数据
* replace(fn) 中的 fn 的 this 对应总是当前 range，并且 range 中还有 text 属性