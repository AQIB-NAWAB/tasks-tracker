'use client'

import { Task } from "@/types/task"
import { FaTrashAlt } from "react-icons/fa"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { FaRegCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation"; // Import useRouter

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const router = useRouter(); // Get the router instance

  const handleEditClick = () => {
    // Navigate to the edit page programmatically
    router.push(`/edit/${task.id}`);
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-opacity-50 rounded-lg bg-gray-800">
      <div
        className={`cursor-pointer ${task.completed ? 'text-blue-500' : 'text-gray-400'}`}
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? <AiOutlineCheckCircle size={24} /> : <FaRegCircle  size={20} />}
      </div>

      <span
        className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}
      >
        {task.title}
      </span>

      {/* Edit Button - Programmatic Navigation */}
      <button className="text-white" onClick={handleEditClick}>
        <MdEdit size={18} />
      </button>

      {/* Delete Button */}
      <button 
        className="text-white"
        onClick={() => onDelete(task.id)}
      >
        <FaTrashAlt size={18} />
      </button>
    </div>
  );
}
