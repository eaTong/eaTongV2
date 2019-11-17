/**
 * Created by eaTong on 2018/11/12 .
 * Description:
 */

import React, {Component} from 'react';
import Page from "../website/components/Page";
import {inject, observer} from "mobx-react";
import ajax from "../website/util/ajax";
import {Link} from '../page-routes';
import {formatTime} from "../website/util/utils";

@inject('home', 'app') @observer
class IndexPage extends Component {
  static async init(ctx) {
    const {list, total} = await ajax({ctx, method: 'get', url: '/api/pub/blog/get'});
    const notes = await ajax({ctx, method: 'get', url: '/api/pub/note/get'});
    return {home: {blog: list, total, notes: notes.list}};
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
          <div className="blog-list">
            <h3 className={'title'}>我的文章</h3>
            {home.blog.map(blog => (
              <Link key={blog.id} href={`/blog/${blog.id}`} prefetch={false}>
                <a href={`/blog/${blog.id}`} className={'section has-text-dark'}>
                  <div className="content">
                    <h3 className={'blog-title'}>
                      <strong>{blog.title}</strong>
                      <small className={'tag'}>{blog.category.name}</small>
                    </h3>
                    <article>{blog.description.slice(0, 200)+'......'}</article>
                    <small>{formatTime(blog.publishTime)}</small>
                  </div>
                </a>
              </Link>
            ))}
          </div>
          <div className="notes-list">
            <h4 className={'title'}>我的笔记</h4>

            <div className="tile is-ancestor">

              {home.notes.map(note => (
                <div className={`tile  is-${Math.ceil(note.content.length/80)} is-parent`}>
                  <div className="box content">
                    <p className={' note-detail'}>
                      {note.content}
                    </p>
                    <small>{formatTime(note.createdAt)}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Page(IndexPage);
