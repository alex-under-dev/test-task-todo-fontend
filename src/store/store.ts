import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { projectReducer } from "./projects/projectReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createSagaMiddlewareWithGenerators from "redux-saga"
import { rootSaga } from "./effects";
import { taskReducers } from "./tasks/taskReducer";
import { commentReducer } from "./comments/commentReducer";



declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const sagaMiddleware = createSagaMiddlewareWithGenerators()

export const store = createStore(
    combineReducers({
        project: projectReducer,
        task: taskReducers,
        comment: commentReducer
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga)



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector