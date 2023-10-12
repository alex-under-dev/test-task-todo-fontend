import { useSortDrop } from '../../hooks/useSortDrop'
import { Task } from '../../store/interfaces'
import { ActionTypes } from '../../store/actionTypes'
import { useAppDispatch } from '../../store/store'
import './styled/taskListItem.scss'

type Props = Pick<Task, 'id' | 'header' | 'status'>


export const TaskListItem = ({ id, status, header }: Props) => {
    const { ref } = useSortDrop(id, status)
    const dispatch = useAppDispatch()
    return (
        <div
            ref={ref}
            className="taskListItemElement"
            onClick={() => {
                dispatch({
                    type: ActionTypes.getOneTask,
                    payload: id
                })
            }}
        >
            <div>
                Номер: {id}
            </div>

            <div>
                Задача: {header}
            </div>

        </div>
    )
}