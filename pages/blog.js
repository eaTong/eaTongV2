/**
 * created by eaTong at 2019/10/12
 */
import React, {Component} from 'react';
import Page from "../website/components/Page";
import {inject, observer} from "mobx-react";
import MarkdownIt from "markdown-it";
import hljs from 'highlight.js'
import ajax from "../website/util/ajax";
import {formatTime} from "../website/util/utils";

@inject('blog', 'app') @observer
class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.md = new MarkdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str, true).value;
          } catch (__) {
          }
        }
        return this.md.utils.escapeHtml(str);
      }
    });
  }

  static async init(ctx) {
    const blog = await ajax({method: 'get', data: {id: ctx.query.id}, ctx, url: '/api/pub/blog/detail'});
    return {blog: {blog}};
  }

  render() {
    const {blog} = this.props;
    return (
      <div className="blog-page">
        <div className="container">
          <h1 className="title has-text-centered">
            {blog.blog.title}
          </h1>
          <div className="level">
            <div className="level-left">{`发布日期：${formatTime( blog.blog.publishTime)}`}</div>
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{__html: `<article>${this.md.render((blog.blog.content || '').toString())}</article>`}}
          />
        </div>
      </div>
    )
  }
}

export default Page(BlogPage);
