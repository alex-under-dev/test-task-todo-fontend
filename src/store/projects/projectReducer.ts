import { Project } from "./types";
import { call, put, takeLatest } from 'redux-saga/effects'
import { ActionTypes } from "../actionTypes";
import { axios } from "../../http";

let projectState = {
    projects: [] as Project[],
    isEditModalOpen: false,
    isCreateModalOpen: false,
    projectToEdit: null as null | Project
};

const getProjectsSaga = function* () {
    try {
        const { data } = yield call(axios.get, 'project')
        yield put({ type: ActionTypes.getProjectsFx, payload: data })
    } catch (error) {
        console.error(error)
    }
};


const createProjectsSaga = function* (e: any) {
    try {
        yield call(axios.post, 'project', { title: e.payload })
        yield getProjectsSaga()
        yield put({ type: ActionTypes.closeCreateProjectModal })
    } catch (error) {
        console.error(error)
    }
}

const updateProjectsSaga = function* ({ payload }: { payload: { id: number, name: string }, type: ActionTypes }) {
    try {
        yield call(axios.patch, 'project', { id: payload.id, title: payload.name })
        yield put({ type: ActionTypes.getProjects })
        yield put({ type: ActionTypes.closeUpdateProjectModal })
    } catch (error) {
        console.error(error)
    }
}

const deleteProjectsSaga = function* ({ payload }: { payload: number, type: ActionTypes }) {
    try {
        yield call(axios.delete, `project/${payload}`)
        yield getProjectsSaga()
    } catch (error) {
        console.error(error)
    }
}

const getOneProjectSaga = function* (e: any) {
    try {
        const { data } = yield call(axios.get, `project/${e.payload}`)
        yield put({ type: ActionTypes.getOneProjectFx, payload: data })
    } catch (error) {
        console.error(error)
    }
}


export const createProjectsSagaHandler = function* () {
    yield takeLatest(ActionTypes.createProject, createProjectsSaga)
}
export const getOneProjectSagaHandler = function* () {
    yield takeLatest(ActionTypes.getOneProject, getOneProjectSaga)
}

export const getProjectsSagaHandler = function* () {
    yield takeLatest(ActionTypes.getProjects, getProjectsSaga)
}

export const updateProjectsSagaHandler = function* () {
    yield takeLatest(ActionTypes.updateProject, updateProjectsSaga)
}

export const deleteProjectsSagaHandler = function* () {
    yield takeLatest(ActionTypes.deleteProject, deleteProjectsSaga)
}

export const projectReducer = (state = projectState, action: any): typeof projectState => {
    switch (action.type) {
        case ActionTypes.getProjectsFx:
            return {
                ...state,
                projects: action.payload as Project[]
            };
        case ActionTypes.getOneProjectFx:
            return {
                ...state,
                projectToEdit: action.payload as Project,
                isEditModalOpen: true,
            }
        case ActionTypes.openCreateProjectModal:
            return {
                ...state,
                isCreateModalOpen: true,
            }
        case ActionTypes.closeCreateProjectModal:
            return {
                ...state,
                isCreateModalOpen: false,
            }
        case ActionTypes.openUpdateProjectModal:
            return {
                ...state,
                isEditModalOpen: true,
            }
        case ActionTypes.closeUpdateProjectModal:
            return {
                ...state,
                isEditModalOpen: false,
            }
        default:
            return state;
    }
}


