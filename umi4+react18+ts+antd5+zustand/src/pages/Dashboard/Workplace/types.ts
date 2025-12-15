export type NodeStatus = 'pending' | 'running' | 'success' | 'error';

export type NodeType = 'start' | 'process' | 'condition' | 'end';

export interface AppNodeData extends Record<string, unknown> {
  label: string;
  nodeType: NodeType;
  status: NodeStatus;
  description?: string;
  // Start node
  triggerType?: 'manual' | 'schedule' | 'api';
  cron?: string;
  // Process node
  timeout?: number;
  retryCount?: number;
  script?: string;
  // Condition node
  expression?: string;
  trueBranch?: string;
  falseBranch?: string;
  // End node
  notifyOnSuccess?: boolean;
  notifyOnError?: boolean;
  notifyChannels?: string[];
}
