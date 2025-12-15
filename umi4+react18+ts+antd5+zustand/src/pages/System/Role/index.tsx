import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable
} from '@ant-design/pro-components';
import { Button, message, Popconfirm, Tag } from 'antd';
import { FC, useRef, useState } from 'react';
import { useRequest } from 'ahooks';
import {
  deleteRole,
  getRoleList,
  RoleRecord
} from '@/services/role';

const RoleManage: FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<RoleRecord>();

  // 删除角色
  const { run: runDelete } = useRequest(deleteRole, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
      actionRef.current?.reload();
    }
  });

  const columns: ProColumns<RoleRecord>[] = [
    {
      title: '角色名称',
      dataIndex: 'name',
      copyable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项'
          }
        ]
      }
    },
    {
      title: '角色编码',
      dataIndex: 'code',
      copyable: true
    },
    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
      ellipsis: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: { text: '启用', status: 'Success' },
        0: { text: '禁用', status: 'Error' }
      },
      render: (_, record) => (
        <Tag color={record.status === 1 ? 'success' : 'error'}>
          {record.status === 1 ? '启用' : '禁用'}
        </Tag>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      sorter: true
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setCurrentRow(record);
            message.info('权限配置功能开发中');
          }}
        >
          配置权限
        </a>,
        <Popconfirm
          key="delete"
          title="确定删除吗？"
          onConfirm={() => runDelete(record.id)}
          disabled={record.code === 'admin'}
        >
          <a
            className={record.code === 'admin' ? 'text-gray-400 cursor-not-allowed' : 'text-red-500'}
          >
            删除
          </a>
        </Popconfirm>
      ]
    }
  ];

  return (
    <PageContainer
      title="角色管理"
      subTitle="管理系统角色及权限"
      breadcrumb={[
        { title: '系统管理', path: '/system' },
        { title: '角色管理' }
      ]}
    >
      <ProTable<RoleRecord>
        headerTitle="角色列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCurrentRow(undefined);
              message.info('新建功能开发中');
            }}
          >
            <PlusOutlined /> 新建
          </Button>
        ]}
        request={async (params) => {
          const { current, pageSize, ...rest } = params;
          const res = await getRoleList({
            current,
            pageSize,
            ...rest
          });
          return {
            data: res.data.list,
            success: res.success,
            total: res.data.total
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default RoleManage;
