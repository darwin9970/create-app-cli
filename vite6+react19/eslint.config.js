import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default defineConfig([{
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parserOptions: {
            ecmaFeatures: {
                jsx: true // 启用 JSX 支持
            }
        },
        globals: {
            ...globals.browser,
            ...globals.node
        }
    },
    plugins: {
        js: js,
        // prettier: prettierPlugin,
        import: importPlugin,
        react: reactPlugin,
        'react-refresh': reactRefreshPlugin,
        'react-hooks': reactHooksPlugin
    },
    ignores: ['src/assets/**', 'dist/**'],
    settings: {
        react: { version: '19.0' }, // 明确指定 React 版本
        'import/resolver': {
            'alias': {
                'map': [
                    ['@components', './src/components'],
                    ['@hooks', './src/hooks'],
                    ['@utility', './src/utility'],
                    ['@store', './src/store'],
                    ['@common', './src/common'],
                    ['@lang', './src/lang'],
                    ['@pages', './src/pages']
                ]
            }
        }
    },
    rules: {
        'react/display-name': 'error', // 强制组件有显示名称
        'react/jsx-key': 'error', // 强制列表项有唯一的key属性
        'react/jsx-no-comment-textnodes': 'error', // 禁止将注释作为文本节点
        'react/jsx-no-duplicate-props': 'error', // 禁止重复的props
        'react/jsx-no-target-blank': 'error', // 强制target="_blank"时使用rel="noreferrer"
        'react/jsx-no-undef': 'error', // 禁止使用未定义的JSX组件
        'react/jsx-uses-react': 'error', // 防止React被标记为未使用
        'react/jsx-uses-vars': 'error', // 防止JSX变量被标记为未使用
        'react/no-children-prop': 'error', // 禁止将children作为props传递
        'react/no-danger-with-children': 'error', // 禁止同时使用dangerouslySetInnerHTML和children
        'react/no-deprecated': 'error', // 禁止使用已弃用的方法
        'react/no-direct-mutation-state': 'error', // 禁止直接修改state
        'react/no-find-dom-node': 'error', // 禁止使用findDOMNode
        'react/no-is-mounted': 'error', // 禁止使用isMounted
        'react/no-render-return-value': 'error', // 禁止使用render的返回值
        'react/no-string-refs': 'error', // 禁止使用字符串refs
        'react/no-unescaped-entities': 'error', // 强制转义HTML实体
        'react/no-unknown-property': 'error', // 禁止使用未知的DOM属性
        'react/no-unsafe': 'off', // 允许使用不安全的生命周期方法
        'react/prop-types': 'error', // 强制使用propTypes进行类型检查
        'react/react-in-jsx-scope': 'off', // 强制在JSX中使用React
        'react/require-render-return': 'error', // 强制render方法有返回值
        'react-refresh/only-export-components': [//强制模块只导出 React 组件
            'warn',
            { allowConstantExport: true }
        ],

        'constructor-super': 'error', // 强制在派生类构造函数中调用super()
        'for-direction': 'error', // 强制for循环方向正确
        'getter-return': 'error', // 强制getter必须有返回值
        'no-async-promise-executor': 'error', // 禁止使用async函数作为Promise executor
        'no-case-declarations': 'off', // 禁止在case/default语句中声明变量
        'no-class-assign': 'error', // 禁止重新分配类声明
        'no-compare-neg-zero': 'error', // 禁止与-0比较
        'no-cond-assign': 'error', // 禁止在条件语句中使用赋值操作
        'no-const-assign': 'error', // 禁止重新分配const变量
        'no-constant-binary-expression': 'error', // 禁止在二进制表达式中使用常量
        'no-constant-condition': 'error', // 禁止在条件中使用常量表达式
        'no-control-regex': 'error', // 禁止在正则表达式中使用控制字符
        'no-debugger': 'error', // 禁止使用debugger
        'no-delete-var': 'error', // 禁止删除变量
        'no-dupe-args': 'error', // 禁止函数参数重复
        'no-dupe-class-members': 'error', // 禁止类成员重复
        'no-dupe-else-if': 'error', // 禁止在else if语句中重复条件
        'no-dupe-keys': 'error', // 禁止对象字面量中重复的键
        'no-duplicate-case': 'error', // 禁止switch语句中重复的case标签
        'no-empty': 'error', // 禁止空块语句
        'no-empty-character-class': 'error', // 禁止在正则表达式中使用空字符类
        'no-empty-pattern': 'error', // 禁止空解构模式
        'no-empty-static-block': 'error', // 禁止空的静态块
        'no-ex-assign': 'error', // 禁止重新分配catch子句中的异常
        'no-extra-boolean-cast': 'error', // 禁止不必要的布尔转换
        'no-fallthrough': 'error', // 禁止case语句穿透
        'no-func-assign': 'error', // 禁止重新分配函数声明
        'no-global-assign': 'error', // 禁止重新分配全局变量
        'no-import-assign': 'error', // 禁止重新分配import导入
        'no-invalid-regexp': 'error', // 禁止无效的正则表达式
        'no-irregular-whitespace': 'error', // 禁止不规则的空白字符
        'no-loss-of-precision': 'error', // 禁止数字精度丢失
        'no-misleading-character-class': 'error', // 禁止在字符类中使用误导性字符
        'no-new-native-nonconstructor': 'error', // 禁止使用new调用非构造函数
        'no-nonoctal-decimal-escape': 'error', // 禁止非八进制十进制转义序列
        'no-obj-calls': 'error', // 禁止将全局对象作为函数调用
        'no-octal': 'error', // 禁止使用八进制字面量
        'no-prototype-builtins': 'error', // 禁止直接调用Object.prototype的方法
        'no-redeclare': 'error', // 禁止重复声明变量
        'no-regex-spaces': 'error', // 禁止在正则表达式中使用多个空格
        'no-self-assign': 'error', // 禁止自我赋值
        'no-setter-return': 'error', // 强制setter必须有返回值
        'no-shadow-restricted-names': 'error', // 禁止使用保留字作为变量名
        'no-sparse-arrays': 'error', // 禁止稀疏数组
        'no-this-before-super': 'error', // 禁止在super()之前使用this
        // 'no-undef': 'error', // 禁止使用未声明的变量
        'no-unexpected-multiline': 'error', // 禁止意外的多行表达式
        'no-unreachable': 'error', // 禁止不可达代码
        'no-unsafe-finally': 'error', // 禁止在finally块中使用控制流语句
        'no-unsafe-negation': 'error', // 禁止不安全的否定表达式
        'no-unsafe-optional-chaining': 'error', // 禁止不安全的可选链
        'no-unused-labels': 'error', // 禁止未使用的标签
        'no-unused-private-class-members': 'error', // 禁止未使用的私有类成员
        // 'no-unused-vars': 'error', // 禁止未使用的变量
        'no-useless-backreference': 'error', // 禁止无用的反向引用
        'no-useless-catch': 'error', // 禁止无用的catch子句
        'no-useless-escape': 'error', // 禁止无用的转义字符
        'no-with': 'error', // 禁止使用with语句
        'require-yield': 'error', // 强制生成器函数包含yield
        'use-isnan': 'error', // 要求使用isNaN()检查NaN
        'valid-typeof': 'error', // 强制typeof表达式与有效字符串进行比较
        'default-param-last': 'error', //默认参数在最后
        'default-case-last': 'error', //switch的default在最后
        'eqeqeq': 'error',//要求使用 === 和 !==
        'no-var': 'error', //禁止使用var，强制使用const、let
        'no-nested-ternary': 'error',//禁止嵌套的三元表达
        'no-multiple-empty-lines': 'error', //不允许多个空行
        'no-multi-spaces': 'error', //不允许多个空格
        'no-trailing-spaces': 'error', //不允许行尾空格
        'no-whitespace-before-property': 'error', //不允许属性前有空格
        'no-useless-constructor': 'error', //不允许没有必要的构造函数
        'no-useless-rename': 'error', //不允许没有必要的重命名
        'no-useless-return': 'error', //不允许没有必要的return
        'no-void': 'error', //不允许使用void
        'no-underscore-dangle': 'error', //不允许使用下划线
        'no-empty-function': 'error', //不允许空函数
        'space-infix-ops': 'error',//操作符周围有空格
        'space-unary-ops': 'error',//要求一元操作符周围有空格
        /**
         * 与Prettier冲突的规则
         * 1. indent：类似于 Prettier 的 tabWidth
         * 2. quotes：类似于 Prettier 的 singleQuote
         * 3. semi：类似于 Prettier 的 semi
         * 4. comma-dangle：类似于 Prettier 的 trailingComma
         * 5. object-curly-spacing：类似于 Prettier 的 bracketSpacing
         * 6. arrow-parens：类似于 Prettier 的 arrowParens
         * 7. jsx-quotes：类似于 Prettier 的 jsxSingleQuote
         * 8. linebreak-style：类似于 Prettier 的 endOfLine
         * */
        'indent': ['error', 4], //指定一个制表符等于多少空格
        'quotes': ['error', 'single'], //是否使用单引号
        'semi': ['error', 'always'], //在语句末尾使用分号
        'comma-dangle': ['error', 'never'], //在多行对象字面量和数组字面量的最后一个元素后加逗号
        'object-curly-spacing': ['error', 'always'], //在大括号内部是否加空格
        'arrow-parens': ['error', 'always'], //箭头函数参数周围的括号不能省略
        'jsx-quotes': ['error', 'prefer-double'], //在JSX中使用单引号还是双引号
        'linebreak-style': ['error', 'unix'], //指定文件末尾使用的换行符类型

        'import/first': 'error', //确保所有导入出现在其他语句之前
        'import/order': ['error', {
            'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'], //按组排序
            'pathGroups': [{ //按照路径分组
                'pattern': '@common/**',
                'group': 'internal',
                'position': 'after'
            }, {
                'pattern': '@utility/**',
                'group': 'internal',
                'position': 'after'
            }, {
                'pattern': '@hooks/**',
                'group': 'internal',
                'position': 'after'
            }, {
                'pattern': '@lang/**',
                'group': 'internal',
                'position': 'after'
            }, {
                'pattern': '@store/**',
                'group': 'internal',
                'position': 'after'
            }, {
                'pattern': '@components/**',
                'group': 'internal',
                'position': 'after'
            }, {
                'pattern': '@pages/**',
                'group': 'internal',
                'position': 'after'
            }, {
                'pattern': '@/**',
                'group': 'internal',
                'position': 'after'
            }],
            'newlines-between': 'never' //不允许在整个导入部分中换行
        }]

    // 'prettier/prettier': 'error'
    }
}]);