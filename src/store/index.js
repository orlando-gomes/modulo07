// applyMiddleware é para o saga
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

/* Sem Saga. Só com Redux!!!
const sagaMiddleware = createSagaMiddleware();
*/
// Com Saga
const sagaMiddleware = createSagaMiddleware({
  sagaMonitor,
});

/* Sem Saga. Só com Redux!!!
const enhancer =
  process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;
*/

// Com saga
const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancer);

// Com saga
sagaMiddleware.run(rootSaga);

export default store;
