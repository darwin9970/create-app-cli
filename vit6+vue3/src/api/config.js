import { useEnv } from '@hooks/useCommon.js';

const env = useEnv();

const apiAddress = {
    baseUrl: env.baseUrl
};

const apiOption = {
    api: `${apiAddress.baseUrl}/api`
};


export default apiOption;