/**
 * Created by eaTong on 2018/11/12 .
 * Description:
 */

import React, {Component} from 'react';
import Page from "../website/components/Page";
import {inject, observer} from "mobx-react";
import ajax from "../website/util/ajax";
import {Link} from '../page-routes';

@inject('home', 'app') @observer
class IndexPage extends Component {
  static async init(ctx) {
    const {list, total} = await ajax({ctx, method: 'get', url: '/api/pub/blog/get'});
    const categoryResult = await ajax({ctx, method: 'get', url: '/api/pub/category/get'});
    return {home: {blog: list, total, categories: categoryResult.list}};
  }

  render() {
    const {home} = this.props;
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
              {home.blog.map(blog => (
                <Link key={blog.id} href={`/blog/${blog.id}`} prefetch={false}>
                  <div className="media">
                    <div className="media-content">
                      <p>
                        <strong>{blog.title}</strong>
                        <small className={'tag'}>{blog.category.name}</small>
                      </p>
                      <article>{blog.description.slice(0, 200)}</article>
                      <small>{blog.publishTime}</small>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="media-right box categories">
              <small className="category">文章分类</small>
              <ul>
                {home.categories.map(category => (
                  <li className="category" key={category.id}>
                    <strong>
                      {category.name}
                    </strong>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default Page(IndexPage);
