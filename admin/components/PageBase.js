/**
 * Created by eatong on 19-1-3.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PageBase extends Component {
  /**
   * 校验按钮是否需要禁用
   * @param button
   * @param args
   * @returns {boolean}
   */
  disableButton(button, ...args) {
    let disabled = false;
    if (typeof button === 'string') {
      const {app, path} = this.props;
      // 校验权限
      if (app && app.authMapping[path]) {
        disabled = disabled || app.authMapping[path].indexOf(button) === -1;
      } else {
        disabled = true;
      }
    } else if (typeof button === 'boolean') {
      disabled = button;
    }

    for (const addition of args) {
      disabled = disabled || addition;
    }
    return disabled;
  }
}

export default PageBase;
