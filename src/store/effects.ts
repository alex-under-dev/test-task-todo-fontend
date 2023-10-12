import { all } from "redux-saga/effects";
import { updateProjectsSagaHandler, createProjectsSagaHandler, deleteProjectsSagaHandler, getOneProjectSagaHandler, getProjectsSagaHandler } from "./projects/projectReducer";
import { changeOrderTasksSagaHandler, changeStatusTasksSagaHandler, createSubTasksSagaandler, createTasksSagaHandler, deleteFileSagaHundler, deleteSubTasksSagaandler, deleteTasksSagaHandler, getOneTaskSagaHAndler, getTasksSagaHandler, postFileSagaHundler, updateSubTaskStatusSagaHundler, updateTaskSagaHundler } from "./tasks/taskReducer";
import { createCommentSagaHundler, deleteCommentSagaHundler, getCommentsSagaHundler } from "./comments/commentReducer";

export function* rootSaga() {
    yield all([
        getProjectsSagaHandler(),
        createProjectsSagaHandler(),
        deleteProjectsSagaHandler(),
        updateProjectsSagaHandler(),
        getTasksSagaHandler(),
        createTasksSagaHandler(),
        getOneProjectSagaHandler(),
        changeOrderTasksSagaHandler(),
        deleteTasksSagaHandler(),
        changeStatusTasksSagaHandler(),
        getOneTaskSagaHAndler(),
        getCommentsSagaHundler(),
        createCommentSagaHundler(),
        deleteCommentSagaHundler(),
        updateSubTaskStatusSagaHundler(),
        createSubTasksSagaandler(),
        deleteSubTasksSagaandler(),
        postFileSagaHundler(),
        deleteFileSagaHundler(),
        updateTaskSagaHundler(),
    ])
}