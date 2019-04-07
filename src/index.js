import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

import reducers from './reducers'
import middlewares from './middlewares'

const store = createStore(reducers, middlewares);

const app = (
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
)

const root = document.getElementById('root');

ReactDOM.render(app, root);