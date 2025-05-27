import axios from 'axios';

import {
  Task,
  TaskCreate,
} from '@/types/task';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

// Define the slice state
interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async thunk to fetch all tasks
export const fetchAllTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>(
  'tasks/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/`);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Async thunk to create a new task using TaskCreate type
export const createTask = createAsyncThunk<
  Task,
  TaskCreate,
  { rejectValue: string }
>(
  'tasks/create',
  async (formData, { rejectWithValue }) => {
    try {
      console.log()
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/add`, formData);
      
      return response.data;
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.errors[0] || err.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Async thunk to update a task
export const updateTask = createAsyncThunk<
  Task,
  { id: string; data: Partial<TaskCreate> },
  { rejectValue: string }
>(
  'tasks/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, data);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Async thunk to delete a task
export const deleteTask = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'tasks/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
      return id;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Create slice
export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch tasks';
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to create task';
      })
      .addCase(updateTask.pending, (state) => {
   state.loading = true;
  state.error = null;
  })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index >= 0) state.tasks[index] = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload ?? 'Failed to update task';
})
.addCase(deleteTask.pending, (state) => {
  state.loading = true;
  state.error = null;
})
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(t => t.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload ?? 'Failed to delete task';
})
  },
});

// Export reducer
export default taskSlice.reducer;
