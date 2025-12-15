import { defineMock } from '@umijs/max';

// 数据清洗流程 - 初始节点
const initialNodes = [
  // 数据源连接
  {
    id: 'datasource',
    type: 'executable',
    position: { x: 50, y: 200 },
    data: {
      label: '数据源连接',
      nodeType: 'start',
      status: 'pending',
      triggerType: 'schedule',
      cron: '0 2 * * *',
      description: '每天凌晨2点自动执行数据清洗任务'
    },
    sourcePosition: 'right',
    targetPosition: 'left'
  },
  // 数据抽取
  {
    id: 'extract',
    type: 'executable',
    position: { x: 220, y: 200 },
    data: {
      label: '数据抽取',
      nodeType: 'process',
      status: 'pending',
      timeout: 300,
      retryCount: 3,
      script: `-- 从业务数据库抽取订单数据
SELECT
  order_id,
  customer_name,
  customer_phone,
  order_amount,
  order_date,
  status
FROM orders
WHERE order_date >= DATE_SUB(NOW(), INTERVAL 1 DAY)`,
      description: '从MySQL业务库抽取近24小时订单数据'
    },
    sourcePosition: 'right',
    targetPosition: 'left'
  },
  // 数据质量检查（菱形条件节点）
  {
    id: 'quality-check',
    type: 'condition',
    position: { x: 390, y: 180 },
    data: {
      label: '质量检查',
      nodeType: 'condition',
      status: 'pending',
      expression: 'data.errorRate < 0.05 && data.count > 0',
      trueBranch: 'dedup',
      falseBranch: 'alert',
      description: '检查数据错误率是否低于5%'
    },
    sourcePosition: 'right',
    targetPosition: 'left'
  },
  // 异常告警（分支）
  {
    id: 'alert',
    type: 'executable',
    position: { x: 390, y: 350 },
    data: {
      label: '异常告警',
      nodeType: 'end',
      status: 'pending',
      notifyOnSuccess: false,
      notifyOnError: true,
      notifyChannels: ['email', 'dingtalk'],
      description: '数据质量异常时发送告警通知'
    },
    sourcePosition: 'right',
    targetPosition: 'left'
  },
  // 去重处理
  {
    id: 'dedup',
    type: 'executable',
    position: { x: 560, y: 200 },
    data: {
      label: '去重处理',
      nodeType: 'process',
      status: 'pending',
      timeout: 120,
      retryCount: 2,
      script: `-- 基于订单ID去重，保留最新记录
DELETE t1 FROM temp_orders t1
INNER JOIN temp_orders t2
WHERE t1.id < t2.id
  AND t1.order_id = t2.order_id`,
      description: '基于订单ID进行数据去重'
    },
    sourcePosition: 'right',
    targetPosition: 'left'
  },
  // 空值处理
  {
    id: 'null-handle',
    type: 'executable',
    position: { x: 730, y: 200 },
    data: {
      label: '空值处理',
      nodeType: 'process',
      status: 'pending',
      timeout: 60,
      retryCount: 2,
      script: `-- 处理空值和异常值
UPDATE temp_orders SET
  customer_phone = COALESCE(customer_phone, '未知'),
  order_amount = CASE
    WHEN order_amount < 0 THEN 0
    ELSE order_amount
  END`,
      description: '填充空值，修正异常金额'
    },
    sourcePosition: 'right',
    targetPosition: 'left'
  },
  // 格式转换
  {
    id: 'transform',
    type: 'executable',
    position: { x: 900, y: 200 },
    data: {
      label: '格式转换',
      nodeType: 'process',
      status: 'pending',
      timeout: 60,
      retryCount: 1,
      script: `-- 标准化数据格式
UPDATE temp_orders SET
  customer_phone = REGEXP_REPLACE(customer_phone, '[^0-9]', ''),
  order_date = DATE_FORMAT(order_date, '%Y-%m-%d %H:%i:%s'),
  status = UPPER(TRIM(status))`,
      description: '标准化手机号、日期格式'
    },
    sourcePosition: 'right',
    targetPosition: 'left'
  },
  // 数据加载
  {
    id: 'load',
    type: 'executable',
    position: { x: 1070, y: 200 },
    data: {
      label: '数据加载',
      nodeType: 'process',
      status: 'pending',
      timeout: 180,
      retryCount: 3,
      script: `-- 加载到数据仓库
INSERT INTO dw.fact_orders
SELECT * FROM temp_orders
ON DUPLICATE KEY UPDATE
  customer_name = VALUES(customer_name),
  order_amount = VALUES(order_amount)`,
      description: '将清洗后的数据加载到数据仓库'
    },
    sourcePosition: 'right',
    targetPosition: 'left'
  },
  // 完成通知
  {
    id: 'notify',
    type: 'executable',
    position: { x: 1240, y: 200 },
    data: {
      label: '完成通知',
      nodeType: 'end',
      status: 'pending',
      notifyOnSuccess: true,
      notifyOnError: true,
      notifyChannels: ['email'],
      description: '发送任务完成报告'
    },
    sourcePosition: 'right',
    targetPosition: 'left'
  }
];

// 数据清洗流程 - 初始边
const initialEdges = [
  { id: 'e1', source: 'datasource', target: 'extract', type: 'default' },
  { id: 'e2', source: 'extract', target: 'quality-check', type: 'default' },
  {
    id: 'e3',
    source: 'quality-check',
    target: 'dedup',
    type: 'default',
    label: '通过'
  },
  {
    id: 'e4',
    source: 'quality-check',
    target: 'alert',
    type: 'default',
    label: '异常'
  },
  { id: 'e5', source: 'dedup', target: 'null-handle', type: 'default' },
  { id: 'e6', source: 'null-handle', target: 'transform', type: 'default' },
  { id: 'e7', source: 'transform', target: 'load', type: 'default' },
  { id: 'e8', source: 'load', target: 'notify', type: 'default' }
];

// 数据清洗节点模板
const nodeTemplates = [
  { type: 'start', label: '数据源', color: '#52c41a' },
  { type: 'process', label: '抽取', color: '#1890ff' },
  { type: 'process', label: '清洗', color: '#13c2c2' },
  { type: 'process', label: '转换', color: '#722ed1' },
  { type: 'process', label: '加载', color: '#eb2f96' },
  { type: 'condition', label: '校验', color: '#faad14' },
  { type: 'end', label: '通知', color: '#ff4d4f' }
];

export default defineMock({
  'GET /api/flow/initial': (req, res) => {
    res.json({
      success: true,
      data: {
        nodes: initialNodes,
        edges: initialEdges
      }
    });
  },

  'GET /api/flow/templates': (req, res) => {
    res.json({
      success: true,
      data: nodeTemplates
    });
  }
});
