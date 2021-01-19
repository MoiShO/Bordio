import React from 'react';
import { GlobalStyles } from './styles';
import { AuthForm } from './components/organism/AuthForm';

function App() {
  return (
    <div>
      <GlobalStyles />
      <AuthForm />
    </div>
  );
}

export default App;
