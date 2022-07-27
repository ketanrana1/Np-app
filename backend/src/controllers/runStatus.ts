import { Controller, Param, Body, Get, Post, Put, Delete, UseBefore } from 'routing-controllers';
import AuthMiddleware from 'middlewares/AuthMiddleware';
import RunStatus from 'models/runStatus';
import TaskStatus from 'models/taskStatus'
import Log from 'models/log';
import flow from 'models/flow';

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

  @Get('/get-floww/:id')
  @UseBefore(AuthMiddleware)
  async getFlowByIds(@Param('id') id: string) {
    return await flow.aggregate([
      {
        '$match': {
          'flowId': id
        }
      },
    ]);
  }

  @Get('/get-task-statuses')
  @UseBefore(AuthMiddleware)
  async getTaskStatuses() {
    return await TaskStatus.aggregate([
      {
        '$project': {
          'id': "$taskStatusId",
          'startTime': 1,
          'endTime': 1,
          'ranAt': 1,
          'flowName': 1,
          'status': 1,
          'flowId': 1,
          'actions': 1,
          'taskName': 1,
          'logDescription': '$taskLog',
          'logDate':"$ranAt",
          '_id': 0,
        }
      }
    ]); 
  }

  @Get('/get-task-status-details/:id')
  @UseBefore(AuthMiddleware)
  async getTaskStatuseLog(@Param('id') id: string) {

    return await TaskStatus.aggregate([
      {
        '$match': {
          'taskStatusId': id,
        }
      },
      {
        '$project': {
          'id': "$taskStatusId",
          'startTime': 1,
          'endTime': 1,
          'ranAt': 1,
          'flowName': 1,
          'status': 1,
          'flowId': 1,
          'actions': 1,
          'logDescription': '$taskLog',
          'logDate':"$ranAt",
          'taskName': 1,
          '_id': 0,
        }
      }
    ]);
  }


  @Get('/get-single-action-details/:name/:id')
  async getSingleActionDetails(@Param('name') name: string, @Param('id') id: string) {

    return await TaskStatus.aggregate([
      {
        '$unwind': {
          'path': '$actions'
        }
      }, {
        '$match': {
          'actions.actionName': name,
          'taskStatusId': id
          
          
        }
      }, {
        '$project': {
          'actions': 1
        }
      }
    ]);
  }



  // @Post('/update-run-status')
  // @UseBefore(AuthMiddleware)
  // async updateRunStatusById(@Body() body: any) {
  //   const { runStatusId } = body;
  //   const updateItems = { ...body }
  //   delete updateItems.runStatusId;
  //   try {
  //     await RunStatus.findOneAndUpdate({ runStatusId }, { ...updateItems })
  //     return {
  //       success: true,
  //       message: "Run Status updated successfully"
  //     }
  //   } catch (error) {
  //     return { 
  //       success: false,
  //       message: "Run Status could not be updated. Please try after some time."
  //     }
  //   }
  // }


}
