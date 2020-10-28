import React from 'react';
import ReactDOM from 'react-dom';
import { i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/en';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

i18n.use(locale);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
