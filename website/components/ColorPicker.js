/**
 * created by eaTong at 2019/10/12
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SketchPicker} from 'react-color';

class ColorPicker extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
  };
  static defaultProps = {
    value: '#209CEE'
  };

  state = {
    showPopover: false
  };

  render() {
    const {showPopover} = this.state;
    return (
      <span onClick={() => this.setState({showPopover: !showPopover})}>
        {this.props.children}
        <div
          className="eaTong-color-picker"
          style={{backgroundColor: this.props.value}}
        >
        {showPopover && (
          <div className="color-picker-container" onClick={event => event.stopPropagation()}>
            <SketchPicker onChange={(val) => this.props.onChange(val.hex)} color={this.props.value}/>
          </div>
        )}
      </div>
      </span>

    )
  }
}

export default ColorPicker;
