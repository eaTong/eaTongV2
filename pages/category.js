/**
 * Created by eatong on 2020/4/23.
 */
import React, { Component } from 'react';
import Page from "../website/components/Page";
import { inject, observer } from "mobx-react";
import ajax from "../website/util/ajax";
import { formatTime } from "../website/util/utils";
import ReplyBox from "../website/components/ReplyBox";
import Head from 'next/head';
import { Link } from "../page-routes";

@inject('category') @observer
class Category extends Component {
  state = {};

  static async init(ctx) {
    const category = await ajax({ method: 'get', data: { id: ctx.query.id }, ctx, url: '/api/pub/category/detail' });
    return { category: { ...category, notes: category.notes || [], blogs: category.blogs || [] } };
  }

  render() {
    const { category } = this.props;
    return (
      <div className="category-page">
        <Head>
          <title>{`${category.name}-eaTong个人站`}</title>
        </Head>
        <section className={` ${category.type === 1 ? 'is-dark' : 'is-dark mb-4'}`}>
          <div className="hero-body">
            <div className="container">
              <h2 className="title ">
                {category.name}
              </h2>
              <h2 className="">
                {category.description}
              </h2>
            </div>
          </div>
        </section>
        {category.blogs.map(blog => (
          <div className="content" key={blog.id}>
            <a href={`/blog/${blog.id}`} className={'blog-title has-text-dark'}>
              <strong>{blog.title}</strong>
            </a>
            <Link href={`/blog/${blog.id}`} prefetch={false}>
              <article>{blog.description.slice(0, 200) + '......'}</article>
            </Link>
            <small>{formatTime(blog.publishTime)}</small>
          </div>
        ))}
        {category.notes.map(note => (
          <div
            key={note.id}
            className='box'>
            <div className="content">
              <p className={' note-detail'}>
                {note.content}
              </p>
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
            </div>
            <p>
              {note.category && (
                <a href={`/category/${note.category.id}`}>{note.category.name}</a>
              )}
            </p>
            <small>{formatTime(note.createdAt)}</small>
          </div>
        ))}
      </div>
    )
  }
}

export default Page(Category);
