import React from 'react';
import styled from '@emotion/styled';
import moment from 'moment';

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

//TODO: Improve this feature
function invertColor(hex, bw) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  var r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

const Container = styled.article`
  background-color: ${props => props.color};
  border-radius: 2px;
  border: 1px solid #e5e5e5;
  color: ${props => invertColor(props.color)};
  cursor: pointer;
  font-size: 11px;
  margin-top: 0.5rem;
  padding: 0.5rem;
`;

function CalendarReminder(props) {
  const { data, onClick } = props;
  const { date, text, color, city, weatherForecast } = data;
  return (
    <Container color={color} onClick={() => onClick(props.data)}>
      {moment(date).format('HH:mm')} - {text}
      <br />
      City: {city}
      <br />
      Weather: {weatherForecast}
    </Container>
  );
}

export default CalendarReminder;
