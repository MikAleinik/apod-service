import './App.css';
import React, { useEffect, useState } from 'react';
import { Card, message } from 'antd';
import SelectForm from './view/select-form/select-form';
import ResultPanel from './view/result-panel/result-panel';
import { APOD, ApiDateParams, getImage } from './api/api';

const HEADER_TEXT = 'Сервис Astronomy Picture of the Day';
const ERROR_TEXT = 'Извините, данные от сервиса NASA не получены. Попробуйте позже.';
const initialDate: ApiDateParams = {
  start: null,
  end: null
}
const initialImages: APOD[] = [];

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [images, setImages] = useState(initialImages);
  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.open({
      type: 'error',
      content: ERROR_TEXT,
    });
  };

  useEffect(() => {
    getImage(selectedDate)
      .then((result) => setImages(result))
      .catch(() => error());
  }, [selectedDate]);

  return (
    <Card title={HEADER_TEXT} bordered={true} style={{ maxWidth: 800 }} className='card'>
      <SelectForm callback={setSelectedDate} />
      {contextHolder}
      <ResultPanel images={images} />
    </Card>
  )
};

export default App;
