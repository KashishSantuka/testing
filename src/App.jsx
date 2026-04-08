import { useState, useEffect } from 'react'
import axios from 'axios';
import { Todo } from './Components/Todo'
import { CompleteTask } from './Components/CompleteTask';

function App() {
  const [todo, setTodo] = useState([])
  const [view, setView] = useState('kanban')

  useEffect(() => {
    axios.get('https://backend-1-0jmx.onrender.com/task')
      .then(res => setTodo(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div style={{ background: 'white', borderBottom: '0.5px solid #eee', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Todo tasks</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => setView('kanban')} style={{ fontWeight: view === 'kanban' ? 500 : 400 }}>Kanban board</button>
          <button onClick={() => setView('completed')}>Completed</button>
          <Todo todo={todo} setTodo={setTodo} headerOnly />
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {view === 'kanban' ? (
          <Todo todo={todo} setTodo={setTodo} tableOnly />
        ) : (
          <CompleteTask todo={todo} fullView />
        )}
      </div>
    </div>
  )
}
export default App