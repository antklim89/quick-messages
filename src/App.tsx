import { Outlet } from 'react-router-dom';
import Header from '~/layouts/Header';


const App = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default App;
