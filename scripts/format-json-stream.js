#!/usr/bin/env node

'use strict';

// TODO: separate module
var through = require('through');

var formatStream = module.exports = function (sin) {
  var data = '';
  return sin.pipe(through(ondata, onend));

  function ondata(d) {
    data += d;
  }

  function onend() {
    try {
      var json = JSON.parse(data);
      this.queue(JSON.stringify(json, null, 2));
    } catch (e) {
      this.queue(e);
    }
    this.emit('end');
  }

};

if (!module.parent) 
  return formatStream(process.stdin).pipe(process.stdout);
