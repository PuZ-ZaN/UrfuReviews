import React from 'react';
import Track from './track/Track';
import { FileAddOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Modal } from 'antd';
import { destinyTracks } from '../../../const.ts';
import { useDispatch } from 'react-redux';
import { addTrack } from '../../../store/api-actions';

const Tracks = ({ tracks, setSelectedTrack, course }) => {
  const dispatch = useDispatch();
  const [inputTrack, setInputTrack] = React.useState('');

  const success = () => {
    Modal.success({
      content: 'Данные были успешно добавлены',
      className: 'modal-my-class',
      centered: true,
    });
  };

  const error = () => {
    Modal.error({
      content: 'Возникла ошибка при добавлении данных',
      className: 'modal-my-class',
      centered: true,
    });
  };

  const addNewTrack = async () => {
    const result = await dispatch(addTrack({ name: inputTrack, courseId: course.id }));
    if (result?.error) {
      error();
    } else {
      success();
      setInputTrack('');
    }
  };

  const configTrack = {
    title: `Трек "${inputTrack}"`,
    content: (
      <>
        Вы действительно хотите добавить трек с таким названием в курс
        <b> "{course.subjectName}"</b>?
      </>
    ),
    centered: true,
    onOk: addNewTrack,
  };

  const configTrackError = {
    title: <>Какие-то из полей были не заполнены</>,
    content: <>Введи название трека</>,
    centered: true,
  };

  const handleAddNewTrack = () => {
    if (!inputTrack) {
      Modal.error(configTrackError);
    } else {
      Modal.confirm(configTrack);
    }
  };

  const handleChangeNewTrack = (e) => {
    setInputTrack(e.target.value);
  };

  React.useEffect(() => {
    return () => setSelectedTrack(null);
  }, []);

  return (
    <div className={`tracks ${destinyTracks.MainPage}`}>
      <Search
        placeholder="Название нового трека"
        allowClear
        value={inputTrack}
        onChange={handleChangeNewTrack}
        onPressEnter={handleAddNewTrack}
        enterButton={
          <div className="enter-button-new" onClick={handleAddNewTrack}>
            <p>Добавить</p> <FileAddOutlined />
          </div>
        }
        size="large"
        className="add_new_track"
      />
      {tracks
        .filter((track) => track.trackName.toLowerCase().includes(inputTrack.toLowerCase()))
        .map((track) => (
          <Track track={track} setSelectedTrack={setSelectedTrack} />
        ))}
    </div>
  );
};

export default Tracks;
