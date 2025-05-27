import React from 'react';

import { useDispatch } from 'react-redux';

import {
  deleteTask,
  updateTask,
} from '@/features/taskSlice';
import { AppDispatch } from '@/store/store';
import { Task } from '@/types/task';

interface TaskListProps{
    tasks:Task[],
    makeEdit:(task:Task)=>void
}

const TaskList:React.FC<TaskListProps> = ({tasks, makeEdit}) => {
    const dispatch=useDispatch<AppDispatch>();
     const formatDate = (date: Date) => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      return new Date(date).toLocaleDateString(undefined, options);
    };
  return (
     <div className="overflow-x-auto px-4 md:px-6"> {/* Added horizontal padding */}
        <table className="min-w-full divide-y divide-gray-200 border">
          {/* Table Header */}
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Title</th>
              <th className="px-4 py-2 text-left font-semibold hidden md:table-cell">Description</th>
              <th className="px-4 py-2 text-left font-semibold">Deadline</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task: Task) => (
              <tr key={task.id}>
                <td className="px-4 py-2 truncate max-w-[150px] md:max-w-xs" title={task.title}>
                  {task.title}
                </td>
                <td className="px-4 py-2 truncate max-w-[200px] md:max-w-xs hidden md:table-cell" 
                    title={task.description}>
                  {task.description}
                </td>
                <td className="px-4 py-2">
                  {formatDate(task.deadline)}
                  <br />
                  <code className="text-xs text-gray-500">
                    {task.status}
                  </code>
                </td>
                <td className="px-4 py-2">
                  <span className={`inline-block px-2 py-1 rounded 
                    ${task.status === 'DONE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    {task.status === "TODO" && (
                      <button onClick={()=>dispatch(updateTask({id:task.id,data:{status:"DONE"}}))}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm md:text-base"
                      >
                        Done
                      </button>
                    )}
                    <button
                      onClick={() => dispatch(deleteTask(task.id))}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm md:text-base"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => makeEdit(task)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm md:text-base"
                    >
                      edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default TaskList