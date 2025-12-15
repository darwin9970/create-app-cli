import { PageContainer } from '@/components';
import {
  DeleteOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  ReloadOutlined,
  WarningOutlined
} from '@ant-design/icons';
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Tag,
  Tooltip
} from 'antd';
import { FC, useCallback, useMemo, useRef, useState } from 'react';
import ConditionNode from './components/ConditionNode';
import ExecutableNode from './components/ExecutableNode';
import './index.less';

import { getInitialFlow, getNodeTemplates } from '@/services';
import { useRequest } from 'ahooks';
import NodeConfigDrawer from './components/NodeConfigDrawer';
import { NodeStatus } from './types';

// 生成唯一 ID
let nodeId = 0;
const getNodeId = () => `node_${nodeId++}`;

// 流程编辑器主组件
const FlowEditor: FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [executing, setExecuting] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const { screenToFlowPosition } = useReactFlow();

  // 获取初始数据
  const { loading: flowLoading } = useRequest(getInitialFlow, {
    onSuccess: (res) => {
      if (res.success) {
        setNodes(res.data.nodes);
        setEdges(res.data.edges);
      }
    }
  });

  // 获取节点模板
  const { data: templatesData } = useRequest(getNodeTemplates);
  const nodeTemplates = templatesData?.data || [];

  // 抽屉状态
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentNode, setCurrentNode] = useState<Node | null>(null);

  // 边编辑弹窗状态
  const [edgeModalOpen, setEdgeModalOpen] = useState(false);
  const [currentEdge, setCurrentEdge] = useState<Edge | null>(null);
  const [edgeLabel, setEdgeLabel] = useState('');

  // 注册自定义节点
  const nodeTypes = useMemo(
    () => ({
      executable: ExecutableNode,
      condition: ConditionNode
    }),
    []
  );

  // 连接节点 - 如果源节点是条件节点，提示设置分支类型
  const onConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find((n) => n.id === params.source);
      const isConditionNode = sourceNode?.data?.nodeType === 'condition';

      // 创建新边
      const newEdge: Edge = {
        id: `e-${params.source}-${params.target}`,
        source: params.source!,
        target: params.target!,
        animated: false,
        label: isConditionNode ? '通过' : undefined
      };

      setEdges((eds) => addEdge(newEdge, eds));

      // 如果是条件节点，打开边编辑弹窗让用户设置分支类型
      if (isConditionNode) {
        setCurrentEdge(newEdge);
        setEdgeLabel('通过');
        setEdgeModalOpen(true);
      }
    },
    [setEdges, nodes]
  );

  // 边点击 - 打开编辑弹窗
  const onEdgeClick = useCallback((_event: React.MouseEvent, edge: Edge) => {
    setCurrentEdge(edge);
    setEdgeLabel((edge.label as string) || '');
    setEdgeModalOpen(true);
  }, []);

  // 保存边标签
  const saveEdgeLabel = useCallback(() => {
    if (!currentEdge) return;

    setEdges((eds) =>
      eds.map((e) =>
        e.id === currentEdge.id ? { ...e, label: edgeLabel || undefined } : e
      )
    );
    setEdgeModalOpen(false);
    setCurrentEdge(null);
  }, [currentEdge, edgeLabel, setEdges]);

  // 删除当前边
  const deleteCurrentEdge = useCallback(() => {
    if (!currentEdge) return;

    setEdges((eds) => eds.filter((e) => e.id !== currentEdge.id));
    setEdgeModalOpen(false);
    setCurrentEdge(null);
  }, [currentEdge, setEdges]);

  // 选中节点变化
  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes }: { nodes: Node[] }) => {
      setSelectedNodes(selectedNodes.map((n) => n.id));
    },
    []
  );

  // 节点点击 - 打开配置抽屉
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setCurrentNode(node);
    setDrawerOpen(true);
  }, []);

  // 关闭抽屉
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setCurrentNode(null);
  }, []);

  // 保存节点配置
  const saveNodeConfig = useCallback(
    (values: any) => {
      if (!currentNode) return;

      setNodes((nds) =>
        nds.map((node) =>
          node.id === currentNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  ...values
                }
              }
            : node
        )
      );
      closeDrawer();
    },
    [currentNode, setNodes, closeDrawer]
  );

  // 拖拽开始
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    label: string
  ) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.setData('application/reactflow/label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  // 获取节点类型的默认配置
  const getDefaultNodeData = (nodeType: string, label: string) => {
    const base = { label, nodeType, status: 'pending' as NodeStatus };
    switch (nodeType) {
      case 'start':
        return { ...base, triggerType: 'manual', cron: '' };
      case 'process':
        return { ...base, timeout: 30, retryCount: 3, script: '' };
      case 'condition':
        return { ...base, expression: '', trueBranch: '', falseBranch: '' };
      case 'end':
        return {
          ...base,
          notifyOnSuccess: true,
          notifyOnError: true,
          notifyChannels: ['email']
        };
      default:
        return base;
    }
  };

  // 拖拽放置
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const nodeType = event.dataTransfer?.getData(
        'application/reactflow/type'
      );
      const label = event.dataTransfer?.getData('application/reactflow/label');

      if (!nodeType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      });

      const newNode: Node = {
        id: getNodeId(),
        type: nodeType === 'condition' ? 'condition' : 'executable',
        position,
        data: getDefaultNodeData(nodeType, label || '新节点'),
        sourcePosition: Position.Right,
        targetPosition: Position.Left
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }, []);

  // 删除选中节点
  const deleteSelectedNodes = useCallback(() => {
    if (selectedNodes.length === 0) {
      return;
    }
    setNodes((nds) => nds.filter((n) => !selectedNodes.includes(n.id)));
    setEdges((eds) =>
      eds.filter(
        (e) =>
          !selectedNodes.includes(e.source) && !selectedNodes.includes(e.target)
      )
    );
    setSelectedNodes([]);
  }, [selectedNodes, setNodes, setEdges]);

  // 更新节点状态
  const updateNodeStatus = useCallback(
    (nodeId: string, status: NodeStatus) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, status } }
            : node
        )
      );
    },
    [setNodes]
  );

  // 高亮边
  const highlightEdge = useCallback(
    (edgeId: string, active: boolean) => {
      setEdges((eds) =>
        eds.map((edge) =>
          edge.id === edgeId
            ? {
                ...edge,
                animated: active,
                style: {
                  stroke: active ? '#1890ff' : '#b1b1b7',
                  strokeWidth: active ? 2 : 1
                }
              }
            : edge
        )
      );
    },
    [setEdges]
  );

  // 重置节点状态
  const resetNodeStatus = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, status: 'pending' }
      }))
    );
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        animated: false,
        style: { stroke: '#b1b1b7', strokeWidth: 1 }
      }))
    );
  }, [setNodes, setEdges]);

  // 获取下一个要执行的节点
  const getNextNodes = useCallback(
    (currentNodeId: string, conditionResult?: boolean) => {
      const currentNode = nodes.find((n) => n.id === currentNodeId);
      const outgoingEdges = edges.filter((e) => e.source === currentNodeId);

      // 如果是条件节点，根据条件结果选择分支
      if (currentNode?.data?.nodeType === 'condition') {
        if (conditionResult) {
          // 条件通过，走"通过"分支
          const passEdge = outgoingEdges.find((e) => e.label === '通过');
          return passEdge ? [passEdge.target] : [];
        } else {
          // 条件不通过，走"异常"分支
          const failEdge = outgoingEdges.find((e) => e.label === '异常');
          return failEdge ? [failEdge.target] : [];
        }
      }

      // 普通节点，返回所有后续节点
      return outgoingEdges.map((e) => e.target);
    },
    [nodes, edges]
  );

  // 执行流程（支持条件分支）
  const executeFlow = useCallback(async () => {
    if (nodes.length === 0) return;

    setExecuting(true);
    resetNodeStatus();

    // 找到起始节点（没有入边的节点）
    const startNode = nodes.find(
      (node) => !edges.some((edge) => edge.target === node.id)
    );
    if (!startNode) {
      setExecuting(false);
      return;
    }

    // 使用队列进行广度优先执行
    const queue: string[] = [startNode.id];
    const executed = new Set<string>();

    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      if (executed.has(nodeId)) continue;

      const node = nodes.find((n) => n.id === nodeId);
      if (!node) continue;

      // 高亮入边
      const incomingEdge = edges.find((e) => e.target === nodeId);
      if (incomingEdge) {
        highlightEdge(incomingEdge.id, true);
      }

      // 执行节点
      updateNodeStatus(nodeId, 'running');
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 800 + Math.random() * 500);
      });
      updateNodeStatus(nodeId, 'success');
      executed.add(nodeId);

      if (incomingEdge) {
        highlightEdge(incomingEdge.id, false);
      }

      // 获取下一个节点（条件节点默认通过）
      const nextNodeIds = getNextNodes(nodeId, true);
      queue.push(...nextNodeIds.filter((id) => !executed.has(id)));
    }

    setExecuting(false);
  }, [
    nodes,
    edges,
    resetNodeStatus,
    updateNodeStatus,
    highlightEdge,
    getNextNodes
  ]);

  // 模拟质量异常执行（条件节点不通过）
  const executeWithError = useCallback(async () => {
    if (nodes.length === 0) return;

    setExecuting(true);
    resetNodeStatus();

    // 找到起始节点
    const startNode = nodes.find(
      (node) => !edges.some((edge) => edge.target === node.id)
    );
    if (!startNode) {
      setExecuting(false);
      return;
    }

    // 使用队列进行执行
    const queue: string[] = [startNode.id];
    const executed = new Set<string>();

    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      if (executed.has(nodeId)) continue;

      const node = nodes.find((n) => n.id === nodeId);
      if (!node) continue;

      // 高亮入边
      const incomingEdge = edges.find((e) => e.target === nodeId);
      if (incomingEdge) {
        highlightEdge(incomingEdge.id, true);
      }

      // 执行节点
      updateNodeStatus(nodeId, 'running');
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 800 + Math.random() * 500);
      });

      // 条件节点模拟不通过
      const isConditionNode = node.data?.nodeType === 'condition';
      updateNodeStatus(nodeId, isConditionNode ? 'error' : 'success');
      executed.add(nodeId);

      if (incomingEdge) {
        highlightEdge(incomingEdge.id, false);
      }

      // 条件节点不通过时走异常分支
      const nextNodeIds = getNextNodes(nodeId, !isConditionNode);
      queue.push(...nextNodeIds.filter((id) => !executed.has(id)));
    }

    setExecuting(false);
  }, [
    nodes,
    edges,
    resetNodeStatus,
    updateNodeStatus,
    highlightEdge,
    getNextNodes
  ]);

  return (
    <PageContainer
      title="数据清洗流程"
      subTitle="ETL流程编排 · 支持拖拽添加节点、连线、执行流程"
      loading={flowLoading}
      breadcrumb={[
        { title: '工作台', path: '/dashboard' },
        { title: '数据清洗流程' }
      ]}
    >
      <Card>
        {/* 工具栏 */}
        <div className="flow-toolbar">
          <Space split={<Divider type="vertical" />}>
            {/* 节点模板 */}
            <Space>
              <span className="toolbar-label">拖拽添加:</span>
              {nodeTemplates.map((tpl: any) => (
                <div
                  key={`${tpl.type}-${tpl.label}`}
                  className={`node-template ${
                    tpl.type === 'condition' ? 'node-template--diamond' : ''
                  }`}
                  style={{ borderColor: tpl.color }}
                  draggable
                  onDragStart={(e) => onDragStart(e, tpl.type, tpl.label)}
                >
                  <PlusOutlined style={{ color: tpl.color }} />
                  <span>{tpl.label}</span>
                </div>
              ))}
            </Space>

            {/* 操作按钮 */}
            <Space>
              <Tooltip title="删除选中节点">
                <Button
                  icon={<DeleteOutlined />}
                  onClick={deleteSelectedNodes}
                  disabled={selectedNodes.length === 0 || executing}
                >
                  删除
                </Button>
              </Tooltip>
              <Tooltip title="重置节点状态">
                <Button
                  icon={<ReloadOutlined />}
                  onClick={resetNodeStatus}
                  disabled={executing}
                >
                  重置
                </Button>
              </Tooltip>
            </Space>

            {/* 执行按钮 */}
            <Space>
              <Button
                type="primary"
                icon={<PlayCircleOutlined />}
                onClick={executeFlow}
                loading={executing}
              >
                执行清洗
              </Button>
              <Button
                danger
                icon={<WarningOutlined />}
                onClick={executeWithError}
                loading={executing}
              >
                模拟质量异常
              </Button>
            </Space>

            {/* 状态图例 */}
            <Space>
              <Tag color="default">待执行</Tag>
              <Tag color="processing">执行中</Tag>
              <Tag color="success">成功</Tag>
              <Tag color="error">失败</Tag>
            </Space>
          </Space>
        </div>

        {/* 流程画布 */}
        <div className="flow-container" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onSelectionChange={onSelectionChange}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            snapToGrid
            snapGrid={[15, 15]}
            deleteKeyCode={['Backspace', 'Delete']}
            selectionKeyCode={['Shift']}
            multiSelectionKeyCode={['Meta', 'Control']}
            panActivationKeyCode={null}
          >
            <Background gap={15} />
            <Controls />
            <MiniMap
              nodeColor={(node: Node) => {
                const status = node.data?.status as NodeStatus;
                const colors = {
                  pending: '#d9d9d9',
                  running: '#1890ff',
                  success: '#52c41a',
                  error: '#ff4d4f'
                };
                return colors[status] || '#d9d9d9';
              }}
              maskColor="rgba(0,0,0,0.1)"
            />
          </ReactFlow>
        </div>

        {/* 使用提示 */}
        <div className="flow-tips">
          <Space split={<Divider type="vertical" />}>
            <span>拖拽节点到画布添加ETL步骤</span>
            <span>连接节点构建数据流</span>
            <span>点击节点配置SQL/脚本</span>
            <span>执行流程查看清洗效果</span>
          </Space>
        </div>
      </Card>

      {/* 节点配置抽屉 */}
      <NodeConfigDrawer
        open={drawerOpen}
        node={currentNode}
        onClose={closeDrawer}
        onSave={saveNodeConfig}
      />

      {/* 边编辑弹窗 */}
      <Modal
        title="编辑连线"
        open={edgeModalOpen}
        onOk={saveEdgeLabel}
        onCancel={() => setEdgeModalOpen(false)}
        width={400}
        okText="确定"
        cancelText="取消"
        footer={[
          <Button key="delete" danger onClick={deleteCurrentEdge}>
            删除连线
          </Button>,
          <Button key="cancel" onClick={() => setEdgeModalOpen(false)}>
            取消
          </Button>,
          <Button key="ok" type="primary" onClick={saveEdgeLabel}>
            确定
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Form.Item
            label="分支标签"
            help="条件节点需设置 '通过' 或 '异常' 来区分分支"
          >
            <Radio.Group
              value={edgeLabel}
              onChange={(e) => setEdgeLabel(e.target.value)}
            >
              <Radio.Button value="">无标签</Radio.Button>
              <Radio.Button value="通过">通过</Radio.Button>
              <Radio.Button value="异常">异常</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="自定义标签">
            <Input
              value={edgeLabel}
              onChange={(e) => setEdgeLabel(e.target.value)}
              placeholder="输入自定义标签"
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

// 包装 Provider
const Workplace: FC = () => (
  <ReactFlowProvider>
    <FlowEditor />
  </ReactFlowProvider>
);

export default Workplace;
