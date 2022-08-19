import { Controller, Param, Body, Get, Post, Put, Delete, UseBefore } from 'routing-controllers';
import TaskType from 'models/taskType';
import Task from 'models/task';
import AuthMiddleware from 'middlewares/AuthMiddleware';
 
// UPDATE 
// DELETE
// LOOKUP DATA
@Controller('/api')
export class TaskController {
 
  @Get('/get-task-type')
  @UseBefore(AuthMiddleware)
  async getTaskType() {
    return await TaskType.aggregate([
      {
        '$project': {
          'name': 1, 
          'taskTypeId': 1, 
          'taskTypeName': 1,
          'attributes': 1, 
          '_id': 0
        }
      }
    ]);
  }

  @Get('/get-task')
  @UseBefore(AuthMiddleware)
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

  @Get('/get-task-type-name/:name')
  @UseBefore(AuthMiddleware)
  async getTaskTypeName(@Param('name') name: string) {
    return await Task.aggregate([
      {
        '$match': {
          'name': name,
        }
      }, {
        '$project': {
          'taskTypeName': 1,
        }
      }
    ]);
  }

  @Get('/get-task/:id')
  @UseBefore(AuthMiddleware)
  async getTaskById(@Param('id') id: string) {
    return await Task.aggregate([
      {
        '$match': {
          'taskId': id
        }
      },
    ]);
  }

  @Get('/get-task-type/:id')
  @UseBefore(AuthMiddleware)
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
  @UseBefore(AuthMiddleware)
  async updateTaskById(@Body() body: any) {
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
  @UseBefore(AuthMiddleware)
  async deleteTaskById(@Body() body: any) {
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
  @UseBefore(AuthMiddleware)
  async addTaskType(@Body() body: any) {
    const newTaskType = new TaskType(body);
    const result = await newTaskType.save();

    if (!result)
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
  @UseBefore(AuthMiddleware)
  async addTask(@Body() body: any) {
    const { taskTypeId, taskTypeAttributes } = body;
    const findTaskType = await TaskType.aggregate([
      {
        '$match': {
          'taskTypeId': taskTypeId
        }
      }
    ])
    if (findTaskType.length === 0) return {
      success: false,
      message: "Task could not be added as Task Type does not exist"
    }

    const newTask = new Task(body);
    const result = await newTask.save();

    if (!result)
      return {
        success: false,
        message: "Task could not be added. Please try after some time."
      }

    return {
      success: true,
      message: "Task is added."
    };
  }

  @Post('/edit-task')
  @UseBefore(AuthMiddleware)
  async editTask(@Body() body: any) {

    const payload = {
      ...body
    }
    delete body.id

    const result = await Task.findOneAndUpdate({ "taskId": body.taskDetails.taskId }, {
      description: body.taskDetails.description,
      taskTypeAttributes: body.taskDetails.taskTypeAttributes,

    });

    if (!result)
      return {
        success: false,
        message: "Task could not be updated. Please try after some time."
      }

    return {
      success: true,
      message: "Task is updated."
    };
  }


}