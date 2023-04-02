import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import { searchFoodsReducer } from './foodSearch';
import { foodNutritionReducer } from './foodNutrition';
import { searchExercisesReducer } from './exerciseSearch';
import { exerciseDetailsReducer } from './exerciseDetails';
import { searchFoodDiaryReducer } from './foodDiary';
import { profileReducer } from './profile';

const rootReducer = combineReducers({
  session,
  searchFoodsReducer,
  foodNutritionReducer,
  searchExercisesReducer,
  exerciseDetailsReducer,
  searchFoodDiaryReducer,
  profileReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
