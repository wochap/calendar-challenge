import React from 'react';
import styled from '@emotion/styled/macro';
import { primaryColor, borderColor } from '../styles';
import CalendarReminder from './CalendarReminder';

const Button = styled.button`
  appearance: none;
  border: 0;
  background-color: ${primaryColor};
  color: #ffffff;
  font-weight: 600;
  margin-left: 5px;
  padding: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;
const Container = styled.section`
  background-color: ${props => (props.isWeekend ? '#F1F1F1' : '#ffffff')};
  border-bottom: 1px solid ${borderColor};
  border-left: 1px solid ${borderColor};
  color: ${props => (props.isDisabled ? '#C5C5C5' : props.isWeekend ? primaryColor : 'inherit')};
  font-weight: 600;
  overflow: auto;
  padding: 0.5rem;

  &:hover ${Button} {
    opacity: 1;
  }
`;

function CalendarCell(props) {
  const { date, reminders, isWeekend, isDisabled, onAddReminder, onClickReminder } = props;
  return (
    <Container isWeekend={isWeekend} isDisabled={isDisabled}>
      <span>{date.slice(-2)}</span>
      {!isDisabled && (
        <Button data-testid={`addReminderButton-${date.slice(-2)}`} onClick={() => onAddReminder(date)} type="button">
          Add reminder
        </Button>
      )}
      {reminders &&
        reminders.map(reminder => (
          <CalendarReminder onClick={onClickReminder} key={reminder.id} data={reminder}></CalendarReminder>
        ))}
    </Container>
  );
}

export default CalendarCell;
