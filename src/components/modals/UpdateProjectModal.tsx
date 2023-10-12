import { useCallback, useEffect, useRef, useState } from 'react'
import { ActionTypes } from '../../store/actionTypes'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Button, Input, Modal } from '../../ui'
import './styled/updateProjectModal.scss'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { AiOutlineDelete } from 'react-icons/ai'

export const UpdateProjectModal = () => {
    const dispatch = useAppDispatch()

    const inputRef = useRef<HTMLInputElement>(null)
    const isModalOpen = useAppSelector(({ project }) => project.isEditModalOpen)
    const projectToEdit = useAppSelector(({ project }) => project.projectToEdit)
    const [name, setName] = useState('')

    const deleteProject = useCallback(() => {
        if (window.confirm('Вы действительно хотите удалить проект?')) {
            dispatch({
                type: ActionTypes.deleteProject,
                payload: projectToEdit!.id
            })
            dispatch({ type: ActionTypes.closeUpdateProjectModal })
        }
    }, [projectToEdit])


    const renameProject = useCallback(() => {
        dispatch({
            type: ActionTypes.updateProject,
            payload: {
                id: projectToEdit!.id,
                name
            }
        })
        setName('')
    }, [projectToEdit, name])

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        renameProject()
    }

    useEffect(() => {
        setName(projectToEdit?.title || '')
        inputRef.current?.focus()
        return () => setName('')
    }, [projectToEdit])


    return (
        <Modal visible={isModalOpen} onClose={() => dispatch({ type: ActionTypes.closeUpdateProjectModal })}>
            <form className='updateProjectModalWrapper' onSubmit={handleForm} >
                <Input
                    ref={inputRef}
                    value={name}
                    onChange={setName}
                />
                <div className='updateProjectModalButtonBlock'>
                    <Button
                        type={'submit'}
                        text={'Изменить'}
                        icon={<MdOutlineModeEditOutline />}
                        onClick={() => dispatch({
                            type: ActionTypes.updateProject,
                            payload: {
                                id: projectToEdit!.id,
                                name: name
                            }
                        })}
                    />
                    <Button
                        text={'удалить'}
                        icon={<AiOutlineDelete />}
                        onClick={deleteProject}

                    />
                </div>
            </form>
        </Modal>
    )
}