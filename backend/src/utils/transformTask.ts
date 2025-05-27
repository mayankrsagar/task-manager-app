// export const transformTask = (task) => {
//   const taskObj = task.toObject ? task.toObject() : task;
  
//   if (taskObj.linkedFile?.data) {
//     taskObj.fileUrl = `/api/tasks/${taskObj._id}/file`;
//     delete taskObj.linkedFile.data;
//   }
  
//   return taskObj;
// };