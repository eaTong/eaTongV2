/**
 * Created by eaTong on 2018/11/12 .
 * Description:
 */

import React, {Component} from 'react';
import Page from "../website/components/Page";


class IndexPage extends Component {
  render() {
    return (
      <div className="index-page">
        <section className="hero  is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title ">
                不止程序员
              </h1>
              <h2 className="">
                永不停止，不只是一个程序员。
              </h2>
              <h3>
                Never stop , not only a programmer.
              </h3>
            </div>
          </div>
        </section>

        <div className="section container">
          <section className="media">
            <div className="media-content">
              <div className="media">
                <div className="media-content">
                  <h1><strong>文章标题</strong></h1>
                  <article>文章摘要</article>
                </div>
              </div>
              <div className="media">
                <div className="media-content">
                  <h1><strong>文章标题</strong></h1>
                  <article>文章摘要</article>
                </div>
              </div>
            </div>

            <div className="media-right box categories">
              <ul>
                <li>分类1</li>
                <li>分类2</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default Page(IndexPage);
