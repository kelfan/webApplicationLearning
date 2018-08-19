// var react = require('react');
import React from 'react'
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './root'
// import './index.less'

// console.log(React.version)
// render(
//   <Hello/>,
//   document.getElementById('root')
// );
//
// elements inside AppContainer will be hot-reloaded
render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./root', () => {
    const NewRoot = require('./root').default;
    render(
      <AppContainer>
        <NewRoot /> 
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
