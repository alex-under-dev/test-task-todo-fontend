import { useDrop } from 'react-dnd'
import { useAppDispatch } from '../../store/store'
import { TaskListItem } from './TaskListItem'
import './styled/taskCategory.scss'
import { Task, TaskStatus } from '../../store/interfaces'
import { ActionTypes } from '../../store/actionTypes'

type Props = {
    statusName: string,
    tasks: Task[]
}

export const TaskCategory = ({ statusName, tasks }: Props) => {
    const dispatch = useAppDispatch()
    const [_, drop] = useDrop({
        accept: 'TASK_CARD',
        drop(item: { id: number, status: TaskStatus, order: number }) {
            dispatch({
                type: ActionTypes.changeTaskStatus,
                payload: {
                    idElement: item.id,
                    targetStatus: statusName,
                }
            })
        }
    })
    return (
        <div className="taskCategoryWrapper" ref={drop} >
            <div className='taskCategoryHeader'>
                {statusName}
            </div>
            {
                tasks?.filter((e) => e.status === statusName).map((el) => {
                    return (
                        <TaskListItem
                            key={el.id}
                            {...el}
                        />
                    )
                })
            }
        </div>
    )
}