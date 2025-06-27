
import React from 'react';
import ShortenURLForm from './components/ShortenURLForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <ShortenURLForm />
    </div>
  );
};

export default App;
