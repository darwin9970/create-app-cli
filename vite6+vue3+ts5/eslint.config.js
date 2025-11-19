import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import vueParser from 'vue-eslint-parser';
import vuePlugin from 'eslint-plugin-vue';

export default defineConfig([{
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: vueParser,
        parserOptions: {
            parser: tsEslint.parser,
            extraFileExtensions: ['.vue'],
            ecmaFeatures: {
                jsx: true
            }
        },
        globals: {
            ...globals.browser,
            ...globals.node
        }
    },
    plugins: {
        ...tsEslint.configs.base.plugins,
        js: js,
        vue: vuePlugin,
        import: importPlugin
    // prettier: prettierPlugin
    },
    ignores: ['src/assets/**', 'dist/**'],
    settings: {
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
        'vue/multi-word-component-names': 'off', // 强制组件名使用多个单词
        'vue/no-arrow-functions-in-watch': 'error', // 禁止在 watch 中使用箭头函数
        'vue/no-async-in-computed-properties': 'error', // 禁止在计算属性中使用异步操作
        'vue/no-child-content': 'error', // 禁止在子组件中使用内容插槽
        'vue/no-computed-properties-in-data': 'error', // 禁止在 data 中定义计算属性
        'vue/no-deprecated-data-object-declaration': 'error', // 禁止使用已弃用的 data 对象声明方式
        'vue/no-deprecated-delete-set': 'error', // 禁止使用已弃用的 $delete 和 $set
        'vue/no-deprecated-destroyed-lifecycle': 'error', // 禁止使用已弃用的 destroyed 生命周期钩子
        'vue/no-deprecated-dollar-listeners-api': 'error', // 禁止使用已弃用的 $listeners API
        'vue/no-deprecated-dollar-scopedslots-api': 'error', // 禁止使用已弃用的 $scopedSlots API
        'vue/no-deprecated-events-api': 'error', // 禁止使用已弃用的事件 API
        'vue/no-deprecated-filter': 'error', // 禁止使用已弃用的过滤器
        'vue/no-deprecated-functional-template': 'error', // 禁止使用已弃用的函数式模板
        'vue/no-deprecated-html-element-is': 'error', // 禁止使用已弃用的 is 属性
        'vue/no-deprecated-inline-template': 'error', // 禁止使用已弃用的内联模板
        'vue/no-deprecated-model-definition': 'error', // 禁止使用已弃用的 model 定义方式
        'vue/no-deprecated-props-default-this': 'error', // 禁止在 props 默认值中使用 this
        'vue/no-deprecated-router-link-tag-prop': 'error', // 禁止使用已弃用的 router-link 的 tag 属性
        'vue/no-deprecated-scope-attribute': 'error', // 禁止使用已弃用的 scope 属性
        'vue/no-deprecated-slot-attribute': 'error', // 禁止使用已弃用的 slot 属性
        'vue/no-deprecated-slot-scope-attribute': 'error', // 禁止使用已弃用的 slot-scope 属性
        'vue/no-deprecated-v-bind-sync': 'error', // 禁止使用已弃用的 .sync 修饰符
        'vue/no-deprecated-v-is': 'error', // 禁止使用已弃用的 v-is 指令
        'vue/no-deprecated-v-on-native-modifier': 'error', // 禁止使用已弃用的 .native 修饰符
        'vue/no-deprecated-v-on-number-modifiers': 'error', // 禁止使用已弃用的数字修饰符
        'vue/no-deprecated-vue-config-keycodes': 'error', // 禁止使用已弃用的 Vue.config.keyCodes
        'vue/no-dupe-keys': 'error', // 禁止重复的 key 属性
        'vue/no-dupe-v-else-if': 'error', // 禁止重复的 v-else-if 条件
        'vue/no-duplicate-attributes': ['error', { //不允许重复的attributes，除了class、style
            'allowCoexistClass': true,
            'allowCoexistStyle': true
        }],
        'vue/no-export-in-script-setup': 'error', // 禁止在 script setup 中使用 export
        'vue/no-expose-after-await': 'error', // 禁止在 await 后使用 expose
        'vue/no-lifecycle-after-await': 'error', // 禁止在 await 后使用生命周期钩子
        'vue/no-mutating-props': 'error', // 禁止直接修改 props
        'vue/no-parsing-error': 'error', // 禁止解析错误
        'vue/no-ref-as-operand': 'error', // 禁止将 ref 作为操作数
        'vue/no-reserved-component-names': 'off', // 禁止使用保留的组件名
        'vue/no-reserved-keys': 'error', // 禁止使用保留的 key
        'vue/no-reserved-props': 'error', // 禁止使用保留的 prop 名
        'vue/no-shared-component-data': 'error', // 禁止共享组件数据
        'vue/no-side-effects-in-computed-properties': 'error', // 禁止在计算属性中产生副作用
        'vue/no-template-key': 'error', // 禁止在模板中使用 key
        'vue/no-textarea-mustache': 'error', // 禁止在 textarea 中使用 mustache 语法
        'vue/no-unused-components': 'error', // 禁止未使用的组件
        'vue/no-unused-vars': 'error', // 禁止未使用的变量
        'vue/no-use-computed-property-like-method': 'error', // 禁止像方法一样使用计算属性
        'vue/no-use-v-if-with-v-for': 'error', // 禁止在同一元素上同时使用 v-if 和 v-for
        'vue/no-useless-template-attributes': 'error', // 禁止无用的模板属性
        'vue/no-v-for-template-key-on-child': 'error', // 禁止在子组件上使用 v-for 的 template key
        'vue/no-v-text-v-html-on-component': 'error', // 禁止在组件上使用 v-text 和 v-html
        'vue/no-watch-after-await': 'error', // 禁止在 await 后使用 watch
        'vue/prefer-import-from-vue': 'error', // 强制从 vue 导入
        'vue/require-component-is': 'error', // 要求使用 is 属性
        'vue/require-prop-type-constructor': 'error', // 要求 prop 类型使用构造函数
        'vue/require-render-return': 'error', // 要求 render 函数有返回值
        'vue/require-slots-as-functions': 'error', // 要求插槽作为函数使用
        'vue/require-toggle-inside-transition': 'error', // 要求在 transition 内部使用 toggle
        'vue/require-v-for-key': 'error', // 要求使用 v-for 时带 key
        'vue/require-valid-default-prop': 'error', // 要求 prop 的默认值有效
        'vue/return-in-computed-property': 'error', // 要求计算属性有返回值
        'vue/return-in-emits-validator': 'error', // 要求 emits 验证器有返回值
        'vue/use-v-on-exact': 'error', // 要求使用精确的 v-on
        'vue/valid-attribute-name': 'error', // 校验有效的属性名
        'vue/valid-define-emits': 'error', // 校验有效的 defineEmits
        'vue/valid-define-options': 'error', // 校验有效的 defineOptions
        'vue/valid-define-props': 'error', // 校验有效的 defineProps
        'vue/valid-next-tick': 'error', // 校验有效的 nextTick
        'vue/valid-template-root': 'error', // 校验有效的模板根元素
        'vue/valid-v-bind': 'error', // 校验有效的 v-bind
        'vue/valid-v-cloak': 'error', // 校验有效的 v-cloak
        'vue/valid-v-else-if': 'error', // 校验有效的 v-else-if
        'vue/valid-v-else': 'error', // 校验有效的 v-else
        'vue/valid-v-for': 'error', // 校验有效的 v-for
        'vue/valid-v-html': 'error', // 校验有效的 v-html
        'vue/valid-v-if': 'error', // 校验有效的 v-if
        'vue/valid-v-is': 'error', // 校验有效的 v-is
        'vue/valid-v-memo': 'error', // 校验有效的 v-memo
        'vue/valid-v-model': 'error', // 校验有效的 v-model
        'vue/valid-v-on': 'error', // 校验有效的 v-on
        'vue/valid-v-once': 'error', // 校验有效的 v-once
        'vue/valid-v-pre': 'error', // 校验有效的 v-pre
        'vue/valid-v-show': 'error', // 校验有效的 v-show
        'vue/valid-v-slot': 'error', // 校验有效的 v-slot
        'vue/valid-v-text': 'error', // 校验有效的 v-text
        'vue/v-on-style': 'error', //禁止使用 v-on 指令的风格
        'vue/no-v-text': 'error', //禁止使用 v-text 指令的名称采用多个单词的命名约定
        'vue/v-bind-style': 'error', //禁止使用 v-bind 指令的风格
        'vue/no-empty-component-block': 'error', //禁止在组件中出现空的 <template>、<script> 或 <style> 块
        'vue/mustache-interpolation-spacing': 'error', //强制插值表达式周围的空格
        'vue/require-default-prop': 'off', //要求 prop 定义了默认值
        'vue/space-infix-ops': 'error', //操作符周围有空格
        'vue/space-unary-ops': 'error', //要求一元操作符周围有空格
        'vue/require-prop-comment': 'error', //要求在 prop 上有注释
        'vue/no-spaces-around-equal-signs-in-attribute': 'error', //不允许属性中的等号周围有空格
        'vue/attribute-hyphenation': ['error', 'never'], //标签属性使用驼峰
        'vue/script-indent': ['error', 4], //保持script缩进样式一致
        'vue/html-indent': ['error', 4, { //保持标签缩进样式一致
            'alignAttributesVertically': true
        }],
        'vue/v-on-event-hyphenation': ['error', 'never', { //事件名不使用带连字符的名称，如：custom-event报错，customEvent正确
            'autofix': true
        }],
        'vue/block-order': ['error', { //在单文件组件中 <template>、<script> 和 <style> 的顺序正确
            'order': ['template', 'script[setup]', 'style[scoped]', 'style:not([scoped])']
        }],
        'vue/html-quotes': ['error', 'double', { //强制HTML 属性值为双引号
            'avoidEscape': false
        }],
        'vue/html-self-closing': ['error', { //无内容元素自闭合标签样式
            'html': {
                'void': 'never',
                'normal': 'never',
                'component': 'never'
            }
        }],
        'vue/html-closing-bracket-newline': ['error', { //闭合标签的右括号之前不使用换行符
            'singleline': 'never',
            'multiline': 'never'
        }],
        'vue/html-closing-bracket-spacing': ['error', { //标签闭合是否有空格
            'startTag': 'never',
            'endTag': 'never'
        }],
        'vue/first-attribute-linebreak': ['error', { //Vue模板中第一个属性之前不使用换行符
            'singleline': 'beside',
            'multiline': 'beside'
        }],
        'vue/max-attributes-per-line': ['error', { //Vue模板中每行属性最大数量
            'singleline': 3,
            'multiline': 3
        }],
        'vue/attributes-order': ['error', { //标签内属性顺序
            'order': [
                'GLOBAL', //id
                'LIST_RENDERING', //v-for
                'UNIQUE', //key、ref
                'OTHER_ATTR', //prop、v-bind
                'SLOT', //v-slot
                'DEFINITION', //v-is
                'CONDITIONALS', //v-if、v-else-if、v-else、v-show、v-cloak
                'TWO_WAY_BINDING', //v-model
                'EVENTS', //@click、v-on
                'OTHER_DIRECTIVES', //自定义指令
                'CONTENT', // v-text、v-html
                'RENDER_MODIFIERS' //v-once、v-pre
            ],
            'alphabetical': true //是否安装字母排序
        }],
        'vue/block-lang': ['error', { //单文件组件中指定 <template>、<script> 和 <style> 的语言类型
            'style': {
                'lang': 'scss'
            },
            'script':{
                'lang': 'ts'
            }
        }],
        'vue/v-slot-style': ['error', { //使用 v-slot 指令的风格
            'atComponent': 'longform',
            'named': 'longform',
            'default': 'longform'
        }],

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
        // 'no-unused-vars': 'off', // 禁止未使用的变量
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

        '@typescript-eslint/ban-ts-comment': 'error', // 禁止使用 @ts-ignore 等注释
        'no-array-constructor': 'off', // 关闭 JavaScript 的数组构造函数规则
        '@typescript-eslint/no-array-constructor': 'error', // 禁止使用数组构造函数
        '@typescript-eslint/no-duplicate-enum-values': 'error', // 禁止枚举成员有重复值
        '@typescript-eslint/no-empty-object-type': 'error', // 禁止使用空对象类型 {}
        '@typescript-eslint/no-explicit-any': 'error', // 禁止使用 any 类型
        '@typescript-eslint/no-extra-non-null-assertion': 'error', // 禁止不必要的非空断言
        '@typescript-eslint/no-misused-new': 'error', // 防止错误使用 new 关键字
        '@typescript-eslint/no-namespace': 'error', // 禁止使用命名空间
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error', // 禁止在可选链后使用非空断言
        '@typescript-eslint/no-require-imports': 'error', // 禁止使用 require 语句
        '@typescript-eslint/no-this-alias': 'error', // 禁止将 this 赋值给变量
        '@typescript-eslint/no-unnecessary-type-constraint': 'error', // 禁止不必要的类型约束
        '@typescript-eslint/no-unsafe-declaration-merging': 'error', // 禁止不安全的声明合并
        '@typescript-eslint/no-unsafe-function-type': 'error', // 禁止不安全的函数类型
        'no-unused-expressions': 'off', // 关闭 JavaScript 的未使用表达式规则
        '@typescript-eslint/no-unused-expressions': 'error', // 禁止未使用的表达式
        // '@typescript-eslint/no-unused-vars': 'error', // 禁止未使用的变量
        '@typescript-eslint/no-wrapper-object-types': 'error', // 禁止使用包装对象类型
        '@typescript-eslint/prefer-as-const': 'error', // 推荐使用 as const 断言
        '@typescript-eslint/prefer-namespace-keyword': 'error', // 推荐使用 namespace 关键字
        '@typescript-eslint/triple-slash-reference': 'error', // 规范三斜线引用语法

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