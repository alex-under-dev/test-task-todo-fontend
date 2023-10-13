import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { ActionTypes } from "../../store/actionTypes"
import { Button } from "../../ui"
import { IoMdAdd } from 'react-icons/io'

import './styled/commentForm.scss'

export const CommentForm = () => {
    const dispatch = useAppDispatch()
    const task = useAppSelector(({ task }) => task.targetTask)
    const getComments = () => {
        dispatch({
            type: ActionTypes.getComment,
            payload: task!.id
        })
    }
    const [text, setText] = useState('')
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({
            type: ActionTypes.createComment,
            payload: {
                taskId: task!.id,
                text: text
            }
        })
        getComments()
        setText('')
    }
    if (!task) {
        return null
    }
    return (
        <form className="commentFormContainer" onSubmit={handleForm}>
            <textarea
                className="commentFormTextarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button
                type={'submit'}
                text={'добавить'}
                icon={<IoMdAdd />}
            />
        </form>
    )
}