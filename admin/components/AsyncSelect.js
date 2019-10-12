/**
 * created by eaTong at 2019/10/12
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Select} from "antd";
import ajax from "../utils/ajax";

const Option = Select.Option;

class AsyncSelect extends Component {
  static propTypes = {
    debounce: PropTypes.number,
    filterField: PropTypes.string,
    asyncUrl: PropTypes.string,
    asyncMethod: PropTypes.string,
    fetch: PropTypes.func,
    renderItem: PropTypes.func,
    dataResolve: PropTypes.func,
    labelExtra: PropTypes.func,
    keyExtra: PropTypes.func,
  };
  static defaultProps = {
    debounce: 500,
    filterField: 'keywords',
    labelExtra: item => item.name,
    keyExtra: item => item.id,
    asyncMethod: 'post',
    dataResolve: (result) => result.list
  };

  state = {
    loading: true,
    searchText: '',
    dataList: []
  };

  componentDidMount() {
    this.fetchData();
  }

  onSelect = (value, option) => {
    console.log(value, option);
  };

  onSearch = (value) => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    console.log(value);
    this.setState({searchText: value}, () => {
      this.timer = setTimeout(() => this.fetchData(), this.props.debounce)
    });
  };

  async fetchData() {
    const {asyncUrl, asyncMethod, dataResolve, filterField} = this.props;
    try {
      const data = {};
      data[filterField] = this.state.searchText;
      console.log(data);
      const result = await ajax({data, url: asyncUrl, method: asyncMethod});
      this.setState({dataList: dataResolve(result)});
    } catch (e) {
    } finally {
      this.setState({loading: false})
    }
  }

  renderOptions() {
    const {keyExtra, labelExtra} = this.props;
    return this.state.dataList.map(item => (
      <Option key={keyExtra(item)}>{labelExtra(item)}</Option>
    ))
  }

  render() {
    return (
      <Select
        style={{width: '100%'}}
        showSearch
        defaultActiveFirstOption={false}
        filterOption={false}
        onSearch={this.onSearch}
        optionFilterProp="label"
        onSelect={(a, b, c) => this.onSelect(a, b, c)}
        {...this.props}
      >
        {this.renderOptions()}
      </Select>
    )
  }
}

export default AsyncSelect;
