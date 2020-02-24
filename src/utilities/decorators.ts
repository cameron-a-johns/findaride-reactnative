import React from 'react';

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;

function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null) {
    result = [];
  }
  return result;
}

const log = (target, name, descriptor) => {
  const original = descriptor.value;

  if (typeof original === 'function') {
    const paramNames = getParamNames(original);

    descriptor.value = function(...args) {
      const params = paramNames.reduce((obj, pn, i) => {
        obj[pn] = args[i];
        return obj;
      }, {});

      const result = original.apply(this, args);
      console.log(`${name}(${JSON.stringify(params)}) = ${result}`);
    };
  }
};
