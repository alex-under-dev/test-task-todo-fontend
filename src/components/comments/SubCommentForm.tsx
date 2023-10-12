import { useState } from "react"
import { ActionTypes } from "../../store/actionTypes"
import { useAppDispatch } from "../../store/store"
import { IoMdAdd } from "react-icons/io"
import { Button } from "../../ui"
import './styled/subCommentsForm.scss'
type Props = {
    commentId: number,
    taskId: number
}

export const SubCommentForm = ({ commentId, taskId }: Props) => {
    const dispatch = useAppDispatch()
    const [text, setText] = useState('')
    const handleForm = () => {
        dispatch({
            type: ActionTypes.createComment,
            payload: { text, commentId, taskId }
        })
        setText('')
    }

    return (
        <form
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    handleForm()
                }
            }}
            className="subCommentFormContainer">
            <textarea
                className="subCommentFormTextarea"
                value={text}
                onChange={(e) => setText(e.target.value)} />
            <Button
                type={'submit'}
                text={'добавить'}
                icon={<IoMdAdd />}
            />
        </form>
    )
}