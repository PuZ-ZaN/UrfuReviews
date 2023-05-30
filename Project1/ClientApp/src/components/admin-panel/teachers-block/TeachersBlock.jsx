import React from 'react';
import { Dropdown, Modal, message } from 'antd';
import Search from 'antd/es/input/Search';
import { DeleteFilled, EditFilled, FormOutlined, UserAddOutlined } from '@ant-design/icons';

const TeachersBlock = ({ selectedCourse, selectedTrack }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [inputTeacher, setInputTeacher] = React.useState('');

  const handleChangeNewTeacher = (e) => {
    setInputTeacher(e.target.value);
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Действие было успешно выполнено',
    });
  };

  const configTeacher = {
    title: `Преподаватель "${inputTeacher}"`,
    content: <>Вы действительно хотите добавить преподавателя с таким ФИО?</>,
    centered: true,
    onOk: success,
  };

  const itemsEdit = [
    {
      label: (
        <>
          <span className="item-dropdown">Переименовать</span>
          <EditFilled />
        </>
      ),
      key: '0',
    },
    {
      label: (
        <>
          <span className="item-dropdown">Удалить</span>
          <DeleteFilled />
        </>
      ),
      key: '1',
    },
  ];

  return (
    <>
      {selectedTrack && (
        <div className="info_about_course">
          <p className="title">
            <span className="title_up">
              Преподаватели на треке:
              <br />
            </span>{' '}
            <span className="track-name">{selectedTrack?.trackName}</span>
          </p>
          <Search
            placeholder="ФИО нового преподавателя"
            allowClear
            enterButton={
              <div
                className="enter-button-new"
                onClick={() => {
                  Modal.confirm(configTeacher);
                }}>
                <p>Добавить</p> <UserAddOutlined />
              </div>
            }
            value={inputTeacher}
            onChange={handleChangeNewTeacher}
            size="large"
            className="add_new_prepod"
          />
          {selectedTrack.prepods
            .map((prepod) => prepod.prepodName)
            .map((prepodName) => (
              <div className="prepod-block-name">
                <p className="prepod-name">{prepodName}</p>
                <div className="icons-block">
                  <Dropdown menu={{ items: itemsEdit }} placement="bottomRight" trigger={['click']}>
                    <FormOutlined />
                  </Dropdown>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default TeachersBlock;
