import Checkbox from "./Checkbox";
import { useLocation } from 'react-router-dom';
import {info} from './Data';

export default function Output() {
    const location = useLocation();
    const url = location.state?.url;
    const passed = info.filter(i =>
        i.name === 'fdss'
    );
    const listItems = passed.map(i =>
        <li>
            <img
                src={getImageUrl(i)}
                alt={i.name}
            />
            <p>
                <b>{i.name}:</b>
                {'' + i.accomplishment + ''}
            </p>
        </li>
    );
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-3xl font-bold">Scan Results for {url}</h1>
            <p className="mt-4 text-lg">Here are the results of your website scan.</p>
            <ul>{listItems}</ul>
        </div>
    );
}

// const Output = () => {
//     return (
//         <ul className="list-none space-y-2">
//             <Checkbox isCheck={true} name="Update software regularly" />
//             <Checkbox isCheck={true} name="Use strong passwords" />
//             <Checkbox isCheck={false} name="Enable HTTPS" />
//         </ul>
//     );
// }

// export default Output;