import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from './App/store/createStore';

import history from './App/utils/history';
import ScrollToTop from './App/utils/scrollToTop';

const store = createStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router history={history}>
            <ScrollToTop />
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    </Provider>
);
