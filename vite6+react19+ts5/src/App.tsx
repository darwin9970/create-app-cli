import { useEnv } from '@hooks/useCommon.ts';
import RootRouter from '@/router.tsx';
import './App.scss';


function App() {
    const env: Hooks.Env = useEnv();
    return (<RootRouter theme={env.theme}/>);
}

export default App;
