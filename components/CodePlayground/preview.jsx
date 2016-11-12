import React from 'react';

import styles from './index.module.scss';

const Preview = ({ mountPointId }) => (
  <div className={styles.preview}>
    <h4>
      Console.log
    </h4>
    <div
      id={`${mountPointId}:console.log`}
      className={styles.component}
    />
    <h4>
      Preview
    </h4>
    <div
      id={mountPointId}
      className={styles.component}
    />
  </div>
);

Preview.propTypes = {
  mountPointId: React.PropTypes.string,
};

export default Preview;
