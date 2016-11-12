/* eslint-disable import/no-unresolved, import/extensions, global-require, react/forbid-prop-types, max-len */
import React from 'react';
import Codemirror from 'react-codemirror';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import { throttle } from 'lodash/function';
import compose from 'recompose/compose';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import './codemirror.scss';

if (canUseDOM) {
  require('codemirror/mode/javascript/javascript');
}

const Editor = ({ codemirrorOptions, codeInitialValue, execute }) => (
  <Codemirror
    options={codemirrorOptions}
    value={codeInitialValue}
    onChange={throttle(execute, 2000)}
  />
);

Editor.propTypes = {
  codemirrorOptions: React.PropTypes.object,
  codeInitialValue: React.PropTypes.string,
  execute: React.PropTypes.func,
};

export default compose(
  onlyUpdateForKeys(['codemirrorOptions', 'codeInitialValue']),
)(Editor);
