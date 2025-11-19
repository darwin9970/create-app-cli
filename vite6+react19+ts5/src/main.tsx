import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AliveScope } from 'react-activation';
import App from './App.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AliveScope>
            <App />
        </AliveScope>
    </BrowserRouter>
);
