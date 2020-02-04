import React, {Component} from 'react';
import Link from 'next/link';
import ColorPicker from "./ColorPicker";

export default class WebsiteNavBar extends Component {
  state = {
    color: '#209CEE'
  };

  componentDidMount() {
    const color = window.localStorage.getItem('selected-color');
    if (color) {
      this.setState({color});
      window.replaceStyleVariable && window.replaceStyleVariable({main: color});
    }
  }

  onChangeColor(color) {
    this.setState({color});
    window.localStorage.setItem('selected-color', color);
    window.replaceStyleVariable && window.replaceStyleVariable({main: color});
  }

  render() {
    return (
      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link href="/">
              <a className="navbar-item" href="https://eatong.cn">
                <img src={require('../images/logo-eaTong.png')}/>
                <strong className={'has-text-primary'}>eaTong个人站</strong>
                <small className={'has-text-primary'}>不止程序员</small>
              </a>
            </Link>

          </div>
          <div className="navbar-menu">
            <Link href="/">
              <a className="navbar-item">
                首页
              </a>
            </Link>
            <Link href="/about">
              <a className="navbar-item">
                关于
              </a>
            </Link>
            <a className="navbar-item" href="/demo-reactable">
              Reactable
            </a>
            <div className="navbar-end">
              <a className="navbar-item">
                <ColorPicker onChange={(val) => this.onChangeColor(val)} value={this.state.color}>
                   <span>
                    换肤
                  </span>
                </ColorPicker>
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
