import React, {Component} from 'react';
import {inject, observer} from 'mobx-react'

@inject('app') @observer
class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`global-loader ${this.props.app.loadingCount === 0 ? 'is-hidden' : ''}`}/>
    );
  }
}

Loading.propTypes = {};
export default Loading;
