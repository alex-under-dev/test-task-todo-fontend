import { call, put, select, takeLatest } from "redux-saga/effects";
import { Comment } from "../interfaces"
import { ActionTypes } from "../actionTypes";
import { axios } from "../../http";
import { RootState } from "../store";


let initialState = {
    comments: null as null | Comment[]
}
const getCommentsSaga = function* ({ payload }: any) {
    try {
        const { data } = yield call(axios.get, `/comment/${payload}`)
        yield put({ type: ActionTypes.getCommentFx, payload: data })
    } catch (error) {
        console.error(error)
    }
}
export const getCommentsSagaHundler = function* () {
    yield takeLatest(ActionTypes.getComment, getCommentsSaga)
}
const createCommentsSaga = function* ({ payload }: any) {
    try {
        yield call(axios.post, `/comment`, { task_id: payload.taskId, text: payload.text, commentId: payload.commentId })
        const taskId: number = yield select((st: RootState) => st.task.targetTask?.id)
        yield put({ type: ActionTypes.getComment, payload: taskId })
    } catch (error) {
        console.error(error)
    }
}
export const createCommentSagaHundler = function* () {
    yield takeLatest(ActionTypes.createComment, createCommentsSaga)
}
const deleteCommentSaga = function* ({ payload }: { type: ActionTypes, payload: { id: number } }) {
    try {
        yield call(axios.delete, `/comment/${payload}`)
        const taskId: number = yield select((st: RootState) => st.task.targetTask?.id)
        yield put({ type: ActionTypes.getComment, payload: taskId })
    } catch (error) {
        console.error(error)
    }
}
export const deleteCommentSagaHundler = function* () {
    yield takeLatest(ActionTypes.deleteComment, deleteCommentSaga)
}


export const commentReducer = (state = initialState, action: any): typeof initialState => {
    switch (action.type) {
        case ActionTypes.getCommentFx:
            return {
                ...state,
                comments: action.payload
            }
        default:
            return state;
    }


}
