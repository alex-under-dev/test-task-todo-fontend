import { useDrag, useDragLayer, useDrop } from "react-dnd"


import { useAppDispatch } from "../store/store"
import { useRef } from "react"
import { ActionTypes } from "../store/actionTypes"
import { TaskStatus } from "../store/interfaces"


export const useSortDrop = (id: number, status: TaskStatus) => {
    const ref = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    const [__, drag] = useDrag<{ id: number }, unknown, { __: boolean }>(() => ({
        type: 'TASK_CARD',
        item: {
            id, status
        },
    }), [id, status])

    const [_, drop] = useDrop({
        accept: 'TASK_CARD',
        drop(item: { id: number, status: TaskStatus, order: number }) {
            if (item.status === status) {
                return dispatch({
                    type: ActionTypes.changeTaskOrder,
                    payload: {
                        idTargetPosition: id,
                        idElement: item.id,
                        targetStatus: status,
                    }
                })
            }
            dispatch({
                type: ActionTypes.changeTaskStatus,
                payload: {
                    idElement: item.id,
                    targetStatus: status,
                }
            })
        },
    }, [status, id])

    const { isDragging, item } = useDragLayer(monitor => ({
        isDragging: monitor.isDragging(),
        item: monitor.getItem(),
    }));

    drag(drop(ref))
    return (
        { ref, item }
    )
}