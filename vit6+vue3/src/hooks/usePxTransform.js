const postConfig = import.meta.env.postConfig;

/**
 * @method usePxToVwView px转换vw
 * @param px {Number | String} 需要转换的px值
 * @returns {String} 转换后的值
 * */
const usePxToVwView = (px) => {
    const pxValue = typeof px === 'string' ? parseFloat(px) : px;
    const transformVw = pxValue / (postConfig.viewportWidth / 100);
    return `${transformVw.toFixed(postConfig.unitPrecision)}vw`;
};

export default usePxToVwView;