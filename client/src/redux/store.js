import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { eventReducer } from "./Event/event.reducer";


const rootReducer = combineReducers({
    eventManager: eventReducer
});

const composeEnhancer = Window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));