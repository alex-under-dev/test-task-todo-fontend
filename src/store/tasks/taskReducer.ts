import { call, put, select, take, takeLatest } from "redux-saga/effects";
import { Task, TaskStatus } from "../interfaces"
import { ActionTypes } from "../actionTypes";
import { RootState } from "../store";
import { axios } from "../../http";


let initialState = {
    tasks: [] as Task[],
    targetProjectId: null as number | null,
    targetTask: null as Task | null,
    isEditModalOpen: false,
    isCreateModalOpen: false,
    targetTaskIsСonfigured: false
}

const createTaskSaga = function* ({ payload }: { type: ActionTypes, payload: { projectId: number } }) {
    try {
        yield call(axios.post, '/task', {
            header: 'Задача без названия',
            priority: 'low',
            project_id: payload.projectId
        })
        yield put({ type: ActionTypes.getTasks, payload: payload.projectId })
    } catch (error) {
        console.error(error)
    }
}
const getTasksSaga = function* (e: any) {
    try {
        const { data } = yield call(axios.get, `/task/${e.payload}`)
        yield put({ type: ActionTypes.getTasksFx, payload: data })
    } catch (error) {
        console.error(error)
    }
}
const getOneTaskSaga = function* (e: any) {
    try {
        const { data } = yield call(axios.get, `/oneTask/${e.payload}`)
        yield put({ type: ActionTypes.getOneTaskFx, payload: data })
    } catch (error) {
        console.error(error)
    }
}

const updateTaskSaga = function* ({ payload }: { type: ActionTypes, payload: { id: number, header: string, text: string, priority: string, status: string } }) {
    try {
        yield call(axios.patch, '/task', {
            id: payload.id,
            header: payload.header,
            text: payload.text,
            priority: payload.priority,
            status: payload.status,
        })
        const projectId: number = yield select((st: RootState) => st.task.targetProjectId)
        const taskId: number = yield select((st: RootState) => st.task.targetTask?.id)
        yield put({ type: ActionTypes.getTasks, payload: projectId })
        yield put({ type: ActionTypes.getOneTask, payload: taskId })
    } catch (error) {
        console.error(error)
    }
}

const updateSubTaskStatusSaga = function* ({ payload }: { type: ActionTypes, payload: { id: number } }) {
    try {
        yield call(axios.patch, '/subTask', payload)
        const taskId: number = yield select((st: RootState) => st.task.targetTask?.id)
        yield put({ type: ActionTypes.getOneTask, payload: taskId })

    }
    catch (error) {
        console.log(error)
    }
}

const changeTaskOrderSaga = function* ({ payload }: {
    type: ActionTypes, payload: {
        idTargetPosition: number,
        idElement: number,
        targetStatus: TaskStatus
    }
}) {
    try {
        yield call(axios.patch, '/task/order', payload)
        const projectId: number = yield select((st: RootState) => st.task.targetProjectId)
        yield put({ type: ActionTypes.getTasks, payload: projectId })
    } catch (error) {
        console.error(error)
    }
}

