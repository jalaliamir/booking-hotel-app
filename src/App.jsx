import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/Header/Header';
import LocationList from './components/LocationList/LocationList';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout';
import Hotels from './components/Hotels/Hotels';
import HotelsProvider from './context/HotelsProvider';
import SingelHotel from './components/SingleHotel/SingelHotel';

function App() {
  return (
    <HotelsProvider>
      <Toaster />
      <Header />
      <Routes>
        <Route path='/' element={<LocationList />} />
        <Route path='/hotels' element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=':id' element={<SingelHotel />} />
        </Route>
      </Routes>
    </HotelsProvider>
  );
}

export default App;
