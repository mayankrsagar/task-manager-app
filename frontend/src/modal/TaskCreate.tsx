'use client';

import {
  useEffect,
  useState,
} from 'react';

import { useDispatch } from 'react-redux';

import {
  createTask,
  updateTask,
} from '@/features/taskSlice';
import { AppDispatch } from '@/store/store';
import {
  Task,
  TaskCreate,
} from '@/types/task';

interface Props {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  edit: boolean;
  setEdit: (v: boolean) => void;
  formData: Task;
}

const TaskCreateModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  edit,
  setEdit,
  formData,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState(formData.title );
  const [description, setDesc] = useState(formData.description);
  const [deadline, setDeadline] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setTitle(formData.title);
    setDesc(formData.description);

    const dt =
      formData.deadline instanceof Date
        ? formData.deadline
        : new Date(formData.deadline);
    setDeadline(isNaN(dt.getTime()) ? '' : dt.toISOString().slice(0, 16));

    if (formData.linkedFile) {
      const { data, contentType } = formData.linkedFile;
      const f = new File([data], `${formData.title || 'upload'}.pdf`, {
        type: contentType,
      });
      setFile(f);
    } else {
      setFile(null);
    }
  }, [formData]);

  const closeModal = () => {
    setIsOpen(false);
    setEdit(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let linkedFile: TaskCreate['linkedFile'] | undefined;
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Only PDFs allowed');
        return;
      }
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      linkedFile = { data: base64, contentType: file.type };
    }

    const payload: TaskCreate = {
      title,
      description,
      deadline: new Date(deadline),
      status: formData.status ?? 'TODO',
      ...(linkedFile && { linkedFile }),
    };

    try {
      if (edit) {
        await dispatch(updateTask({ id: formData.id, data: payload }));
      } else {
        await dispatch(createTask(payload));
      }
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {edit ? 'Edit Task' : 'Create Task'}
          </h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Deadline *</label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Attach PDF (Optional)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500  file:mr-4 file:py-2 file:px-4 file:rounded-lg  file:border-0 file:text-sm file:font-semibold  file:bg-blue-50 file:text-blue-700  hover:file:bg-blue-100"
            />
            {file && <p className="mt-1 text-sm truncate">{file.name}</p>}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {edit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreateModal;
