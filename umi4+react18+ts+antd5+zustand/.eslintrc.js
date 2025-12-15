module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    // 关闭需要额外插件的规则
    'react-refresh/only-export-components': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    '@typescript-eslint/no-wrapper-object-types': 'off',
    'import/first': 'off',
    'import/order': 'off',
    // 放宽部分规则
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-empty-function': 'off',
    'no-underscore-dangle': 'off'
  }
};
