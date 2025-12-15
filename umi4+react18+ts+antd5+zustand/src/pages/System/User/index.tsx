import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable
} from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { FC, useRef, useState } from 'react';
import { useRequest } from 'ahooks';
import {
  deleteUser,
  getUserList,
  UserRecord
} from '@/services/user';

const UserManage: FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<UserRecord>();

  // 删除用户
  const { run: runDelete } = useRequest(deleteUser, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
      actionRef.current?.reload();
    }
  });

  const columns: ProColumns<UserRecord>[] = [
    {
      title: '用户名',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
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
      title: '手机号',
      dataIndex: 'phone',
      copyable: true
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      valueType: 'select',
      valueEnum: {
        技术部: { text: '技术部' },
        产品部: { text: '产品部' },
        运营部: { text: '运营部' }
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: { text: '启用', status: 'Success' },
        0: { text: '禁用', status: 'Error' }
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      sorter: true
    },
    {
      title: '创建时间',
      dataIndex: 'createTimeRange',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1]
          };
        }
      }
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setCurrentRow(record);
            message.info('编辑功能开发中');
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定删除吗？"
          onConfirm={() => runDelete(record.id)}
        >
          <a className="text-red-500">删除</a>
        </Popconfirm>
      ]
    }
  ];

  return (
    <PageContainer
      title="用户管理"
      subTitle="管理系统用户"
      breadcrumb={[
        { title: '系统管理', path: '/system' },
        { title: '用户管理' }
      ]}
    >
      <ProTable<UserRecord>
        headerTitle="用户列表"
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
          const res = await getUserList({
            current,
            pageSize,
            ...rest
          });
          return {
            data: res.data.list,
            success: true, // Mock 接口返回结构差异，这里适配一下
            total: res.data.total
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default UserManage;
