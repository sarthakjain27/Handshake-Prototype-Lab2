import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AllRoutes from './components/AllRoutes';

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <AllRoutes />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
