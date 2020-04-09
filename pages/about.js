/**
 * created by eaTong at 2019/10/12
 */
import React, {Component} from 'react';
import Page from "../website/components/Page";
import {inject, observer} from "mobx-react";
import Head from "next/head";

@inject('home', 'app') @observer
class AboutPage extends Component {
  static async init(ctx) {
    return {about: {}};
  }


  render() {
    return (
      <div className="about-page">

        <Head>
          <title>关于-eaTong个人站</title>
        </Head>
        <div className='content container'>
          <h1>eaTong个人简介</h1>
          <p>
            eaTong，本名周夷东，江西鹰潭人，现居昆明，在一家60多个人的互联网公司担任某一个产品的研发管理工作。
            成为程序员之前做过水电施工员、项目实施，再到Java开发，再到web前端开发。
          </p>
          <article class="message  is-success">
            <div class="message-header">
              <p>转行经历</p>
            </div>
            <div class="message-body">
              <p>
                转行前是水电施工员，然后看了两个月C++就去找工作了，自然是没人要实习都找不到。
              </p>
              <p>
                然后决定做实施，先入行IT，然后再看招聘网站的需求发现Java的需求很高，于是自学Java，正好在实施的工作中又学会了SQL等知识。
              </p>
              <p>
                然后实施过程八个月时间自己做了个库存管理系统，边做边学，遇到不懂的地方查资料，系统做完了，对于软件开发也就有了个初步概念了，这时候出去找工作相对容易很多，至少普通的工作已经是由我来挑而不是没人看得上了。
              </p>
              <p>
                初入行由桌面应用转为web开发又涉及大量的差异，但好在培养了自己独立思考自己通过查询解决问题的能力，所以随便看点资料就掌握了web开发相关的能力，一年后（15年）看中前端开发的需求潜力，毅然投身前端，在这之前又自己做了个小demo，所以找工作的时候基本上工资翻倍。
              </p>
              <p>
                目前在前端开发做了4年半，也让自己成为了一个不断拓展自己的程序员。一年前开始接触管理层，其中最大的不同在于:程序员属于个人能力思维，你想着如何提升自己就能有很大的效果。而管理岗的不同在于你需要怎么提升其他人的能力，并把他人能力更好的串起来。
              </p>
              <p>
                总结一下:由施工转实施，再到Java，再到前端开发，再到管理岗位。虽然看着变化很多但是其实核心就是一条:找到目标，然后分析需求，再根据需求补充自己缺失的能力，并在到达目标后及时分析下一阶段的目标以及需求。
              </p>
            </div>
          </article>

          <article class="message  is-warning">
            <div class="message-body">
              对于管理岗位的理解不算深，但是认为主要是两个方面：能力和意愿。能力足意愿不高很难发挥全部工作能力；能力不足意愿高的需要培养；能力不够意愿不足的建议淘汰。
            </div>
          </article>

          <article class="message  is-info">
            <div class="message-body">
              <p>
                2019年在得到上听了十几堂横向发展的课程，主要有：《产品思维30讲》、《如何成为带团队的高手》、《武志红的心理学课》、《宁向东的管理学科》、《薛兆丰的经济学课》、《刘润：五分钟商学院》、《超级个体》、《精英日课》等等。
              </p>
              <p>
                学习这些课程最大的收获是强化了自己的学习习惯，原本学习的时候都是没有目的的学习，想到什么学什么，没有一个具体的学习蓝图。有了这些课程之后就可以更具体的学习某一个领域的完整的知识结构。
              </p>
              <p>
                也是因为这个原因，对知识付费这件事情越发觉得值得，免费的知识需要自己花时间去寻找，而花时间寻找这些免费知识的时间成本已经足以够你买几门付费课程了，付费课程带来的不仅是知识，更是对你自己本身操作系统的一次大升级。
              </p>
            </div>
          </article>
          <article className='message is-danger'>
            <div className='message-body'>
              如有志同道合者想联系本人，可以加微信：18183820756。或者邮件：<a href='mailto:eatongchou@gmail.com'>eatongchou@gmail.com</a>
            </div>
          </article>
        </div>
        <div className="blank"></div>

      </div>
    )
  }
}

export default Page(AboutPage);
