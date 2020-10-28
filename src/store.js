import { action, createStore, thunk, computed } from 'easy-peasy';
// import memoize from 'lodash.memoize';
import moment from 'moment';
import weatherService from './weatherService';

export const calendarModel = {
  weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  currentMonth: moment().format('MM'),
  currentMonthDates: computed(state => {
    const prevMonthDaysCount = parseInt(moment().subtract(1, 'months').daysInMonth());
    const monthDaysCount = parseInt(moment().daysInMonth());
    //Number 0 ~ 6, 0 is Sunday
    const monthStartDay = parseInt(moment().startOf('month').format('e'));
    const result = [];
    for (let index = 0; index < 35; index++) {
      if (index < monthStartDay) {
        result.push(
          moment()
            .startOf('month')
            .subtract(1, 'months')
            .add(prevMonthDaysCount - monthStartDay + index, 'days')
            .format('YYYY-MM-DD'),
        );
      } else if (index < monthDaysCount + monthStartDay) {
        result.push(
          moment()
            .startOf('month')
            .add(index - monthStartDay, 'days')
            .format('YYYY-MM-DD'),
        );
      } else {
        result.push(
          moment()
            .startOf('month')
            .add(1, 'months')
            .add(index - monthStartDay - monthDaysCount, 'days')
            .format('YYYY-MM-DD'),
        );
      }
    }
    return result;
  }),

  remindersById: {},
  reminderIds: computed(state => Object.keys(state.remindersById)),
  reminders: computed(state => state.reminderIds.map(id => state.remindersById[id])),
  //TODO: improve efficiency
  remindersByDate: computed(state => {
    return state.reminders.reduce((result, reminder) => {
      const key = moment(reminder.date).format('YYYY-MM-DD');
      return {
        ...result,
        [key]: [...(result[key] || []), reminder].sort((a, b) => a.date - b.date),
      };
    }, {});
  }),

  //Actions
  setReminder: action((state, payload) => {
    state.remindersById[payload.id] = payload;
  }),
  saveReminder: thunk(async (actions, payload, { injections }) => {
    const { weatherService } = injections;
    actions.setReminder(payload);
    //TODO: pass date in YYYY-MM-DD format
    const weatherForecast = await weatherService.getWeather(payload.date, payload.city);
    actions.setReminder({
      ...payload,
      weatherForecast: weatherForecast?.weather?.[0]?.description ?? '-',
    });
  }),
};

const store = createStore(calendarModel, {
  injections: { weatherService },
});

export default store;
