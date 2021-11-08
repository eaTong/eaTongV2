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
          <div className="blog-list">
            <h3 className={'title'}>我的文章</h3>
            {home.blog.map(blog => (
              <div className="content" key={blog.id}>
                <Link href={`/blog/${blog.id}`} prefetch={false}>
                  <a href={`/blog/${blog.id}`} className={'blog-title has-text-black '}>
                    <strong>{blog.title}</strong>
                  </a>
                </Link>
                <article className='has-text-grey'>{blog.description.slice(0, 200) + '......'}</article>
                <p className=' has-text-black'>
                  <span>文章分类：</span>
                  <a className=' has-text-black' href={`/category/${blog.category.id}`}>{blog.category.name}</a>
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
                    <p className={' note-detail'} className='has-text-grey'>
                      {note.content}
                    </p>
                  </div>
                  <p >
                    {note.category && (
                      <Link href={`/category/${note.category.id}`} prefetch={false}>
                        <a href={`/category/${note.category.id}`} className='has-text-black '>{note.category.name}</a>
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
                <a href={`/category/${category.id}`} className='has-text-black'>{category.name}</a>
                <p className='has-text-grey'>{category.description}</p>
              </div>
            ))}
          </div>
      </div>
    )
  }
}

export default Page(IndexPage);
