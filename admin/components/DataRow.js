/**
 * Created by eaTong on 2018/6/24 .
 * Description:
 */
import React, {Component} from 'react';

const DataRow = (props) => {
  return (
    <li className={`data-row ${props.className || ''}`}>
      {props.label && <div className="label">{props.label}</div>}
      {(props.children || props.value) && <div className="value">{props.children || props.value}</div>}
    </li>
  )
};
export default DataRow;
