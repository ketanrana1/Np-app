import { Controller, Param, Body, Get, Post, Put, Delete, UseBefore } from 'routing-controllers';
import taskType from 'models/taskType';
import AuthMiddleware from 'middlewares/AuthMiddleware';

// UPDATE  
// DELETE
// LOOKUP DATA
@Controller('/api')
export class TaskTypeController {

  @Get('/get-taskType')
  @UseBefore(AuthMiddleware)
  async getTaskType() {
    return await taskType.aggregate([
      {
        '$project': {
          '_id': 0, 
          'createdAt': 0, 
          'updatedAt': 0, 
          '__v': 0
        }
      }
    ]);
  }

  @Get('/get-taskType/:id')
  @UseBefore(AuthMiddleware)
  async getTaskTypeById(@Param('id') id: string) {
    return await taskType.aggregate([
      {
        '$match': {
          'taskTypeId': id
        }
      },
    ]);
  }

  @Post('/update-taskType')
  @UseBefore(AuthMiddleware)
  async updateTaskTypeById(@Body() body: any) {
    const { taskTypeId } = body;
    const updateItems = { ...body }
    delete updateItems.taskTypeId;
    try {
      await taskType.findOneAndUpdate({ taskTypeId }, { ...updateItems })
      return {
        success: true,
        message: "Task type updated successfully"
      }
    } catch (error) {
      return { 
        success: false,
        message: "Task type could not be updated. Please try after some time."
      }
    }
  }

  @Post('/delete-taskType')
  @UseBefore(AuthMiddleware)
  async deleteTaskTypeById(@Body() body: any) {
    const { taskTypeId } = body;
    try {
      await taskType.findOneAndDelete({ taskTypeId })
      return {
        success: true,
        message: "Task type deleted successfully"
      }
    } catch (error) {
      return {
        success: false,
        message: "Task type could not be deleted. Please try after some time."
      }
    }
  }

  @Post('/add-taskType')
  @UseBefore(AuthMiddleware)
  async addTaskType(@Body() body: any) {

    const newtaskType = new taskType(body);
    const result = await newtaskType.save();

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

  @Post('/edit-taskType')
  @UseBefore(AuthMiddleware)
  async editTask( @Body() body: any ) {
    const payload = {
      ...body
    }
    delete body.id

    const result = await taskType.findOneAndUpdate({ "taskTypeId": body.taskDetails.taskTypeId }, {
      attributes: body.taskDetails.attributes,
    });

    if(!result) 
      return {
        success: false,
        message: "Task type could not be updated. Please try after some time."
      }
 
    return {
      success: true,
      message: "Task type is updated."
    };
   }


}