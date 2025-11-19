#!/bin/bash

# 演示脚本 - 展示 CLI 工具的功能

echo "======================================"
echo "  create-app-cli 功能演示"
echo "======================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 进入脚手架目录
cd "$(dirname "$0")"

echo -e "${BLUE}步骤 1: 检查脚手架状态${NC}"
echo "----------------------------------------"

if [ -f "package.json" ]; then
    echo -e "${GREEN}✓ package.json 存在${NC}"
else
    echo -e "${YELLOW}✗ package.json 不存在${NC}"
    exit 1
fi

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ 依赖已安装${NC}"
else
    echo -e "${YELLOW}! 依赖未安装，正在安装...${NC}"
    npm install --silent
    echo -e "${GREEN}✓ 依赖安装完成${NC}"
fi

echo ""
echo -e "${BLUE}步骤 2: 链接到全局（需要权限）${NC}"
echo "----------------------------------------"
echo -e "${CYAN}执行: npm link${NC}"
echo ""

if npm link > /dev/null 2>&1; then
    echo -e "${GREEN}✓ 全局链接成功${NC}"
else
    echo -e "${YELLOW}⚠ 全局链接失败，可能需要 sudo 权限${NC}"
    echo -e "${CYAN}提示: 可以尝试运行 'sudo npm link'${NC}"
fi

echo ""
echo -e "${BLUE}步骤 3: 验证 CLI 命令${NC}"
echo "----------------------------------------"

# 检查命令是否可用
if command -v create-app &> /dev/null; then
    echo -e "${GREEN}✓ create-app 命令已就绪${NC}"
    echo ""
    
    # 显示版本
    echo -e "${CYAN}版本信息:${NC}"
    node bin/cli.js --version
    echo ""
    
    # 显示可用模板
    echo -e "${CYAN}可用模板列表:${NC}"
    node bin/cli.js list
    
else
    echo -e "${YELLOW}⚠ create-app 命令未找到${NC}"
    echo -e "${CYAN}可以使用以下命令直接运行:${NC}"
    echo "  node bin/cli.js --help"
    echo ""
    
    # 显示帮助
    echo -e "${CYAN}帮助信息:${NC}"
    node bin/cli.js --help
fi

echo ""
echo -e "${BLUE}步骤 4: 使用示例${NC}"
echo "----------------------------------------"
echo -e "${CYAN}创建新项目的方式:${NC}"
echo ""
echo "1. 交互式创建:"
echo "   ${GREEN}create-app${NC}"
echo ""
echo "2. 指定项目名:"
echo "   ${GREEN}create-app my-project${NC}"
echo ""
echo "3. 跳过依赖安装:"
echo "   ${GREEN}create-app my-project --no-install${NC}"
echo ""
echo "4. 跳过 Git 初始化:"
echo "   ${GREEN}create-app my-project --no-git${NC}"
echo ""
echo "5. 查看模板列表:"
echo "   ${GREEN}create-app list${NC}"
echo ""

echo "======================================"
echo -e "${GREEN}✨ 演示完成！${NC}"
echo "======================================"
echo ""
echo -e "${YELLOW}下一步: 创建你的第一个项目${NC}"
echo -e "${CYAN}运行: create-app my-first-app${NC}"
echo ""
