import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const App = () => {
  return (
    <div className="container">
      <div className="col-md-6 offset-md-3">
        <Header />
        <ContactForm />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'));
