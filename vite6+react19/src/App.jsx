import { useEnv } from '@hooks/useCommon.js';
import RootRouter from '@/router.jsx';
import './App.scss';

function App() {
    const env = useEnv();
    return (<RootRouter theme={env.theme}/>);
}

export default App;
