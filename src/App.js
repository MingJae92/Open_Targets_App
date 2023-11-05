import logo from './logo.svg';
import './App.css';
import OpenTargetsApp from './Components/OpenTargetsApp';
import DataTable from './Components/DataTable';

function App() {
  return (
    <div className="App">
      <h1>Data visulisation</h1>
      <OpenTargetsApp/>
      <DataTable/>
    </div>
  );
}

export default App;
