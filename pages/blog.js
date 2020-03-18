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
import ReplyBox from "../website/components/ReplyBox";

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

  async submitReply(data) {
    const {blog} = this.props;
    await ajax({method: 'post', data: {...data, blogId: blog.blog.id}, url: '/api/pub/blog/reply'});
    await blog.getBlogDetail(blog.blog.id);
  }

  getBlogContent() {
    const {blog} = this.props;
    return this.md.render((blog.blog.content + `\n
> 本文为原创文章，转载请保留原出处。原文地址：[https:/eatong.cn/blog/${blog.blog.id}](https:/eatong.cn/blog/${blog.blog.id})
`).toString());
  }

  render() {
    const {blog} = this.props;
    return (
      <div className="blog-page">
        <div className="container">
          <h1 className="title has-text-centered has-text-primary">
            {blog.blog.title}
          </h1>
          <div className="level">
            <div className="level-left">{`发布日期：${formatTime(blog.blog.publishTime)}`}</div>
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{__html: `<article>${this.getBlogContent()}</article>`}}
          />
          {(blog.blog.blogReplies || []).length > 0 && (
            <h2 className={'subtitle'}>{`最新回复(${blog.blog.blogReplies.length}):`}</h2>
          )}
          {(blog.blog.blogReplies || []).map(reply => (
            <article className="media" key={reply.id}>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{reply.website ? (<a href={reply.website}>{reply.name}</a>) : reply.name}</strong>
                    <small>{formatTime(reply.createdAt)}</small>
                    <br/>
                    {reply.content}
                  </p>
                </div>
              </div>
            </article>
          ))}
          <ReplyBox onSubmit={async (values) => await this.submitReply(values)}/>
        </div>
      </div>
    )
  }
}

export default Page(BlogPage);
