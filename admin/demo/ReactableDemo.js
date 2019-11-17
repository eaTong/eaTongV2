/**
 * Created by eaTong on 2019-11-17 .
 * Description:
 */
import React, {Component} from 'react';
import {Modal} from 'antd';
import Reactable from "@eatong/reactable";

const columns = [
  {title: 'pinned left', key: 'pinned-left', pinned: true},
  {
    title: 'title A',
    key: 'title-A',
    children: [
      {title: 'title-a-1', key: 'title-a-1', filter: {sort: true, type: 'text'}},
      {title: 'title-a-2', key: 'title-a-2', filter: {sort: true, type: 'date'}},
      {title: 'title-a-3', key: 'title-a-3', filter: {sort: true, type: 'range'}},
      {
        title: 'title-a-4',
        key: 'title-a-4',
        filter: {
          sort: true,
          type: 'select',
          options: [{value: 'A', label: 'A'}, {value: 'B', label: 'B'}, {value: 'C', label: 'C'},]
        }
      },
    ]
  },
  {
    title: 'title B',
    key: 'title-B',
  },
  {
    title: 'title C',
    key: 'title-c',
  },
  {
    title: 'pinned right',
    key: 'pinned right',
    pinned: 'right'
  }
];

function getDateSource(length = 100) {
  const data = [];
  for (let i = 0; i < length; i++) {
    const item = {
      id: i,
    };
    columns.forEach((column, index) => {
      if (column.children && column.children.length > 0) {
        column.children.forEach(child => {
          item[child.key] = `${column.title}~${child.title}~${i}`;
        })
      } else {
        item[column.key] = column.title + i;
      }
    });
    data.push(item);
  }
  return data;
}

export default class ReactableDemo extends Component {
  state = {};

  componentDidMount() {

  }

  render() {
    const {} = this.state;
    return (<div className='reactable-demo'>
      <h1 className="title">Reactable demo</h1>
      <p>
        <code>Reactable</code> is a flex table written by <code>React</code> , It's designed for large data editing.
      </p>
      <Reactable
        columns={columns}
        dataSource={getDateSource()}
        fullRowRender={(row, key) => key % 7 === 0 ? JSON.stringify(row) : null}
        pinnedBottomData={[getDateSource(2)]}
      />
    </div>);
  }
}
