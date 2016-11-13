/* eslint-disable import/no-unresolved, import/extensions, global-require, react/forbid-prop-types, max-len, jsx-a11y/label-has-for */
import React from 'react';
import Codemirror from 'react-codemirror';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import { throttle } from 'lodash/function';
import compose from 'recompose/compose';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import withState from 'recompose/withState';
import withProps from 'recompose/withProps';

import './codemirror.scss';
import styles from './index.module.scss';

if (canUseDOM) {
  require('codemirror/mode/javascript/javascript');
}

const Editor = ({
  codemirrorOptions, codeInitialValue, execute,
  enableLivePreview, toggleLivePreview,
} = {}) => (
  <div>
    <Codemirror
      options={codemirrorOptions}
      value={codeInitialValue}
      onChange={throttle(execute, 1000)}
    />
    <div className={styles.options}>
      <label>
        <input type="checkbox" checked={enableLivePreview} onChange={toggleLivePreview} />
        live preview
      </label>
    </div>
  </div>
);

Editor.propTypes = {
  codemirrorOptions: React.PropTypes.object,
  codeInitialValue: React.PropTypes.string,
  execute: React.PropTypes.func,
  enableLivePreview: React.PropTypes.bool,
  toggleLivePreview: React.PropTypes.func,
};

export default compose(
  onlyUpdateForKeys(['codemirrorOptions', 'codeInitialValue']),
  withState('enableLivePreview', 'updateEnableLivePreview', false),
  withProps(({ updateEnableLivePreview }) => ({
    toggleLivePreview: () => updateEnableLivePreview(n => !n),
  }))
)(Editor);
