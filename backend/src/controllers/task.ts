import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import TaskType from 'models/taskType';
import Task from 'models/task';
 
// UPDATE 
// DELETE
// LOOKUP DATA
@Controller('/api')
export class TaskController {
 
  @Get('/get-task-type')
  async getTaskType() {
    return await TaskType.aggregate([
      {
        '$project': {
          'name': 1, 
          'taskTypeId': 1, 
          'attributes': 1, 
          '_id': 0
        }
      }
    ]);
   }

   @Get('/get-task')
   async getTask() {
     return await Task.aggregate([
      {
        '$lookup': {
          'from': 'tasktypes', 
          'localField': 'taskTypeId', 
          'foreignField': 'taskTypeId', 
          'as': 'taskType'
        }
      }, {
        '$project': {
          '_id': 0, 
          'name': 1, 
          'description': 1, 
          'taskName': {
            '$first': '$taskType.name'
          },
          'taskId': 1
        }
      }
    ]);
    }

   @Get('/get-task/:id')
   async getTaskById(@Param('id') id: string) {
     return await Task.aggregate([
       {
          '$match': {
            'taskTypeId': id
          }
       },
     ]);
    }

    @Get('/get-task-type/:id')
    async getTaskTypeById(@Param('id') id: string) {
      return await TaskType.aggregate([
        {
           '$match': {
             'taskTypeId': id
           }
        },
      ]);
     }

    @Post('/update-task')
    async updateTaskById( @Body() body: any ) {
      const { taskTypeId } = body;
      const updateItems = { ...body }
      delete updateItems.taskTypeId;
      try {
        await Task.findOneAndUpdate({ taskTypeId }, { ...updateItems })
        return {
          success: true,
          message: "Task updated successfully"
        }
      } catch (error) {
        return {
          success: false,
          message: "Task could not be updated. Please try after some time."
        }
      }
    }

    @Post('/delete-task')
    async deleteTaskById( @Body() body: any ) {
      const { taskId } = body;
      try {
        await Task.findOneAndDelete({ taskId })
        return {
          success: true,
          message: "Task deleted successfully"
        }
      } catch (error) {
        return {
          success: false,
          message: "Task could not be deleted. Please try after some time."
        }
      }
    } 

  @Post('/add-task-type')
  async addTaskType( @Body() body: any ) {

    console.log("BODY", body)
    const newTaskType = new TaskType(body);
    const result = await newTaskType.save();

    if(!result) 
      return {
        success: false,
        message: "Task type could not be added. Please try after some time."
      }

    return {
      success: true,
      message: "Task type is added."
    };
   }

  @Post('/add-task')
  async addTask( @Body() body: any ) {
    const { taskTypeId, taskTypeAttributes } = body;
    const findTaskType = await TaskType.aggregate([
      {
        '$match': {
          'taskTypeId': taskTypeId
        }
      }
    ])
    if(findTaskType.length === 0) return {
      success: false,
      message: "Task could not be added as Task Type does not exist"
    }

    // if(findConnectionType[0].attributes.length !== connectionTypeAttributes.length) {
    //   return {
    //     success: false,
    //     message: "Contection Type Attributes length should match Task Attributes length"
    //   }
    // }

    const newTask = new Task(body);
    const result = await newTask.save();

    if(!result) 
      return {
        success: false,
        message: "Task could not be added. Please try after some time."
      }

    return {
      success: true,
      message: "Task is added."
    };
   }
}