import { useEffect } from 'react'
import './styled/projectList.scss'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { ActionTypes } from '../../store/actionTypes'
import { Button } from '../../ui'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { IoMdAdd } from 'react-icons/io'
import { UpdateProjectModal } from '../modals/UpdateProjectModal'
import { CreateProjectModal } from '../modals/CreateProjectModal'


export const ProjectList = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()

    const projects = useAppSelector(({ project }) => project.projects)



    useEffect(() => {
        dispatch({
            type: ActionTypes.getProjects,
        })
        console.log('render')
    }, [])
    return (
        <div className='wrapperProjectList' >
            <UpdateProjectModal />
            <CreateProjectModal />
            <Button
                text='Создать'
                icon={<IoMdAdd />}
                onClick={() => dispatch({ type: ActionTypes.openCreateProjectModal })}
            />
            <div className='projectListContainer'>
                {projects.length > 0 && projects.map(({ id, title }) => {
                    return (
                        <div key={id} className='projectListContent' >
                            <button
                                className='projectListElement'
                                onClick={() => history.push(`task/${id}`)}
                            >
                                {title}
                            </button>
                            <Button
                                text={'Редактировать'}
                                onClick={() => dispatch({ type: ActionTypes.getOneProject, payload: id })}
                                icon={<MdOutlineModeEditOutline />}
                            />
                        </div>
                    )
                })}
            </div>
        </div >
    )
}