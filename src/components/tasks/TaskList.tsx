import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { ActionTypes } from "../../store/actionTypes"
import { useParams } from "react-router-dom"
import './styled/taskList.scss'
import { InfTaskModal } from "../modals/InfTaskModal"
import { TaskCategory } from "./TaskCategory"
import { IoMdAdd } from 'react-icons/io'
import { Button } from "../../ui"

const categories = {
    queue: "queue",
    development: "development",
    done: "done",
}
export const TaskList = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const tasks = useAppSelector(({ task }) => task.tasks)
    useEffect(() => {
        dispatch({
            type: ActionTypes.getTasks,
            payload: id,
        })
        dispatch({
            type: ActionTypes.getProjectId,
            payload: id,
        })
    }, [])

    return (
        <div className="taskListWrapper">
            <InfTaskModal />
            <div className="taskListHeader">
                <Button
                    text='Создать шаблон задачи'
                    icon={<IoMdAdd />}
                    onClick={() => dispatch({
                        type: ActionTypes.createTask,
                        payload: { projectId: id }
                    })}
                />
            </div>
            <div className="taskListContainer">
                {Object.entries(categories).map(([status, statusName], index) => {
                    return (
                        <TaskCategory
                            key={status}
                            tasks={tasks}
                            statusName={statusName}
                        />
                    )

                })}
            </div>
        </div>
    )
}