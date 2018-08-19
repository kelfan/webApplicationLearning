// var react = require('react');
import React from 'react'
import { render } from 'react-dom';
import Hello from './components/hello'
// import './index.less'

// console.log(React.version)
render(
  <Hello/>,
  document.getElementById('root')
);
