import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout, Notfound } from './shell/components';
import { AppUrlEnum } from './core/const/route.enums';
import { User, UserList } from './features';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Navigate to={`/${AppUrlEnum.USER}/${AppUrlEnum.LIST}`} />
            },
            {
                path: `${AppUrlEnum.USER}/${AppUrlEnum.LIST}`,
                element: <UserList />,
            },
            {
                path: `${AppUrlEnum.USER}/${AppUrlEnum.ADD}`,
                element: <User />
            },
            {
                path: `${AppUrlEnum.USER}/:id`,
                element: <User />
            }
        ]
    },
    {
        path: '*',
        element: <Notfound />
    }
], {
    basename: '/user_management',
});
