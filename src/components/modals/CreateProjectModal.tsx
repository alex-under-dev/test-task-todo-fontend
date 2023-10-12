import { useEffect, useRef, useState } from "react"
import { ActionTypes } from "../../store/actionTypes"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { Button, Input, Modal } from "../../ui"
import './styled/createProjectModal.scss'
import { IoMdAdd } from 'react-icons/io'


export const CreateProjectModal = () => {
    const isVisible = useAppSelector(({ project }) => project.isCreateModalOpen)
    const dispatch = useAppDispatch()
    const [name, setName] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const createProject = () => {
        dispatch({
            type: ActionTypes.createProject,
            payload: name
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
        <Modal visible={isVisible} onClose={() => dispatch({ type: ActionTypes.closeCreateProjectModal })}>
            <form className='createProjectModalWrapper' onSubmit={handleForm}>
                <Input
                    ref={inputRef}
                    value={name}
                    onChange={setName}
                />
                <Button
                    text='Добавить'
                    icon={<IoMdAdd />}
                    type={'submit'}
                />
            </form>
        </Modal>
    )
}