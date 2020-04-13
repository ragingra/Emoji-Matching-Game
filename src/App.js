import React from 'react';
import Item from './components/Item';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <Board pairs={5} />
    </div>
  );
}

export default App;
