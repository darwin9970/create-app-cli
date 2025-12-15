import request from '@/utils/request';
import type { Edge, Node } from '@xyflow/react';

export interface FlowData {
  nodes: Node[];
  edges: Edge[];
}

export interface NodeTemplate {
  type: string;
  label: string;
  color: string;
}

/** 获取初始流程数据 */
export async function getInitialFlow() {
  return request.get<{ success: boolean; data: FlowData }>('/api/flow/initial');
}

/** 获取节点模板 */
export async function getNodeTemplates() {
  return request.get<{ success: boolean; data: NodeTemplate[] }>(
    '/api/flow/templates'
  );
}
