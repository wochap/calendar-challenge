import React from 'react';
import styled from '@emotion/styled';
import { primaryColor, borderColor } from '../styles';
import CalendarReminder from './CalendarReminder';

const Container = styled.section`
  background-color: ${props => (props.isWeekend ? '#F1F1F1' : '#ffffff')};
  border-bottom: 1px solid ${borderColor};
  border-left: 1px solid ${borderColor};
  color: ${props => (props.isDisabled ? '#C5C5C5' : props.isWeekend ? primaryColor : 'inherit')};
  font-weight: 600;
  overflow: auto;
  padding: 0.5rem;
`;

function CalendarCell(props) {
  const { date, reminders, isWeekend, isDisabled, onAddReminder, onClickReminder } = props;
  return (
    <Container isWeekend={isWeekend} isDisabled={isDisabled}>
      <span>{date.slice(-2)}</span>
      {!isDisabled && (
        <button data-testid={`addReminderButton-${date.slice(-2)}`} onClick={() => onAddReminder(date)} type="button">
          Add reminder
        </button>
      )}
      {reminders &&
        reminders.map(reminder => (
          <CalendarReminder onClick={onClickReminder} key={reminder.id} data={reminder}></CalendarReminder>
        ))}
    </Container>
  );
}

export default CalendarCell;
