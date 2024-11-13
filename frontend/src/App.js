import Home from './components/Home';
import './App.css'
import { AuthProvider } from './components/AuthProvider';

function App() {
  return (
    <AuthProvider>
    <Home /></AuthProvider>
  );
}

export default App;
