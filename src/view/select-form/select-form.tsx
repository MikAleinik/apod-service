import style from './style.module.css';
import React, { useState } from 'react';
import { Select, Form, Button } from 'antd';
import type { DatePickerProps, GetProps } from 'antd';
import { DatePicker } from 'antd';
import { ApiDateParams } from '../../api/api';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
const DATE_FORMAT = 'YYYY-MM-DD';

const SELECT_TEXT = 'Выберите тип';
const SELECT_SINGLE_DAY_TEXT = 'Снимок за один день';
const SELECT_MULTI_DAY_TEXT = 'Снимки за период';
const SINGLE_DAY_TEXT = 'Выберите дату';
const SINGLE_START_DAY_TEXT = 'Дата снимка';
const MULTI_DAY_TEXT = 'Выберите период';
const MULTI_START_DAY_TEXT = 'Дата начала';
const MULTI_END_DAY_TEXT = 'Дата завершения';
const BUTTON_TEXT = 'Получить снимок';

type SelectFormProps = {
	callback: (date: ApiDateParams) => void;
}
const initialDate: ApiDateParams = {
	start: null,
	end: null
}
const widthElement: React.CSSProperties = {
	width: '70%',
}

const disabledDate = (current: Dayjs) => {
	return current > dayjs();
};

const SelectForm: React.FC<SelectFormProps> = ({ callback }) => {
	const [isSingleDay, setSingleday] = useState(true);
	const [isEnabledSubmit, setEnabledSubmit] = useState(false);
	const [date, setDate] = useState(initialDate);

	const selectTypeDayHandler = (value: string) => {
		if (value === SELECT_SINGLE_DAY_TEXT) {
			setSingleday(true);
		} else {
			setSingleday(false);
		}
		setEnabledSubmit(false);
	};

	const selectSingleDateHandler: DatePickerProps['onChange'] = (date, dateString) => {
		setEnabledSubmit(true);
		setDate({ start: dateString, end: null });
	}
	const selectMultiDateHandler = (
		value: DatePickerProps['value'] | RangePickerProps['value'],
		dateString: [string, string] | string
	) => {
		setEnabledSubmit(true);
		setDate({ start: dateString[0], end: dateString[1] });
	}

	const clickSubmitHandler = () => {
		callback(date);
	}

	return (
		<Form
			name="wrap"
			labelCol={{ flex: '200px' }}
			labelAlign="right"
			labelWrap
			wrapperCol={{ flex: 1 }}
			colon={false}
			style={{ maxWidth: 600 }}
			className={style.form}
		>
			<Form.Item label={SELECT_TEXT}>
				<Select
					defaultValue={SELECT_SINGLE_DAY_TEXT}
					onChange={selectTypeDayHandler}
					options={[
						{ value: SELECT_SINGLE_DAY_TEXT, label: SELECT_SINGLE_DAY_TEXT },
						{ value: SELECT_MULTI_DAY_TEXT, label: SELECT_MULTI_DAY_TEXT },
					]}
					style={widthElement}
				/>
			</Form.Item>
			{isSingleDay ?
				<Form.Item label={SINGLE_DAY_TEXT}>
					<DatePicker
						onChange={selectSingleDateHandler}
						format={DATE_FORMAT}
						placeholder={SINGLE_START_DAY_TEXT}
						style={widthElement}
						disabledDate={disabledDate}
					/>
				</Form.Item> :
				<Form.Item label={MULTI_DAY_TEXT}>
					<RangePicker
						onChange={selectMultiDateHandler}
						format={DATE_FORMAT}
						placeholder={[MULTI_START_DAY_TEXT, MULTI_END_DAY_TEXT]}
						style={widthElement}
						disabledDate={disabledDate}
					/>
				</Form.Item>}
			<Form.Item label=' '>
				<Button type="primary" disabled={!isEnabledSubmit} onClick={clickSubmitHandler}>{BUTTON_TEXT}</Button>
			</Form.Item>
		</Form>
	)
};

export default SelectForm;