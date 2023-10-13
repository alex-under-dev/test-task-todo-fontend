import { useCallback, useEffect, useState } from "react"
import { TaskPriority, TaskStatus } from "../../store/interfaces"
import { ActionTypes } from "../../store/actionTypes"
import { useAppDispatch, useAppSelector } from "../../store/store"

import './styled/targetTaskConfig.scss'
import { useDropzone } from "react-dropzone"
import { AiOutlineDelete } from "react-icons/ai"
import { Button, Input } from "../../ui"
import { MdOutlineModeEditOutline } from "react-icons/md"

const priorityOptions = [
    { value: 'high', label: 'Высокий' },
    { value: 'medium', label: 'Средний' },
    { value: 'low', label: 'Низкий' },
];
const statusOptions = [
    { value: 'queue', label: 'В очереди' },
    { value: 'development', label: 'В работе' },
    { value: 'done', label: 'Завершено' },
];

export const TargetTaskConfig = () => {
    const isConfigured = useAppSelector(({ task }) => task.targetTaskIsСonfigured)
    const dispatch = useAppDispatch()
    const task = useAppSelector(({ task }) => task.targetTask)
    const [header, setHeader] = useState(task?.header)
    const [priority, setPriority] = useState<TaskPriority>(task!.priority)
    const [status, setStatus] = useState<TaskStatus>(task!.status)
    const [text, setText] = useState(task?.text || '')
    const [subTaskText, setSubTaskText] = useState('')
    const onDrop = useCallback((files: File[]) => {
        for (const file of files) {
            dispatch({
                type: ActionTypes.postFile,
                payload: {
                    file: file,
                    taskId: task!.id,
                },
            })
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({
            type: ActionTypes.createSubTask,
            payload: {
                text: subTaskText,
                taskId: task!.id
            }
        })
        setSubTaskText('')
    }
    useEffect(() => {
        return () => {
            dispatch({ type: ActionTypes.endUpdateSubTaskStatus })
        }
    }, [])
    if (!isConfigured || !task) {
        return null
    }
    return (
        <div className="targetTaskConfigWrapper">
            <Button
                text={'удалить'}
                icon={<AiOutlineDelete />}
                onClick={() => {
                    dispatch({
                        type: ActionTypes.deleteTask,
                        payload: task.id
                    })
                    dispatch({ type: ActionTypes.closeInfTaskModal })
                }}
            />
            <div>
                Номер:{task.id}
            </div>
            <div>
                Задача: <Input value={header} onChange={setHeader} />

            </div>

            <div>
                Приотитет: <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
                    {priorityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="targetTaskConfigElement">
                Описание:  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="targetTaskConfigTextarea"
                />
            </div>
            <div>
                Файлы:  {!task.files
                    ? 'Отсутствуют'
                    : task.files.map((e) => {
                        return (
                            <div className="targetTaskConfigElement" key={e.id}>
                                {e.original_name}
                                <Button
                                    text={'удалить'}
                                    icon={<AiOutlineDelete />}
                                    onClick={() => {
                                        dispatch({
                                            type: ActionTypes.deleteFile,
                                            payload: e.id
                                        })
                                    }}
                                />
                            </div>
                        )
                    })}
                <div {...getRootProps()} className="targetTaskConfigDropzone">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Отпустите файл ...</p>
                    ) : (
                        <p>Для добавления перетащитей файл, или нажмите сюда.</p>)}
                </div>
            </div>
            <div>
                Статус : <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
                    {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <form onSubmit={handleForm} >
                    Подзадачи : <Input
                        value={subTaskText}
                        onChange={setSubTaskText}
                    />
                    <button
                        type="submit"
                    >Добавить</button>
                </form>

                {task.sub_tasks.map((e) => {
                    return (
                        <div className="targetTaskConfigElement" key={e.id}>
                            <input
                                type="checkbox"
                                checked={e.is_completed}
                                onChange={() => dispatch({
                                    type: ActionTypes.updateSubTaskStatus,
                                    payload: { id: e.id }
                                })}
                            />
                            {e.text}
                            <Button
                                text={'удалить'}
                                icon={<AiOutlineDelete />}
                                onClick={() => {
                                    dispatch({ type: ActionTypes.deleteSubTask, payload: e.id })
                                }}
                            />
                        </div>
                    )
                })}
            </div >
            <Button
                text={'Изменить'}
                onClick={() => {
                    dispatch({
                        type: ActionTypes.updateTask,
                        payload: {
                            id: task.id,
                            header,
                            text,
                            priority,
                            status
                        }
                    })
                    dispatch({ type: ActionTypes.endUpdateSubTaskStatus })
                }}
                icon={<MdOutlineModeEditOutline />}
            />
        </div >
    )
}