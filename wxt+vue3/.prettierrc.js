export default {
    requirePragma: true,//指定是否需要在文件顶部添加特定的注释来启用 Prettier。
    insertPragma: true,//指定是否在文件顶部插入一个特定的注释来标记文件已经被 Prettier 格式化过。
    printWidth: 500, //指定代码行的最大打印宽度
    tabWidth: 4, //指定一个制表符等于多少空格
    useTabs: false, //使用制表符而不是空格缩进
    semi: true, //在语句末尾使用分号
    singleQuote: true, //是否使用单引号
    quoteProps: 'as-needed', //仅在需要时在对象属性周围添加引号
    jsxSingleQuote: false, //在JSX中使用单引号还是双引号
    trailingComma: 'none', //在多行对象字面量和数组字面量的最后一个元素后加逗号
    bracketSpacing: true, //在大括号内部是否加空格
    bracketSameLine: false, //将大括号放在控制语句的同一行
    jsxBracketSameLine: false, //在JSX中的大括号内部是否加空格。
    arrowParens: 'always', //箭头函数参数周围的括号不能省略
    proseWrap: 'preserve',//指定Markdown保留原始代码的格式
    htmlWhitespaceSensitivity: 'strict', //指定HTML标签的空格敏感度
    vueIndentScriptAndStyle: false, //指定Vue文件中script和style标签的缩进。
    endOfLine: 'lf', //指定文件末尾使用的换行符类型
    embeddedLanguageFormatting: 'auto', //指定是否格式化嵌入式语言
    singleAttributePerLine: false //强制每行使用单个属性
};