import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '~/routes';


const Router: FC = () => {
    return (
        <Routes>
            {Object.values(routes).map(({ path, element }) => (
                <Route element={element} key={path} path={path} />
            ))}
        </Routes>
    );
};

export default Router;

