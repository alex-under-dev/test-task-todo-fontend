import { useEffect, useState } from "react"
import { ActionTypes } from "../../store/actionTypes"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { Button, Modal } from "../../ui"
import './styled/InfTaskModal.scss'
import { CommentForm } from "../comments/CommentForm"
import { CommentList } from "../comments/CommentList"
import { TargetTaskConfig } from "../tasks/TargetTaskConfig"
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { TfiComments } from 'react-icons/tfi'




export const InfTaskModal = () => {
    const dispatch = useAppDispatch()
    const task = useAppSelector(({ task }) => task.targetTask)
    const [commentIsVisible, setCommentIsVisible] = useState(false)
    const isConfigured = useAppSelector(({ task }) => task.targetTaskIsСonfigured)
    const comments = useAppSelector(({ comment }) => comment.comments)
    const getComments = () => {
        dispatch({
            type: ActionTypes.getComment,
            payload: task!.id
        })
    }

    useEffect(() => {
        return () => {
            setCommentIsVisible(false)
        }
    }, [task])

    if (!task) {
        return null
    }
    if (isConfigured) {
        return (
            <Modal visible={Boolean(task)} onClose={() => dispatch({ type: ActionTypes.closeInfTaskModal })}>
                <TargetTaskConfig />
            </Modal>
        )
    }
    return (
        <Modal visible={Boolean(task)} onClose={() => dispatch({ type: ActionTypes.closeInfTaskModal })}>
            <div className="infTaskModalWrapper">
                <div>
                    Номер: {task.id}
                </div>

                <div>
                    Задача: {task.header}
                </div>

                <div>
                    Приотитет: {task.priority}
                </div>
                <div>
                    Описание:  {task.text}
                </div>
                <div>
                    Файлы:  {!task.files
                        ? 'Отсутствуют'
                        : task.files.map((e) => {
                            return (
                                <div key={e.id}>

                                    <a download={e.original_name} href={`/storage/${e.file_name}`}>   {e.original_name}</a>
                                </div>
                            )
                        })}
                </div>
                <div>
                    Cоздано:  {task.created_at_format}
                </div>
                <div>
                    Завершено :  {task.finished_at || 'Выполняется'}
                </div>
                <div>
                    Время в работе : {task.timesInWork}
                </div>
                <div>
                    Подзадачи : {!task.sub_tasks.length
                        ? 'Отсутствуют'
                        : task.sub_tasks.map((e) => {
                            return (
                                <div key={e.id}>
                                    <input
                                        type="checkbox"
                                        checked={e.is_completed}
                                        onChange={() => dispatch({
                                            type: ActionTypes.updateSubTaskStatus,
                                            payload: { id: e.id }
                                        })}
                                    />
                                    {e.text}
                                </div>
                            )
                        })}
                </div>
                <div className="infTaskModalButtonBlock">
                    <Button
                        text={'Редактировать'}
                        onClick={() => dispatch({ type: ActionTypes.targetTaskConfigured })}
                        icon={<MdOutlineModeEditOutline />}
                    />
                    <Button
                        text={'Комментарии'}
                        onClick={() => {
                            getComments()
                            setCommentIsVisible(!commentIsVisible)
                        }}
                        icon={<TfiComments />}
                    />
                </div>
                <div className="infTaskModalComments" style={{ display: commentIsVisible ? 'flex' : 'none' }}>
                    <CommentForm />
                    {comments?.filter((e) => !e.parent_id).map((e) => {
                        return (
                            <CommentList
                                key={e.id}
                                taskId={task.id}
                                commentId={e.id}
                                commentText={e.text}
                                subComments={e.children}
                            />
                        )
                    })}

                </div>
            </div>
        </Modal>
    )
}