import React from 'react'
import {Provider} from 'mobx-react';
import stores from '../stores';
import {parse} from 'query-string';
import Head from 'next/head';
import Loading from './Loading';

export default Component => class Page extends React.Component {
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
    return {};
  }

  componentWillMount() {
    const propStore = this.props.stores || {};
    for (let key in propStore) {
      for (let dataKey in propStore[key]) {
        if (stores[key]) {
          stores[key][dataKey] = propStore[key][dataKey];
        }
      }
    }
    this.stores = stores;
  }

  componentDidMount() {
    const query = parse(window.location.search);
    this.setState({query});
  }

  render() {
    return (
      <Provider {...this.stores} >
        <div className="layout-default">
          <Loading/>
          <Head>
            <title>eaTong write a blog with Next.js</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
          </Head>
          <Component query={this.state.query || {}}/>
        </div>
      </Provider>
    )
  }
}
