/**
 * Created by eaTong on 2019/1/1 .
 * Description:
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

const Title = (props) => {
  const {title} = props;
  return (
    <DocumentTitle title={title}>
      <header className="title">{title}</header>
    </DocumentTitle>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired
};
export  default Title;
