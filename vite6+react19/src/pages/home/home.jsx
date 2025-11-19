import { Button,Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import requests from '@common/requests.js';
import storageUtil from '@utility/storageUtil.js';
import { useEnv } from '@hooks/useCommon.js';
import { changeLanguage } from '@lang/lang.js';
import { langEnum } from '@lang/enum.js';
import { store } from '@store/redux.js';
import { demoStoreAction } from '@store/demoStore.js';
import styles from './home.module.scss';

const Home = ()=>{
    const demoStore = useSelector((state) => state.demoStore);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const updateDemoStore = () => {
        store.dispatch(demoStoreAction.updateState({
            userName: ['张三','李四','王五'][Math.floor(Math.random() * 3)]
        }));
        //dispatch(demoStoreAction.updateState({userName: '李四'}))
    };

    const axiosTest = async () => {
        return (await requests.get('https://randomuser.me/api/'));
    };
    axiosTest().then((result) => {
        console.log('请求结果：', result);
    });

    console.log('当前环境', useEnv());

    return (<>
        <Button type="primary" onClick={updateDemoStore}>修改store</Button>
        <div className={styles.store} style={{ fontSize: '16px' }}>{demoStore.userName}</div>
        <div>
            <Radio.Group onChange={changeLanguage} value={storageUtil.getLanguage()}>
                <Radio value={langEnum.zh}>中文</Radio>
                <Radio value={langEnum.en}>英文</Radio>
            </Radio.Group>
            <p>{t('ok')} </p>
            <i className="iconfont icon-fanhui"></i>
        </div>
    </>);
};

export default Home;