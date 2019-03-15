/**
 * Created by eaTong on 2019/1/1 .
 * Description:
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

const Title = (props) => {
  const {title} = props;
  return (
      <header className="title">{title}</header>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired
};
export  default Title;
