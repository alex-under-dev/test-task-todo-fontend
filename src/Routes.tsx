import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { ProjectList, TaskList } from './components'


const routesArr = [
    {
        path: '/',
        component: ProjectList,
    },
    {
        path: '/task/:id',
        component: TaskList,
    }
]

export const Routes = () => {

    return (
        <Router>
            <Switch>
                {routesArr.map((route) => {
                    const Component = route.component
                    return (
                        <Route key={route.path} path={route.path} exact>
                            <Component />
                        </Route>
                    )
                })}
            </Switch>
        </Router>
    )
}
