import React, { Component } from 'react';
import Cookies from 'js-cookie'
import './App.css';

const LS_KEY = '____xss-testing__localstorage'
const SS_KEY = '____xss-testing__sessionstorage'
const COOKIE_KEY = '____xss-testing__cookiestorage'

class App extends Component {
  componentDidMount() {
    window.localStorage.setItem(LS_KEY, 'Super Secret Password')
    window.sessionStorage.setItem(SS_KEY, 'Super Secret Session Password')
    Cookies.set(COOKIE_KEY, 'Super Secret Cookie Password')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Storage XSS Vulnerabilities</h2>
          <p style={{maxWidth: '620px', fontSize: '16px'}}>
            Clicking the links demonstrates XSS issues as values are alerted directly from Storage and/or Cookies.
            Values are set using keys with the prefix "____xss-testing".
            This example shows the issue with setting href values for anchor tags directly with props without being sanitized.
            Cookies are vulnerable due to their non-HttpOnly setting.
          </p>
          <a
            className="App-link"
            href={`javascript: alert(window.localStorage.getItem('${LS_KEY}'))`}
          >
            LocalStorage XSS
          </a>
          <a
            className="App-link"
            href={`javascript: alert(window.sessionStorage.getItem('${SS_KEY}'))`}
          >
            SessionStorage XSS
          </a>
          <a
            className="App-link"
            href={`javascript: function C(k){return(document.cookie.match('(^|; )'+k+'=([^;]*)')||0)[2]};alert(decodeURI(C('____xss-testing__cookiestorage')))`}
          >
            Cookie XSS
          </a>
        </header>
      </div>
    );
  }
}

export default App;
