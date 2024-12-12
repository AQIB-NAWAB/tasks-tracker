'use client'
import { TaskItem } from '@/components/task-item'
import { Task } from '@/types/task'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Loader from '@/components/loader'  

const HomePage = () => {


  const [todos, setTodos] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false); 

  React.useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);  
      try {
        const res = await fetch('http://localhost:3001/tasks');
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchTasks();
  }, []);

  const handleToggle = async (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    try {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: updatedTodos.find(todo => todo.id === id)?.completed }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (id: string) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);

    try {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-[-17px]">
      <Link href={"/create"} className="bg-[#1E6F9F] block text-center flex-col pt-3 text-white w-full h-12 rounded-sm font-medium mb-4">Create New Task </Link>
      
      <div className="flex justify-between items-center mb-6 mt-2">
        <h2 className="text-2xl font-semibold text-white">Tasks <span className="text-blue-500">{todos.length}</span></h2>
        <div className="text-gray-600">
          <span className="text-purple-500">Completed</span>
          <span className="font-bold ml-2 text-blue-500">{todos.filter(todo => todo.completed).length}</span>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {loading ? (  
          <Loader />
        ) : todos.length === 0 ? (
          <div className="text-center">
            <Image src="/images/clipboard.png" alt="clipboard" width={100} height={100} className="mx-auto mb-4" />
            <p className="text-white text-lg mb-2">You do not have any tasks registered yet.</p>
            <p className="text-gray-400">Create tasks and organize your to-do items.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {todos.map(todo => (
              <TaskItem key={todo.id} task={todo} onToggle={handleToggle} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
