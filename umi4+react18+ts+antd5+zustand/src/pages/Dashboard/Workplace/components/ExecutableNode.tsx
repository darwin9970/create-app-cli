import {
  CheckCircleFilled,
  CloseCircleFilled,
  LoadingOutlined
} from '@ant-design/icons';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { FC } from 'react';
import { NodeStatus } from '../types';

interface ExecutableNodeData {
  label: string;
  status: NodeStatus;
}

const statusConfig = {
  pending: {
    textColor: 'text-gray-400',
    borderColor: 'border-gray-300',
    bgColor: 'bg-white',
    shadow: 'shadow-sm',
    icon: null
  },
  running: {
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500',
    bgColor: 'bg-white',
    shadow: 'shadow-blue-200 shadow-lg',
    icon: <LoadingOutlined spin />
  },
  success: {
    textColor: 'text-green-500',
    borderColor: 'border-green-500',
    bgColor: 'bg-gradient-to-r from-green-50 to-white',
    shadow: 'shadow-sm',
    icon: <CheckCircleFilled />
  },
  error: {
    textColor: 'text-red-500',
    borderColor: 'border-red-500',
    bgColor: 'bg-gradient-to-r from-red-50 to-white',
    shadow: 'shadow-sm',
    icon: <CloseCircleFilled />
  }
};

const ExecutableNode: FC<NodeProps> = ({ data }) => {
  const { label, status } = data as unknown as ExecutableNodeData;
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div
      className={`
        px-4 py-2 rounded-lg border-2
        ${config.borderColor} ${config.bgColor} ${config.shadow}
        transition-all duration-300 hover:shadow-md
        min-w-[80px] max-w-[120px]
      `}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 !bg-blue-500 !border-2 !border-white"
      />

      <div className="flex items-center gap-1.5">
        {config.icon && <span className={config.textColor}>{config.icon}</span>}
        <span className="text-sm font-medium text-gray-700 truncate">
          {label}
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-2 !h-2 !bg-blue-500 !border-2 !border-white"
      />
    </div>
  );
};

export default ExecutableNode;
