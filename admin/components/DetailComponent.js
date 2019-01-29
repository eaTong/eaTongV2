/**
 * Created by eatong on 19-1-29.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Popover} from 'antd';

class DetailComponent extends Component {
  state = {
    visible: false
  };

  componentDidMount() {

  }

  onDetailVisibleChange(visible) {
    if (visible) {
      this.content = this.props.renderDetail();
    }
    this.setState({visible});
  }

  onClickContent(event) {
    console.log(event.pageX, event.clientX, event.screenX);
    console.log(event, event.target, this.state.visible);
    window.node = event.target;
  }

  render() {
    const {visible} = this.state;
    return (
      <Popover
        content={this.content}
        trigger={'click'}
        visible={visible}
        overlayClassName={'detail-overlay-container'}
        onVisibleChange={(visible) => this.onDetailVisibleChange(visible)}
      >
        <span className="link-text block" onClick={(event) => this.onClickContent(event)}>
          {this.props.children}
        </span>
      </Popover>
    )
  }

}

DetailComponent.propTypes = {
  renderDetail: PropTypes.func
};
export default DetailComponent;
