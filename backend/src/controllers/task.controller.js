import * as TaskServices from '../services/task.service.js';

export const transformTask = (task) => {
  const obj = task.toObject();
  // nothing to strip—there is no buffer field anymore
  return obj;
}



export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskServices.find();
    const transformedTasks = tasks.map(task => transformTask(task));
    return res.status(200).json(transformedTasks);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const taskData = { title, description, deadline };

    if (req.file?.publicUrl) {
  taskData.linkedFile = {
    url: req.file.publicUrl,
    contentType: req.file.mimetype,
  };
}
// console.log(taskData)
    const newTask = await TaskServices.createTask(taskData);
    return res.status(201).json(transformTask(newTask));
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

  if (req.file?.publicUrl) {
  updatedData.linkedFile = {
    url: req.file.publicUrl,
    contentType: req.file.mimetype,
  };
}

    const updated = await TaskServices.updateTask(id, updatedData);
    if (!updated) return res.status(404).json({ message: 'Task not found' });

    return res.status(200).json(transformTask(updated));
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ error: err.message });
  }
};

export const getTaskFile = async (req, res) => {
  const task = await TaskServices.findById(req.params.id);
  if (!task?.linkedFile?.url) {
    return res.status(404).json({ error: 'File not found' });
  }
  return res.redirect(task.linkedFile.url);
};


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TaskServices.deleteTask(id);
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
