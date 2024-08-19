import TodoList from './components/TodoList';
import { Provider } from './store';
import './App.css';
const App = () => {
  return (
    <div className="app">
      <Provider>
        <TodoList />
      </Provider>
    </div>
  );
};

export default App;
