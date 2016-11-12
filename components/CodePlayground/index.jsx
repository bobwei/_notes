/* eslint-disable import/no-unresolved, import/extensions */
import React from 'react';
import { curry } from 'lodash/function';
import { template } from 'lodash/string';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import defaultProps from 'recompose/defaultProps';
import withProps from 'recompose/withProps';

import { execute as run, defaultScope } from 'utils/code';
import codeTemplate from 'raw!./template';

import Editor from './editor';
import Preview from './preview';

const CodePlayground = ({ codeInitialValue, codemirrorOptions, mountPointId, execute } = {}) => (
  <div>
    <Editor
      codeInitialValue={codeInitialValue}
      codemirrorOptions={codemirrorOptions}
      execute={execute}
    />
    <Preview
      mountPointId={mountPointId}
    />
  </div>
);

export default compose(
  defaultProps({
    codemirrorOptions: {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'solarized',
      tabSize: 2,
      autofocus: true,
    },
  }),
  withProps(() => {
    const mountPointId = String(Math.random());
    const scope = {
      ...defaultScope,
      mountPointId,
    };
    return {
      mountPointId,
      execute: curry(run, 2)(scope),
      codeInitialValue: template(codeTemplate)({ scope }),
    };
  }),
  lifecycle({
    componentDidMount() {
      const { execute, codeInitialValue } = this.props;
      execute(codeInitialValue);
    },
  }),
)(CodePlayground);
