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
      window.replaceStyleVariable && window.replaceStyleVariable({main: color, link: color});
    }
  }

  onChangeColor(color) {
    this.setState({color});
    window.localStorage.setItem('selected-color', color);
    window.replaceStyleVariable && window.replaceStyleVariable({main: color, link: color});
  }

  render() {
    return (
      <nav className="navbar  is-transparent is-dark" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link href="/">
              <a className="navbar-item" href="/">
                <img src={require('../images/logo-eaTong.png')}/>
                <strong >eaTong 个人站</strong>
              </a>
            </Link>

          </div>
          <div className="navbar-menu">

            <Link href="/">
              <a className="navbar-item has-text-light">
                首页
              </a>
            </Link>
            <Link href="/about">
              <a className="navbar-item  has-text-light">
                关于
              </a>
            </Link>
            <a className="navbar-item  has-text-light" href="/demo-reactable">
              Reactable
            </a>
            {/* <div className="navbar-end">
              <a className="navbar-item  has-text-light">
                <ColorPicker onChange={(val) => this.onChangeColor(val)} value={this.state.color}>
                   <span>
                    换肤
                  </span>
                </ColorPicker>
              </a>
            </div> */}
          </div>
        </div>
      </nav>
    )
  }
}
