import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AliveScope } from 'react-activation';
import App from './App.jsx';
import '@lang/lang.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AliveScope>
            <App />
        </AliveScope>
    </BrowserRouter>
);
