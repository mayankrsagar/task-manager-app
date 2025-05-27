import { Task } from '../models/task.model.js';

export const find = async () => {
  return await Task.find({});
};

export const createTask = async (body) => {
  // body must include title, description, deadLine, etc.
  const task = new Task(body);
  // throws if validation fails
  return await task.save();
};

export const updateTask = async (id, body) => {
  // returns the updated document
  return await Task.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,    // re-run schema validators on update
  });
};

export const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

export const findById =async(id)=>{
  return await Task.findById(id);
}