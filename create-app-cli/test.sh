#!/bin/bash

# 测试脚本 - 用于验证 CLI 工具功能

echo "🧪 开始测试 create-app-cli..."
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 测试计数
TESTS_PASSED=0
TESTS_FAILED=0

# 测试函数
test_case() {
    local name=$1
    local command=$2
    
    echo -e "${YELLOW}测试: ${name}${NC}"
    
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ 通过${NC}\n"
        ((TESTS_PASSED++))
        return 0
    else
        echo -e "${RED}✗ 失败${NC}\n"
        ((TESTS_FAILED++))
        return 1
    fi
}

# 清理函数
cleanup() {
    local dir=$1
    if [ -d "$dir" ]; then
        rm -rf "$dir"
    fi
}

# 进入脚手架目录
cd "$(dirname "$0")"

echo "📦 安装依赖..."
npm install --silent

echo -e "${GREEN}✓ 依赖安装完成${NC}\n"

# 测试 1: 检查 package.json
test_case "检查 package.json 存在" "[ -f package.json ]"

# 测试 2: 检查 bin/cli.js
test_case "检查 CLI 入口文件" "[ -f bin/cli.js ]"

# 测试 3: 检查所有核心文件
test_case "检查核心模块文件" "[ -f lib/index.js ] && [ -f lib/generator.js ] && [ -f lib/prompts.js ] && [ -f lib/utils.js ] && [ -f lib/validator.js ]"

# 测试 4: 验证模板目录
test_case "检查模板目录" "[ -d ../vit6+vue3 ] && [ -d ../vite6+react19 ] && [ -d ../vite6+react19+ts5 ] && [ -d ../vite6+vue3+ts5 ] && [ -d ../wxt+vue3 ] && [ -d ../umi4+react18+ts+antd5+zustand ]"

# 测试 5: Node 语法检查
echo -e "${YELLOW}测试: Node 语法检查${NC}"
if node --check bin/cli.js && \
   node --check lib/index.js && \
   node --check lib/generator.js && \
   node --check lib/prompts.js && \
   node --check lib/utils.js && \
   node --check lib/validator.js; then
    echo -e "${GREEN}✓ 通过${NC}\n"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ 失败${NC}\n"
    ((TESTS_FAILED++))
fi

# 测试总结
echo "================================"
echo "测试完成"
echo "================================"
echo -e "${GREEN}通过: ${TESTS_PASSED}${NC}"
echo -e "${RED}失败: ${TESTS_FAILED}${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✨ 所有测试通过！${NC}"
    echo ""
    echo "你现在可以使用以下命令测试 CLI:"
    echo "  npm link"
    echo "  create-app --help"
    exit 0
else
    echo -e "${RED}❌ 部分测试失败${NC}"
    exit 1
fi
