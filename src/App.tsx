import { Outlet } from 'react-router-dom';
import Header from '~/features/Header';


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
