import React, { useState, useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import styled from '@emotion/styled';
import moment from 'moment';
import CalendarCell from './CalendarCell';
import CalendarCellHeader from './CalendarCellHeader';
import { borderColor } from '../styles';
import { Dialog, Form, Input, Button, ColorPicker, TimePicker } from 'element-react';
import uuid from 'uuid-v4';

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto repeat(5, 1fr);
  height: 100vh;
  margin: 0 auto;
  min-height: 600px;
  max-height: 700px;
  max-width: 1000px;
  min-width: 700px;
  width: 100vw;
  border-top: 1px solid ${borderColor};
  border-right: 1px solid ${borderColor};
`;

const defaultForm = {
  date: new Date(),
  text: '',
  color: '#ffffff',
  city: '',
};

//TODO: create CalendarContainer
function Calendar() {
  const formInstance = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [colorPickerKey, setColorPickerKey] = useState(uuid());
  const [reminderForm, setReminderForm] = useState(defaultForm);
  //Date in YYYY-MM-DD format
  const [dateSelected, setDateSelected] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const currentMonthDates = useStoreState(state => state.currentMonthDates);
  const remindersByDate = useStoreState(state => state.remindersByDate);
  const weekDays = useStoreState(state => state.weekDays);
  const currentMonth = useStoreState(state => state.currentMonth);
  const saveReminder = useStoreActions(actions => actions.saveReminder);
  const onAddReminder = date => {
    setIsEditing(false);
    setColorPickerKey(uuid());
    setIsDialogOpen(true);
    setReminderForm({
      ...defaultForm,
      id: uuid(),
      date: moment(date, 'YYYY-MM-DD').toDate(),
    });
    setDateSelected(date);
  };
  const onChange = (key, value) => {
    if (key === 'date' && !value) {
      //HACK: prevent clearing date picker
      setReminderForm({
        ...reminderForm,
        [key]: moment(dateSelected, 'YYYY-MM-DD').toDate(),
      });
      return;
    }
    setReminderForm({
      ...reminderForm,
      [key]: value,
    });
  };
  const onSubmit = event => {
    event.preventDefault();
    formInstance.current.validate(valid => {
      if (!valid) {
        return;
      }
      //HACK: stop submit when ColorPicker button is clicked
      if (event?.nativeEvent?.submitter?.classList?.contains('el-color-dropdown__btn')) {
        return;
      }
      setIsDialogOpen(false);
      saveReminder(reminderForm);
    });
  };
  const rules = {
    text: [
      { required: true, message: 'Please input text', trigger: 'blur' },
      {
        validator(rule, value, cb) {
          if (value.length > 30) {
            cb('Max length 30');
          }
          cb();
        },
        trigger: 'blur',
      },
    ],
    city: [{ required: true, message: 'Please input city', trigger: 'blur' }],
  };
  const onClickReminder = reminder => {
    setIsEditing(true);
    setIsDialogOpen(true);
    setReminderForm(reminder);
    setDateSelected(moment(reminder.date).format('YYYY-MM-DD'));
    setColorPickerKey(uuid());
  };

  return (
    <div>
      <Container>
        {weekDays.map(day => (
          <CalendarCellHeader key={day} day={day}></CalendarCellHeader>
        ))}
        {currentMonthDates.map((date, index) => (
          <CalendarCell
            isDisabled={date.split('-')[1] !== currentMonth}
            isWeekend={index % 7 === 0 || (index + 1) % 7 === 0}
            key={date}
            date={date}
            reminders={remindersByDate[date]}
            onAddReminder={onAddReminder}
            onClickReminder={onClickReminder}
          ></CalendarCell>
        ))}
      </Container>
      <Dialog
        title={`Add new reminder to ${dateSelected}`}
        visible={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
      >
        <Dialog.Body>
          <Form ref={formInstance} model={reminderForm} rules={rules} onSubmit={onSubmit}>
            <Form.Item label="Text" prop="text">
              <Input
                data-testid="formInputText"
                value={reminderForm.text}
                onChange={onChange.bind(this, 'text')}
              ></Input>
            </Form.Item>
            <Form.Item label="City" prop="city">
              <Input
                data-testid="formInputCity"
                value={reminderForm.city}
                onChange={onChange.bind(this, 'city')}
              ></Input>
            </Form.Item>
            <Form.Item label="Date" prop="date">
              <TimePicker value={reminderForm.date} placeholder="Pick a time" onChange={onChange.bind(this, 'date')} />
            </Form.Item>
            <Form.Item label="Color" prop="color">
              <ColorPicker
                key={colorPickerKey}
                value={reminderForm.color}
                onChange={onChange.bind(this, 'color')}
                colorFormat="hex"
              ></ColorPicker>
            </Form.Item>
          </Form>
        </Dialog.Body>

        <Dialog.Footer className="dialog-footer">
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          <button className="el-button el-button--primary" data-testid="formSubmitButton" onClick={onSubmit}>
            <span>{isEditing ? 'Edit' : 'Add'} reminder</span>
          </button>
          {/* <Button data-testid="formSubmitButton" type="primary" onClick={onSubmit}></Button> */}
        </Dialog.Footer>
      </Dialog>
    </div>
  );
}

export default Calendar;
