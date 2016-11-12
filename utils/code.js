/* eslint-disable no-eval, import/prefer-default-export */
import React from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'babel-standalone';

export const defaultScope = {
  React,
  ReactDOM,
};

export const execute = (scope, code) => {
  const params = Object.keys(scope).join(',');
  const scopedCode = `(${params}) => {
    ${code}
  }`;
  try {
    const compiledCode = transform(scopedCode, {
      presets: ['latest', 'react'],
    }).code;
    eval(compiledCode)(...Object.keys(scope).map(key => scope[key]));
  } catch (e) {
    console.log(e);
  }
};
