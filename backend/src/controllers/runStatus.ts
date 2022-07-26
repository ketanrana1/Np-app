import { Controller, Param, Body, Get, Post, Put, Delete, UseBefore } from 'routing-controllers';
import AuthMiddleware from 'middlewares/AuthMiddleware';
import RunStatus from 'models/runStatus';
import TaskStatus from 'models/taskStatus'
import Log from 'models/log';

// UPDATE 
// DELETE
// LOOKUP DATA
@Controller('/api')
export class RunStatusController {

  @Post('/add-run-status')
  @UseBefore(AuthMiddleware)
  async addRunStatus(@Body() body: any) {
    console.log("BODY", body)
      const newRunStatus = new RunStatus(body);
      const result = await newRunStatus.save();
  
      if (!result)
        return {
          success: false,
          message: "Run Status could not be added. Please try after some time."
        }
   
      return {
        success: true,
        message: "Run Status is added."
      };
  }

  @Get('/get-run-statuses')
  @UseBefore(AuthMiddleware)
  async getAllStatuses() {
    return await RunStatus.aggregate([
      {
        '$project': {
          'id': "$runStatusId",
          'status': 1,
          'name': 1,
          'flowName': 1,
          'startTime': 1,
          'endTime': 1,
          'ranAt': 1,
          '_id': 0
        }
      }
    ]);
  }

  @Post('/add-log')
  @UseBefore(AuthMiddleware)
  async addLog(@Body() body: any) {
    console.log("BODY", body)
      const newLog = new Log(body);
      const result = await newLog.save();
  
      if (!result)
        return {
          success: false,
          message: "Log could not be added. Please try after some time."
        }
   
      return {
        success: true,
        message: "Log is added."
      };
  }

  @Get('/get-logs')
  @UseBefore(AuthMiddleware)
  async getLogs() {
    return await Log.aggregate([
      {
        '$project': {
          'logDate': 1,
          'description': 1,
        }
      }
    ]);
  }


  @Post('/add-task-status')
  @UseBefore(AuthMiddleware)
  async addTaskStatus(@Body() body: any) {
    console.log("BODY", body)
      const newTaskStatus = new TaskStatus(body);
      const result = await newTaskStatus.save();
  
      if (!result)
        return {
          success: false,
          message: "Task Status could not be added. Please try after some time."
        }
   
      return {
        success: true,
        message: "Task Status is added."
      };
  }


  @Post('/update-run-status')
  @UseBefore(AuthMiddleware)
  async updateRunStatusById(@Body() body: any) {
    const { runStatusId } = body;
    const updateItems = { ...body }
    delete updateItems.runStatusId;
    try {
      await RunStatus.findOneAndUpdate({ runStatusId }, { ...updateItems })
      return {
        success: true,
        message: "Run Status updated successfully"
      }
    } catch (error) {
      return { 
        success: false,
        message: "Run Status could not be updated. Please try after some time."
      }
    }
  }


}
