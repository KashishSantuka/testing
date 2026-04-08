export const CompleteTask = ({ todo }) => {
  const completedTasks = todo.filter(task => task.status === 'done');

  return (
    <div>
      <h2>Completed Tasks</h2>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Task</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {completedTasks.map(task => (
            <tr key={task.id}>
              {/* <td>{task.id}</td> */}
              <td>{task.title}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};