import React from 'react'
import {Provider} from 'mobx-react';
import stores from '../stores';
import {parse} from 'query-string';
import Head from 'next/head';
import Loading from './Loading';
import WebsiteNavBar from './WebsiteNavBar';
import WebsiteFooter from "./WebsiteFooter";

export default (Component, options = {}) => class Page extends React.Component {
  constructor(props) {
    super(props);
    this.stores = stores;
    this.state = {query: {}};
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
      return {stores};
    }
    return {app: {}};
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
    this.setState({query});
  }

  render() {
    return (
      <Provider {...this.stores} >
        <div className="layout-default">
          <Loading/>
          <Head>
            <title>eaTong个人站</title>
          </Head>
          <WebsiteNavBar/>
          <Component query={this.state.query || {}}/>
          <WebsiteFooter/>
        </div>
      </Provider>
    )
  }
}
