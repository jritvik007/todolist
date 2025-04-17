import TaskForm from '../Components/TaskForm';
import { useLocation, useNavigate } from 'react-router-dom';

const AddTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const taskToEdit = location.state;
  const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const handleAddTask = (newTask) => {
    if (taskToEdit) {
      
      const updatedTasks = existingTasks.map((task) =>
        task.id === taskToEdit.id ? newTask : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } else {
      localStorage.setItem('tasks', JSON.stringify([...existingTasks, newTask]));
    }

    navigate('/dashboard');
  };

  return <TaskForm onSubmit={handleAddTask} taskToEdit={taskToEdit} />;
};

export default AddTask;
