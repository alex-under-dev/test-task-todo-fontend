import { useEffect } from "react"
import { ActionTypes } from "../../store/actionTypes"
import { useAppDispatch } from "../../store/store"
import { Comment } from "../../store/interfaces"

import './styled/commentList.scss'
import { SubCommentForm } from "./SubCommentForm"
import { subCommentList } from "./SubComments"
import { Button } from "../../ui"
import { AiOutlineDelete } from 'react-icons/ai'

type Props = {
    taskId: number,
    commentId: number,
    commentText: string,
    subComments: Comment[]
}
export const CommentList = ({ taskId, commentId, commentText, subComments }: Props) => {
    const dispatch = useAppDispatch()

    useEffect(() => { })

    return (
        <div className="commentList">
            <div className="commentElement">
                {commentText}
                <Button
                    text={'удалить'}
                    icon={<AiOutlineDelete />}
                    onClick={() => {
                        dispatch({
                            type: ActionTypes.deleteComment,
                            payload: commentId
                        });
                    }}
                />
            </div>
            <SubCommentForm
                commentId={commentId}
                taskId={taskId}
            />
            {subCommentList(subComments, taskId)}
        </div>
    );
}
