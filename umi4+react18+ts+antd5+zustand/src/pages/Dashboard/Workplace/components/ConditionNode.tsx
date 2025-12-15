import {
  CheckCircleFilled,
  CloseCircleFilled,
  LoadingOutlined,
  QuestionCircleFilled
} from '@ant-design/icons';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { FC } from 'react';
import { NodeStatus } from '../types';

interface ConditionNodeData {
  label: string;
  status: NodeStatus;
}

const statusConfig = {
  pending: {
    textColor: 'text-gray-400',
    borderColor: 'border-gray-300',
    bgColor: 'bg-white',
    shadow: 'shadow-md',
    icon: <QuestionCircleFilled />
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
    bgColor: 'bg-gradient-to-br from-green-50 to-white',
    shadow: 'shadow-md',
    icon: <CheckCircleFilled />
  },
  error: {
    textColor: 'text-red-500',
    borderColor: 'border-red-500',
    bgColor: 'bg-gradient-to-br from-red-50 to-white',
    shadow: 'shadow-md',
    icon: <CloseCircleFilled />
  }
};

const ConditionNode: FC<NodeProps> = ({ data }) => {
  const { label, status } = data as unknown as ConditionNodeData;
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div className="relative w-[100px] h-[100px] flex items-center justify-center">
      {/* 菱形背景 */}
      <div
        className={`
          absolute w-[70px] h-[70px] rotate-45 rounded
          border-2 ${config.borderColor} ${config.bgColor} ${config.shadow}
          transition-all duration-300 hover:shadow-lg
        `}
      />

      {/* 内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-2">
        <span className={`text-lg mb-1 ${config.textColor}`}>
          {config.icon}
        </span>
        <span className="text-xs font-medium text-gray-700 max-w-[60px] truncate">
          {label}
        </span>
      </div>

      {/* 连接点 */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 !bg-blue-500 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="pass"
        className="!w-2 !h-2 !bg-green-500 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="fail"
        className="!w-2 !h-2 !bg-red-500 !border-2 !border-white"
      />
    </div>
  );
};

export default ConditionNode;
