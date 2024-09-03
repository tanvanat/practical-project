import { Link } from 'react-router-dom';

const Home = () => {
    const title = 'Welcome to Website Security Grading System';
    const link = "/Firstpage";

    return (
        <div className="home">
            <div className="flex flex-col items-center min-h-screen text-center bg-black">
                <div className='flex flex-col items-center pt-10 pb-40'>
                    <h1 className="text-2xl font-bold text-blue-500 mb-10 hover:text-blue-800 transition-colors duration-300">
                        {title}
                    </h1>
                    <Link to={link}>
                        <img src="/dragon.png" alt="Logo" className="w-[350px] h-[350px] mt-10" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
