/**
 * Created by eaTong on 2018/6/24 .
 * Description:
 */
import React, {Component} from 'react';

const DataGrid = (props) => {
  return (
    <ul className={`data-grid ${props.className || ''}`}>
      {props.children}
    </ul>
  )
};
export default DataGrid;
