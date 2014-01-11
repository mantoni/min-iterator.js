/*
 * min-iterator.js
 *
 * Copyright (c) 2013 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
/*globals describe, it*/
'use strict';

var assert = require('assert');

var Iterator = require('../lib/iterator');


describe('iterator.next', function () {

  it('always return undefined', function () {
    var i = new Iterator();

    assert.strictEqual(i.next(), undefined);
    assert.strictEqual(i.next(), undefined);
  });

});


function next(arr) {
  var i = 0, l = arr.length;
  return function () {
    return i < l ? arr[i++] : undefined;
  };
}

function collect() {
  var f = function (v) {
    f.results.push(v);
  };
  f.results = [];
  return f;
}

describe('iterator.each', function () {

  it('throw if given argument is not a function', function () {
    var i = new Iterator();

    assert.throws(function () {
      i.each({});
    }, Error);
  });

  it('never invokes function if next returns undefined', function () {
    var i = new Iterator();
    var c = collect();

    i.each(c);

    assert.deepEqual(c.results, []);
  });

  it('invokes function with each value returned by next', function () {
    var i = new Iterator();
    i.next = next(['a', null, false, 42, 0]);
    var c = collect();

    i.each(c);

    assert.deepEqual(c.results, ['a', null, false, 42, 0]);
  });

  it('uses the second argument as the scope', function () {
    var i = new Iterator();
    i.next = next([0]);
    var s = {};
    var t;

    i.each(function () {
      t = this;
    }, s);

    assert.strictEqual(t, s);
  });

});


describe('iterator.toArray', function () {

  it('returns empty array by default', function () {
    var i = new Iterator();

    assert.deepEqual([], i.toArray());
  });

  it('returns all items returned by next', function () {
    var i = new Iterator();
    i.next = next(['a', null, false, 42, 0]);

    var a = i.toArray();

    assert.deepEqual(a, ['a', null, false, 42, 0]);
  });

});
