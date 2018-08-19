// var react = require('react');
import React from 'react'
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Hello from './components/hello'
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
    <Hello />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/hello', () => {
    const NewHello = require('./components/hello').default;
    render(
      <AppContainer>
        <NewHello />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
