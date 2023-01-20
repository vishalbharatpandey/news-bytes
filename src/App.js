import './App.css';
import ShowCalendar from './components/ShowCalendar';
import Headlines from './components/Headlines';
import Header from './components/Header';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="text-center">
      <div className="flex flex-row-reverse">
        <div style={{width:"100%"}}>
          <Header />
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
