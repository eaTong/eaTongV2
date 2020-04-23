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
    const categories = await ajax({ctx, method: 'get', url: '/api/pub/category/get'}, {pageSize: 100});
    return {home: {blog: list, total, notes: notes.list, categories: categories.list}};
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
              <h4>联系我：
                <a href="mailto:eatongchou@gmail.com" className={'has-text-dark'}>eatongchou@gmail.com</a>、
                <a href="tel:18183820756" className={'has-text-dark'}>18183820756</a></h4>
            </div>
          </div>
        </section>
        <div className="section container">
          <div className="blog-list">
            <h3 className={'title'}>我的文章</h3>
            {home.blog.map(blog => (
              <div className="content" key={blog.id}>
                <Link href={`/blog/${blog.id}`} prefetch={false}>
                  <a href={`/blog/${blog.id}`} className={'blog-title'}>
                    <strong>{blog.title}</strong>
                  </a>
                </Link>
                <article>{blog.description.slice(0, 200) + '......'}</article>
                <p>
                  <span>文章分类：</span>
                  <a href={`/category/${blog.category.id}`}>{blog.category.name}</a>
                </p>
                <small>{formatTime(blog.publishTime)}</small>
              </div>
            ))}
          </div>
          <div className="note-list-container content">
            <h4 className={'title'}>我的笔记</h4>
            <div className="note-list">
              {home.notes.map(note => (
                <div
                  key={note.id}
                  className={`note-item box span-${Math.min(Math.ceil(note.content.length / 60) + 1 + (note.reference ? Math.round(2 + note.reference.length / 40) : 0), 24)}`}>

                  <div className="content">
                    {note.reference && (
                      <article className='message'>
                        <div className='message-body'>
                          <p>{note.reference}</p>
                          <div className='has-text-right'>
                            <small> {`摘自《${note.source}》`} </small>
                          </div>
                        </div>
                      </article>
                    )}
                    <p className={' note-detail'}>
                      {note.content}
                    </p>
                  </div>
                  <p>
                    {note.category && (
                      <Link href={`/category/${note.category.id}`} prefetch={false}>
                        <a href={`/category/${note.category.id}`}>{note.category.name}</a>
                      </Link>
                    )}
                  </p>
                  <small>{formatTime(note.createdAt)}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="categories-list-container">
            <h4 className="title">所有文章/笔记分类</h4>
            {home.categories.map(category => (
              <div className="content" key={category.id}>
                <a href={`/category/${category.id}`}>{category.name}</a>
                <p>{category.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    )
  }
}

export default Page(IndexPage);
