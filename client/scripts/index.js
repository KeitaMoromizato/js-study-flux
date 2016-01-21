import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import Store from './stores/store';
import TopPage from './components/topPage';

ReactDOM.render((
  <Provider store={Store}>
    <TopPage />
  </Provider>
), document.getElementById('app'));
