import { FullscreenOutlined } from '@ant-design/icons';
import Editor, { OnMount } from '@monaco-editor/react';
import { Button, Modal, Spin, Tooltip } from 'antd';
import { FC, useRef, useState } from 'react';

interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  language?: 'sql' | 'javascript' | 'json' | 'python' | 'shell';
  height?: number | string;
  readOnly?: boolean;
  placeholder?: string;
  title?: string;
}

// 语言显示名称映射
const languageNames: Record<string, string> = {
  sql: 'SQL',
  javascript: 'JavaScript',
  json: 'JSON',
  python: 'Python',
  shell: 'Shell'
};

const CodeEditor: FC<CodeEditorProps> = ({
  value = '',
  onChange,
  language = 'sql',
  height = 200,
  readOnly = false,
  placeholder = '',
  title
}) => {
  const editorRef = useRef<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tempValue, setTempValue] = useState('');

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleChange = (val: string | undefined) => {
    onChange?.(val || '');
  };

  // 打开弹窗
  const openModal = () => {
    setTempValue(value);
    setModalOpen(true);
  };

  // 确认弹窗编辑
  const handleModalOk = () => {
    onChange?.(tempValue);
    setModalOpen(false);
  };

  // 编辑器通用配置
  const editorOptions = {
    readOnly,
    minimap: { enabled: false },
    fontSize: 13,
    lineNumbers: 'on' as const,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on' as const,
    folding: true,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 3,
    renderLineHighlight: 'line' as const,
    scrollbar: {
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8
    },
    placeholder
  };

  return (
    <>
      <div
        style={{
          border: '1px solid #d9d9d9',
          borderRadius: 6,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* 放大按钮 */}
        <Tooltip title="全屏编辑">
          <Button
            type="text"
            size="small"
            icon={<FullscreenOutlined />}
            onClick={openModal}
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              zIndex: 10,
              color: '#fff',
              background: 'rgba(0,0,0,0.3)'
            }}
          />
        </Tooltip>

        <Editor
          height={height}
          language={language}
          value={value}
          onChange={handleChange}
          onMount={handleEditorDidMount}
          loading={<Spin tip="加载编辑器..." />}
          options={editorOptions}
          theme="vs-dark"
        />
      </div>

      {/* 全屏编辑弹窗 */}
      <Modal
        title={title || `编辑 ${languageNames[language] || language} 脚本`}
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={() => setModalOpen(false)}
        width={900}
        styles={{ body: { padding: 0 } }}
        okText="确定"
        cancelText="取消"
        destroyOnClose
        keyboard={false}
      >
        <Editor
          height={500}
          language={language}
          value={tempValue}
          onChange={(val) => setTempValue(val || '')}
          loading={<Spin tip="加载编辑器..." />}
          options={{ ...editorOptions, minimap: { enabled: true } }}
          theme="vs-dark"
        />
      </Modal>
    </>
  );
};

export default CodeEditor;
