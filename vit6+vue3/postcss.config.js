
export const postcssConfig = {
    viewportWidth: 375,//设计稿的宽度
    unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
    viewportUnit: 'vw' // 指定需要转换成的视窗单位，建议使用vw
};

export default {
    plugins: {
        'postcss-px-to-viewport-8-plugin': postcssConfig
    }
};