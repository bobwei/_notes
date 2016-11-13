/* eslint-disable import/no-unresolved, import/extensions, global-require, react/forbid-prop-types, max-len */
import React from 'react';
import Codemirror from 'react-codemirror';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import { throttle } from 'lodash/function';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';

import './codemirror.scss';

if (canUseDOM) {
  require('codemirror/mode/javascript/javascript');
}

const Editor = ({
  codemirrorOptions, code, onChange,
} = {}) => (
  <Codemirror
    options={codemirrorOptions}
    value={code}
    onChange={onChange}
  />
);

Editor.propTypes = {
  codemirrorOptions: React.PropTypes.object,
  code: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

Editor.defaultProps = {
  codemirrorOptions: {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'solarized',
    tabSize: 2,
    autofocus: true,
  },
};

export default compose(
  withProps(({ onChange }) => ({
    onChange: throttle(onChange, 1000),
  })),
)(Editor);
