import { applyMiddleware } from 'redux'

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

const reduxLogger = createLogger({
	collapsed: true
})

export default applyMiddleware(
	thunk,
	reduxLogger
);