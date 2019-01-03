/**
 * Created by eatong on 19-1-2.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, message, Input} from 'antd';
import RoleModal from "./RoleModal";
import Reactable from "@eatong/reactable";
import {inject, observer} from "mobx-react";
import GrantMenuModal from "~/pages/role/GrantMenuModal";
import Title from "~/components/Title";

@inject('role') @observer
class GrantMenuPage extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="base-layout">

      </div>
    )
  }

}

export default GrantMenuPage;
