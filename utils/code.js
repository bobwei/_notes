/* eslint-disable no-eval, import/prefer-default-export */
import React from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'babel-standalone';

export const execute = (code) => {
  const scope = {
    React,
    ReactDOM,
  };
  const scopedCode = `(${Object.keys(scope).join(',')}) => {
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
