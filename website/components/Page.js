import React from 'react'
import { Provider } from 'mobx-react';
import stores from '../stores';
import { parse } from 'query-string';
import Head from 'next/head';
import Loading from './Loading';
import WebsiteNavBar from './WebsiteNavBar';
import WebsiteFooter from "./WebsiteFooter";

export default (Component, options = {}) => class Page extends React.Component {
  constructor(props) {
    super(props);
    this.stores = stores;
    this.state = { query: {} };
  }

  static async getInitialProps(ctx) {
    if (Component.init) {
      const result = await Component.init(ctx) || {};
      for (let key in result) {
        for (let dataKey in result[key]) {
          if (stores[key]) {
            stores[key][dataKey] = result[key][dataKey];
          }
        }
      }
      this.stores = stores;
      return { stores };
    }
    return { app: {} };
  }

  componentDidMount() {
    const query = parse(window.location.search);
    const propStore = this.props.stores || {};
    for (let key in propStore) {
      for (let dataKey in propStore[key]) {
        if (stores[key]) {
          stores[key][dataKey] = propStore[key][dataKey];
        }
      }
    }
    this.stores = stores;
    this.setState({ query });
  }

  render() {
    return (
      <Provider {...this.stores} >
        <div className="tile ">
          <div className="tile is-vertical is-4 is-dark is-fixed-left has-background-dark">
            <Loading />
            <Head>
              <title>eaTong个人站</title>
            </Head>
            <WebsiteNavBar />
            <section className="hero  is-dark is-full index-hero">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title ">
                    一个改变者
                  </h1>
                  <p className='pt-4 mb-0  has-text-white has-text-weight-bold subtitle'>终身学习，持续改变，躬身入局
                  </p>
                  <small className='has-text-light'>水电施工员、实施、Java、前端、管理、产品</small>
                  <p className='py-4 has-text-white has-text-weight-bold'>
                    Keep learning , keep changing , keep trying
                  </p>
                  <h4 className='py-2'>mail：
                    <a href="mailto:eatongchou@gmail.com" className={'has-text-light'}>eatongchou@gmail.com</a></h4>
                </div>
              </div>
            </section>
          </div>
          <div className="tile is-vertical is-8 content-container section container">
            <Component query={this.state.query || {}} />
            <WebsiteFooter />
          </div>
        </div>
      </Provider>
    )
  }
}
