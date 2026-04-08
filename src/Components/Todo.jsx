// import { useState } from 'react';
// import axios from 'axios';

// export const Todo = ({ todo }) => {
//   const [title, setTitle] = useState('');

//   const handleCreateFunction = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/task/', {
//         title: title
//       });
//       console.log(response.data);
//       setTitle('');
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   return (
//     <>
//       <h1>Tasks</h1>
//       <input
//         type="text"
//         placeholder="Enter task title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <button onClick={handleCreateFunction}>Create Task</button>
//       {todo.map((task) => (
//         <div key={task.id}>
//           <p>{task.title}</p>
//           <p>Status: {task.status}</p>
//         </div>
//       ))}
//     </>
//   )
// }


import { useState } from 'react';
import axios from 'axios';

export const Todo = ({ todo, setTodo, headerOnly, tableOnly }) => {
  const [title, setTitle] = useState('');

  const handleCreateFunction = async () => {
    if (!title || title.trim() === '') return;
    try {
  const response =    await axios.post(
  'https://fascinating-rolypoly-b8ea9c.netlify.app/task',
  { title: title.trim() }
);
      setTodo([...todo, response.data]);
      setTitle('');
    } catch (err) {
      console.error(err);
    }
  }

  const handleStatusToggle = async (task) => {
    const updatedStatus = task.status === 'todo' ? 'done' : 'todo';
    try {
      await axios.put(`http://localhost:3000/task/${task.id}`, { status: updatedStatus });
      setTodo(todo.map(t => t.id === task.id ? { ...t, status: updatedStatus } : t));
    } catch (err) {
      console.error(err);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/task/${id}`);
      setTodo(todo.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  if (headerOnly) return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleCreateFunction()}
        style={{ padding: '6px 10px', borderRadius: '8px', border: '0.5px solid #ccc', fontSize: '13px' }}
      />
      <button onClick={handleCreateFunction} style={{ padding: '6px 14px', fontSize: '13px', borderRadius: '8px', border: '0.5px solid #ccc', cursor: 'pointer' }}>
        Submit
      </button>
    </div>
  )

  if (tableOnly) return (
    <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Done</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todo.filter(t => t.status === 'todo').map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.status}</td>
            <td>
              <input type="checkbox" checked={false} onChange={() => handleStatusToggle(task)} />
            </td>
            <td>
              <button onClick={() => handleDelete(task.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px' }}>🗑</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}