import { useEffect, useRef, useState } from "react"
import { ActionTypes } from "../../store/actionTypes"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { Modal } from "../../ui"


export const CreateProjectModal = () => {
    const isVisible = useAppSelector(({ task }) => task.isCreateModalOpen)
    const dispatch = useAppDispatch()
    const [name, setName] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const createProject = () => {
        dispatch({
            type: ActionTypes.createTask,
        })
        setName('')
    }
    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        createProject()

    }
    useEffect(() => {
        inputRef.current?.focus()
        return () => setName('')
    }, [inputRef, isVisible])
    return (
        <Modal visible={isVisible} onClose={() => dispatch({ type: ActionTypes.closeCreateTaskModal })}>
            <form className='form-project-settings' onSubmit={handleForm}>
                <input ref={inputRef} value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit">
                    Добавить
                </button>
            </form>
        </Modal>
    )
}