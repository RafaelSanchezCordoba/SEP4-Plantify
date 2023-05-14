import axios from 'axios'
import { ITask } from "@sep4/types";
axios.defaults.withCredentials = true

const getCurrentTasks = ():Promise<ITask[]> => {
  // return new Promise<ITask[]>((resolve, reject) => {
  //   resolve( [{
  //     id: 1,
  //     type: "water",
  //     date: "2021-05-05",
  //     plantId: 12,
  //     status: "current",
  //   }])
  // })
  return axios.get(`http://localhost:3333/api/v1/tasks/`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const completeTask = (taskId: number):Promise<ITask> => {
  return axios.delete(`http://localhost:3333/api/v1/tasks/${taskId}`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

export { getCurrentTasks, completeTask }