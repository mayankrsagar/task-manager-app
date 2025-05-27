// src/components/TaskTable.tsx
'use client';
import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { toast } from 'react-toastify';

import { fetchAllTasks } from '@/features/taskSlice';
import TaskCreateModal from '@/modal/TaskCreate';
import {
  AppDispatch,
  RootState,
} from '@/store/store';
import { Task } from '@/types/task';
import { PlusIcon } from '@heroicons/react/24/outline';

import TaskList from './TaskList';

const blankTask: Task = {
  id: '',
  title: '',
  description: '',
  status: 'TODO',
  deadline: new Date(),
  linkedFile: undefined,
  hasFile: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const TaskTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((s: RootState) => s.tasks);

  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit]     = useState(false);
  const [taskData, setTaskData] = useState<Task>(blankTask);

  // load tasks once
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  // toast errors
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleCreateClick = () => {
    setEdit(false);
    setTaskData(blankTask);
    setIsOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEdit(true);
    setTaskData(task);
    setIsOpen(true);
  };

  return (
    <div className="relative pt-16 min-h-screen">
      {/* Floating Add Button */}
      <div className="fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8">
        <button
          onClick={handleCreateClick}
          className="flex items-center bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-6 w-6" />
          <span className="hidden md:inline ml-2">New Task</span>
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <TaskCreateModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          edit={edit}
          setEdit={setEdit}
          formData={taskData}
        />
      )}

      {/* Task list */}
      <TaskList tasks={tasks} makeEdit={handleEdit} />

      {/* Empty state */}
      {!loading && tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tasks found. Click the + button to add your first task!
        </div>
      )}
    </div>
  );
};

export default TaskTable;
