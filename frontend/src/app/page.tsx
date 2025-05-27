import { ToastContainer } from 'react-toastify';

import Navbar from '@/components/Navbar';
import TaskManager from '@/components/TaskManager';

export default function Home() {
  return ( <div>
    <Navbar/>
    <TaskManager/>
    <ToastContainer />
  </div>
  )
}
