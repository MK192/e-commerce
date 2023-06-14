import Nav from './Nav';
import Main from './Main';
import Item from './Item';
import DataProvider from './DataProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/item/:id" element={<Item />} />
          </Routes>
        </DataProvider>
      </BrowserRouter>
    </>
  );
};
export default App;
