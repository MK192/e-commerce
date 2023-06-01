import Nav from './Nav';
import Main from './Main';
import DataProvider from './DataProvider';
import { useState, useEffect } from 'react';

const App = () => {
  return (
    <>
      <DataProvider>
        <Nav />

        <Main />
      </DataProvider>
    </>
  );
};
export default App;
