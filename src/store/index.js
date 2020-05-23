// applyMiddleware e compose são para o saga
import { createStore, applyMiddleware, compose } from 'redux';

// Essa é para o saga
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';

// Essas são para o saga
import rootSaga from './modules/rootSaga';

// Esta é para o Reactotron com Redux saga
const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

/* Com Saga, mas só com Redux no Reactotron!!!
const sagaMiddleware = createSagaMiddleware();
*/
// Com Saga no Reactotron
const sagaMiddleware = createSagaMiddleware({
  sagaMonitor,
});

/* Para o Reactotron. Sem Saga. Só com Redux!!!
const enhancer =
  process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;
*/

// Reactotron com saga
const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancer);

// Com saga
sagaMiddleware.run(rootSaga);

export default store;
