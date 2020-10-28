import React from 'react';
import styled from '@emotion/styled';
import { primaryColor, borderColor } from '../styles';

const Container = styled.section`
  background-color: ${primaryColor};
  border-bottom: 1px solid ${borderColor};
  border-left: 1px solid ${borderColor};
  color: #ffffff;
  font-weight: 600;
  text-align: center;
`;

export default function CalendarCellHeader(props) {
  const { day } = props;
  return <Container>{day}</Container>;
}
