# min-iterator.js

[![Build Status]](https://travis-ci.org/mantoni/min-iterator.js)
[![SemVer]](http://semver.org)
[![License]](https://github.com/mantoni/min-iterator.js/blob/master/LICENSE)

Minimal iterator API for Node.js and the browser.

## Install with npm

```
npm install min-iterator
```

## Browser compatibility

To use this module in a browser, download the npm package and then use
[Browserify](http://browserify.org) to create a standalone version.

## Usage

This package provides the base iterator API with `each(fn)` and `toArray()`
implementations (see API). An actual iterator implementation is created by
inheriting from `Iterator` and implement `next()`:

```js
var inherits = require('inherits');
var Iterator = require('min-iterator');

function ArrayIterator (a) {
  this._a = a;
  this._i = 0;
}
inherits(ArrayIterator, Iterator);

ArrayIterator.prototype.next = function () {
  return this._i < this._a.length ? this._a[this._i++] : undefined;
};
```

Using the itererator with a while loop:

```js
while ((v = it.next()) !== undefined) {
  console.log(v);
}
```

Using the itererator with `each`:

```js
it.each(function (v) {
  console.log(v);
});
```

## Iterator API

- `next()`: Returns the next item. If there are no more items,
  `undefined` is returned. The default implementation always returns
  `undefined`.
- `each(fn, scope)`: Invokes the given function with each item returned by
  `next()` until `undefined` is returned. The scope object is optional.
- `toArray()`: Returns an array with all item returned by `next()`.

## License

MIT

[Build Status]: http://img.shields.io/travis/mantoni/min-iterator.js.svg
[SemVer]: http://img.shields.io/:semver-%E2%9C%93-brightgreen.svg
[License]: http://img.shields.io/npm/l/min-iterator.svg
