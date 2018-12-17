import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import globalStyle from '../website/styles/global.sass'

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="zh-cn">
      {process.env.NODE_ENV === 'production'
        ? (
          <Head>
            <link rel="stylesheet" type="text/css" href={`/app.css?${this.props.__NEXT_DATA__.buildId}`}/>
            <link rel="shortcut icon" href="/favicon.ico"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <meta name="renderer" content="webkit|ie-stand|ie-comp"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
          </Head>
        ) : (
          <Head>
            <link rel="shortcut icon" href="/favicon.ico"/>
            <style global dangerouslySetInnerHTML={{__html: globalStyle}}/>
          </Head>
        )}
      <body>
      <Main/>
      <NextScript/>
      </body>
      </html>
    );
  }
}
