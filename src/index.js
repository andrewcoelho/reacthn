import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from 'containers/App';
import 'styles/global.css';
import registerServiceWorker from './registerServiceWorker';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('containers/App'.default, () => {
    render(
      <AppContainer>
        <App />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

registerServiceWorker();
