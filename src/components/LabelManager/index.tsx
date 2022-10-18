import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.less';
import { addLabel, deleteLabel, fetchLabelList, LabelDetails, updateLabel } from './labelUtils';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: LabelDetails;
  index: number;
  children: React.ReactNode;
  col: { dataIndex: string };
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const EditableCell: React.FC<EditableCellProps> = (props) => {
  const { editing, dataIndex, title, inputType, record, index, children, ...restProps } = props;
  const inputNode =
    inputType === 'number' ? (
      <InputNumber disabled={props?.dataIndex === 'id'} />
    ) : (
      <Input disabled={props?.dataIndex === 'id'} />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: dataIndex !== 'parent_id',
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const LabelManager: React.FC = () => {
  const type = useParams().type || 'markdown';
  const [labelsForm] = Form.useForm();
  const [newLabelForm] = Form.useForm();
  const [data, setData] = useState<LabelDetails[]>([]);
  const [editingId, setEditingLabelId] = useState('');

  const isEditing = (label: LabelDetails) => label.id === editingId;

  const edit = (label: Partial<LabelDetails>) => {
    labelsForm.setFieldsValue({ ...label });
    label.id && setEditingLabelId(label.id);
  };

  const cancel = () => {
    setEditingLabelId('');
  };

  const onSave = async (key: React.Key) => {
    try {
      const updatedLabel = (await labelsForm.validateFields()) as LabelDetails;
      await updateLabel({ ...updatedLabel, parent_id: updatedLabel.parent_id || null });
      setEditingLabelId('');
      fetchLabelList(type).then((res) => {
        setData(res);
      });
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const deleteLabelHandler = async (label: any) => {
    await deleteLabel({ name: label.name });
    fetchLabelList(type).then((res) => {
      setData(res);
    });
  };

  const addLabelHanlder = async (value: any) => {
    newLabelForm.resetFields();
    await addLabel({ ...value, tag: type, parent_id: value.parent_id || null });
    fetchLabelList(type).then((res) => {
      setData(res);
    });
  };
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      editable: false,
    },
    {
      title: 'name/英文名',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'cn_name/中文名',
      dataIndex: 'cn_name',
      editable: true,
    },
    {
      title: 'parent_id',
      dataIndex: 'parent_id',
      editable: true,
    },
    {
      title: 'weight',
      dataIndex: 'weight',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_rowData: any, label: LabelDetails, index: number) => {
        const editing = isEditing(label);
        return (
          <>
            {editing ? (
              <span>
                <Typography.Link onClick={() => onSave(label.id)} style={{ marginRight: 8 }}>
                  Save
                </Typography.Link>
                <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Button onClick={() => edit(label)} style={{ width: '80px', marginBottom: '10px' }}>
                Edit
              </Button>
            )}
            <div>
              <Popconfirm title='Sure to delete?' onConfirm={() => deleteLabelHandler(label)}>
                <Button danger style={{ width: '80px' }}>
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable && col.dataIndex !== 'id') {
      return col;
    }
    return {
      ...col,
      onCell: (label: LabelDetails) => ({
        record: label,
        inputType: col.dataIndex === 'weight' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(label),
        col,
      }),
    };
  });

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  useEffect(() => {
    fetchLabelList(type).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <Form
        form={newLabelForm}
        {...layout}
        name='new-label-form'
        validateMessages={validateMessages}
        onFinish={addLabelHanlder}
      >
        <Form.Item name={'name'} label='Name' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'cn_name'} label='cn_name' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'parent_id'} label='parent_id' rules={[{ required: false }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'weight'} label='weight' rules={[{ required: true }, { type: 'number', min: 0 }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <hr></hr>
      <Form form={labelsForm} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName='editable-row'
          pagination={false}
        />
      </Form>
    </>
  );
};

export default LabelManager;
