import {combineReducers, createStore, applyMiddleware} from 'redux';
import {chatReducer} from './chat/4_reducers';
import {createLogger} from 'redux-logger';

const rootReducer = combineReducers({
  chat: chatReducer,
  // OtherReducer
});

const logger = createLogger({});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [logger];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, middleWareEnhancer);
  return store;
}
