export enum ActionTypes {
    getProjects = "RUN_GET_PROJECTS",
    getProjectsFx = "GET_PROJECTS",
    createProject = "CREATE_PROJECTS",
    updateProject = "UPDATE_PROJECT",
    deleteProject = "DELETE_PROJECT",
    getOneProject = "RUN_GET_ONEP_PROJECT",
    getOneProjectFx = "GET_ONE_PPROJECT",


    openCreateProjectModal = "OPEN_CREATE_PROJECT_MODAL",
    closeCreateProjectModal = "CLOSE_CREATE_PROJECT_MODAL",
    openUpdateProjectModal = "OPEN_UPDATE_PROJECT_MODAL",
    closeUpdateProjectModal = "CLOSE_UPDATE_PROJECT_MODAL",

    openCreateTasktModal = "OPEN_CREATE_TASK_MODAL",
    closeCreateTaskModal = "CLOSE_CREATE_TASK_MODAL",
    openUpdateTaskModal = "OPEN_UPDATE_TASK_MODAL",
    closeUpdateTaskModal = "CLOSE_UPDATE_TASK_MODAL",


    closeInfTaskModal = "CLOSE_INF_TASK_MODAL",


    getTasks = "RUN_GET_TASKS",
    getTasksFx = "GET_TASKS",
    changeTaskOrder = "CHANGE_TASK_ORDER",
    changeTaskStatus = "CHANGE_TASK_STATUS",
    createTask = "CREATE_TASL",
    getOneTask = "RUN_GET_ONE_TASK",
    getOneTaskFx = "GET_ONE_TASK",
    getProjectId = "GET_PROJECT_ID",
    targetTaskConfigured = "TARGET_TAST_CONFOGURED",
    deleteTask = "DELETE_TASK",
    updateTask = "UPDATE_TASK",

    postFile = "POST_FILE",
    deleteFile = "DELETE_FILE",

    getComment = "RUN_GET_COMMENT",
    getCommentFx = "GET_COMMENT",
    createComment = "RUN_CREATE_COMMENT",
    deleteComment = "RUN_DELETE_COMMENT",

    updateSubTaskStatus = "UPDATE_SUBTASK_STATUS",
    endUpdateSubTaskStatus = "END_UPDATE_SUBTASK_STATUS",
    createSubTask = "CREATE_SUBTASK",
    deleteSubTask = "RUN_DELETE_SUBTASK",
}