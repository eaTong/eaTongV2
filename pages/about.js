/**
 * created by eaTong at 2019/10/12
 */
import React, {Component} from 'react';
import Page from "../website/components/Page";
import {inject, observer} from "mobx-react";
import ajax from "../website/util/ajax";

@inject('home', 'app') @observer
class AboutPage extends Component {
  static async init(ctx) {
    const {list, total} = await ajax({ctx, url: '/api/pub/about/get'});
    return {about: {}};
  }


  render() {
    return (
      <div className="about-page">
        this is about page...

      </div>
    )
  }
}

export default Page(AboutPage);
