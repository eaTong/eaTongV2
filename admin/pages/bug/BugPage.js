
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

import React, {Component} from 'react';
import {Button, message ,Input , Pagination} from 'antd';
import Reactable from "@eatong/reactable";
import BugFormModal from "./BugFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";
import DataSet from '@antv/data-set';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
];

@inject('bug','app') @observer
class BugPage extends PageBase {
  async componentDidMount() {
    await this.props.bug.getDataList();
  }

  render() {
    const {bug} = this.props;
    const {dataList} = bug;
    const ds = new DataSet();
    const dv = ds.createView().source(dataList.filter(item=>item.name==='高鹏杰'));
    dv.transform({
      type: "fold",
      fields: ["new", "complete", "test", "hang"],
      // 展开字段集
      key: "type",
      // key字段
      value: "count" // value字段
    });

    const cols = {
      date: {
        range: [0, 1]
      }
    };
    return (
      <div className="base-layout bug-page">
        <Title title='BUG管理'/>
        <div className="operate-bar">


        </div>
        <Chart height={400} data={dv} scale={cols}  forceFit>
          <Legend />
          <Axis name="date" />
          <Axis
            name="count"
            label={{
              formatter: val => val
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="date*count"
            size={2}
            color={"type"}
            shape={"smooth"}
          />
        </Chart>


      </div>
    );
  }
}

BugPage.propTypes = {};
export default BugPage;
