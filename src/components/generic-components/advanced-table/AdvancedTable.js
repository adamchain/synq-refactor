import React, { Component } from "react";
import { Table, Input } from "antd";

import { SearchOutlined } from "@ant-design/icons";

export default class AdvancedTable extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
  };

  getNestedObject = (nestedObj, path) => {
    let pathArr = Array.isArray(pathArr) ? pathArr : [path];
    return pathArr.reduce(
      (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
      nestedObj,
    );
  };

  getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          autoFocus
          allowClear={true}
          placeholder={`Search ${title}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            this.handleSearch(
              e.target.value ? [e.target.value] : [],
              confirm,
              dataIndex,
            );
          }}
          style={{ width: 188 }}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      // if (this.searchInput) {
      //   setTimeout(() => this.searchInput.current.focus({
      //         cursor: 'end',
      //       }), 100);
      // }
    },
    // render: text =>
    //   this.state.searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
    //       searchWords={[this.state.searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ""}
    //     />
    //   ) : (
    //     text
    //   )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm({ closeDropdown: false });
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    let columns = this.props.columns.map((k) =>
      k.isSearchRequired
        ? { ...this.getColumnSearchProps(k.dataIndex, k.title), ...k }
        : { ...k },
    );
    let tableProps = {
      pagination: { defaultPageSize: 20 },
      ...this.props,
      columns,
    };

    return <Table {...tableProps} />;
  }
}
