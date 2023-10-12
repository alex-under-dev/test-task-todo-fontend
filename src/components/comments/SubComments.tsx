import { Comment } from "../../store/interfaces"
import { CommentList } from "./CommentList"


export const subCommentList = (subComments: Comment[], taskId: number) => {
    if (!subComments) {
        return null
    }

    return subComments.map((e) => (
        <CommentList
            key={e.id}
            taskId={taskId}
            commentId={e.id}
            commentText={e.text}
            subComments={e.children}
        />
    ))
}