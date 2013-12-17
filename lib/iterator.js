/*
 * min-iterator.js
 *
 * Copyright (c) 2013 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

function Iterator() {
  return this;
}

Iterator.prototype = {

  /*
   * Returns the next item. If there are no more items, undefined is
   * returned. The default implementation always returns undefined.
   */
  next: function () {
    return;
  },

  /*
   * Invokes the given function with each item returned by next() until
   * undefined is returned. The scope object is optional.
   */
  each: function (fn, scope) {
    if (typeof fn !== 'function') {
      throw new Error('function expected');
    }
    var v;
    while ((v = this.next()) !== undefined) {
      fn.call(scope, v);
    }
  },

  /*
   * Returns an array with all item returned by next().
   */
  toArray: function () {
    var a = [];
    this.each(Array.prototype.push, a);
    return a;
  }

};

module.exports = Iterator;
