import { Routes, Route, Link } from 'react-router-dom';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ClassScheduleOverview from './components/class-schedule-overview';

function App() {
    return (
        <>
            <header className="p-3 mb-3 border-bottom">
                <a
                    className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-decoration-none"
                    href="/"
                >
                    ISP Class Schedule Generator
                </a>
                {/* <nav>
                    <ul className="nav justify-content-center">
                        <li>
                            <Link to="/" className="nav-link px-4 fs-5 text-white">
                                Overview Courses
                            </Link>
                        </li>
                    </ul>
                </nav> */}
            </header>
            <main className="mt-5">
                <Routes>
                    <Route path="/" element={<ClassScheduleOverview />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
