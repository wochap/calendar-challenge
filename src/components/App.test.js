import React from 'react';
import App from './App';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { createStore } from 'easy-peasy';
import { calendarModel } from '../store';

import '@testing-library/jest-dom';

const renderApp = () => render(<App />);

afterEach(() => {
  cleanup();
});

test('store saveReminder action works', async () => {
  const reminder = {
    id: '1234',
    date: new Date(),
    text: 'My reminder',
    color: '#ffffff',
    city: 'Bogota',
  };
  const weatherResponse = {
    weatherForecast: {
      weather: [
        {
          description: 'rainy',
        },
      ],
    },
  };
  const mockWeatherService = {
    getWeather: jest.fn(() => Promise.resolve(weatherResponse)),
  };
  const store = createStore(calendarModel, {
    injections: { weatherService: mockWeatherService },
    mockActions: true,
  });

  await store.getActions().saveReminder(reminder);

  expect(mockWeatherService.getWeather).toHaveBeenCalledWith(reminder.date, reminder.city);
  expect(store.getMockedActions()).toEqual([
    { type: '@thunk.saveReminder(start)', payload: reminder },
    { type: '@action.setReminder', payload: reminder },
    {
      type: '@action.setReminder',
      payload: {
        ...reminder,
        weatherForecast: '-',
      },
    },
    { type: '@thunk.saveReminder(success)', payload: reminder },
  ]);
});

test('add reminder works', () => {
  let { getByTestId, queryByText } = renderApp();
  const addRemintedButton1 = getByTestId('addReminderButton-01');
  const formInputText = getByTestId('formInputText');
  const formInputCity = getByTestId('formInputCity');
  const formSubmitButton = getByTestId('formSubmitButton');
  const reminderText = 'My reminder';
  fireEvent.click(addRemintedButton1);
  fireEvent.input(formInputText, {
    target: {
      value: reminderText,
    },
  });
  fireEvent.input(formInputCity, {
    target: {
      value: 'Bogota',
    },
  });
  fireEvent.click(formSubmitButton);

  //TODO: search by testid
  const reminderEl = queryByText(reminderText);
  expect(reminderEl).not.toBe(null);
});
