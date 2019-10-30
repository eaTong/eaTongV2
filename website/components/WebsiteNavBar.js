import React from 'react';
import Link from 'next/link';
import ColorPicker from "./ColorPicker";

export default function WebsiteNavBar(props) {
  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item" href="https://eatong.cn">
              <img src={require('../images/logo-eaTong.png')}/>
              <strong className={'has-text-primary'}>eaTong个人站</strong>
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
          <div className="navbar-end">
            <a className="navbar-item"><span>
              换肤
            </span>
              <ColorPicker onChange={(val) => console.log(val)}/>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