const deleteTaskSaga = function* ({ payload }: { type: ActionTypes, payload: number }) {
    try {
        yield call(axios.delete, `/task/${payload}`)
        const projectId: number = yield select((st: RootState) => st.task.targetProjectId)
        yield put({ type: ActionTypes.getTasks, payload: projectId })
    } catch (error) {
        console.error(error)
    }
}
const changeTaskStatusSaga = function* ({ payload }: {
    type: ActionTypes, payload: {
        idTargetPosition: number,
        idElement: number,
        targetStatus: TaskStatus
    }
}) {
    try {
        yield call(axios.patch, '/task/status', payload)
        const projectId: number = yield select((st: RootState) => st.task.targetProjectId)
        yield put({ type: ActionTypes.getTasks, payload: projectId })
    } catch (error) {
        console.error(error)
    }
}
const createSubTasksSaga = function* ({ payload }: { type: ActionTypes, payload: { text: string, taskId: number } }) {
    try {
        yield call(axios.post, '/subTask', { text: payload.text, taskId: payload.taskId })
        const taskId: number = yield select((st: RootState) => st.task.targetTask?.id)
        yield put({ type: ActionTypes.getOneTask, payload: taskId })
    }
    catch (error) {
        console.error(error)
    }
}
const deleteSubTasksSaga = function* ({ payload }: { type: ActionTypes, payload: number }) {
    try {
        yield call(axios.delete, `/subTask/${payload}`)
        const targetTaskId: number = yield select((st: RootState) => st.task.targetTask?.id)
        yield put({ type: ActionTypes.getOneTask, payload: targetTaskId })
    }
    catch (error) {
        console.error(error)
    }
}
const postFileSaga = function* ({ payload }: { type: ActionTypes, payload: { taskId: number, file: File } }) {
    try {
        const form = new FormData()
        form.append('file', payload.file)
        yield call(axios.post, `/task/${payload.taskId}/upload`, form)
    }
    catch (error) {
        console.error(error)
    }
}
const deleteFileSaga = function* ({ payload }: { type: ActionTypes, payload: number }) {
    try {
        yield call(axios.delete, `/file/${payload}`)
    }
    catch (error) {
        console.error(error)
    }
}


export const updateTaskSagaHundler = function* () {
    yield takeLatest(ActionTypes.updateTask, updateTaskSaga)
}
export const deleteFileSagaHundler = function* () {
    yield takeLatest(ActionTypes.deleteFile, deleteFileSaga)
}
export const postFileSagaHundler = function* () {
    yield takeLatest(ActionTypes.postFile, postFileSaga)
}

export const createSubTasksSagaandler = function* () {
    yield takeLatest(ActionTypes.createSubTask, createSubTasksSaga)
}
export const deleteSubTasksSagaandler = function* () {
    yield takeLatest(ActionTypes.deleteSubTask, deleteSubTasksSaga)
}
export const changeOrderTasksSagaHandler = function* () {
    yield takeLatest(ActionTypes.changeTaskOrder, changeTaskOrderSaga)
}
export const changeStatusTasksSagaHandler = function* () {
    yield takeLatest(ActionTypes.changeTaskStatus, changeTaskStatusSaga)
}
export const createTasksSagaHandler = function* () {
    yield takeLatest(ActionTypes.createTask, createTaskSaga)
}
export const getTasksSagaHandler = function* () {
    yield takeLatest(ActionTypes.getTasks, getTasksSaga)
}
export const deleteTasksSagaHandler = function* () {
    yield takeLatest(ActionTypes.deleteTask, deleteTaskSaga)
}
export const getOneTaskSagaHAndler = function* () {
    yield takeLatest(ActionTypes.getOneTask, getOneTaskSaga)
}
export const updateSubTaskStatusSagaHundler = function* () {
    yield takeLatest(ActionTypes.updateSubTaskStatus, updateSubTaskStatusSaga)
}


export const taskReducers = (state = initialState, action: any): typeof initialState => {
    switch (action.type) {
        case ActionTypes.getTasksFx:
            return {
                ...state,
                tasks: action.payload as Task[]
            }
        case ActionTypes.getOneTaskFx:
            return {
                ...state,
                targetTask: action.payload as Task
            }
        case ActionTypes.targetTaskConfigured:
            return {
                ...state,
                targetTaskIsСonfigured: true
            }
        case ActionTypes.endUpdateSubTaskStatus:
            return {
                ...state,
                targetTaskIsСonfigured: false
            }

        case ActionTypes.getProjectId:
            return {
                ...state,
                targetProjectId: action.payload
            }
        case ActionTypes.openCreateTasktModal:
            return {
                ...state,
                isCreateModalOpen: true,
            }
        case ActionTypes.closeCreateTaskModal:
            return {
                ...state,
                isCreateModalOpen: false,
            }
        case ActionTypes.openUpdateTaskModal:
            return {
                ...state,
                isEditModalOpen: true,
            }
        case ActionTypes.closeUpdateTaskModal:
            return {
                ...state,
                isEditModalOpen: false,
            }

        case ActionTypes.closeInfTaskModal:
            return {
                ...state,
                targetTask: null
            }
        default:
            return state;
    }


}
