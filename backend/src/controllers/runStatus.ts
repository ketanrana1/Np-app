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
    const newBody = {
      ...body,
      "isLogDeleted": false,

    }
    const newTaskStatus = new TaskStatus(newBody);
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

  @Get('/get-task-statuses')
  @UseBefore(AuthMiddleware)
  async getTaskStatuses() {
    return await TaskStatus.aggregate([
      {
          '$project': {
          '_id': 0,
          'taskStatusId': 1,
          'startTime': 1,
          'endTime': 1,
          'ranAt': 1,
          'flowName': 1,
          'status': 1,
          'flowId': 1,
          'actions': 1,
          'taskLog': 1,
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
          'taskStatusId': id
        }
      }
    ]);
  }

  @Get('/get-task-status-log-details/:id')
  async getTaskStatuseLogDetails(@Param('id') id: string) {
    const result =  await TaskStatus.aggregate([
      {
        '$match': {
          'taskStatusId': id,
          'isLogDeleted': false,
        }
      }
    ]);

    if (result.length === 0)
      return {
        success: false,
        message: "No Logs Found"
      }

    return result
  }


  @Post('/edit-task-log-status/:id')
  async editTaskLogStatus(@Param('id') id: string) {

    const result = await TaskStatus.findOneAndUpdate({ 'taskStatusId': id }, {
      isLogDeleted: true,
    });

    if (!result)
      return {
        success: false,
        message: "Log status could not be updated. Please try after some time."
      }

    return {
      success: true,
      message: "Log Status is updated."
    };
  }





  @Get('/get-single-action-details/:name/:id')
  @UseBefore(AuthMiddleware)
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

  @Get('/get-single-action-log-details/:name/:id')
  async getSingleActionLogDetails(@Param('name') name: string, @Param('id') id: string) {
    const result = await TaskStatus.aggregate([
      {
        '$unwind': {
          'path': '$actions'
        }
      }, {
        '$match': {
          'actions.actionName': name,
          'taskStatusId': id,
          'actions.isLogDeleted': false 
        }
      }, {
        '$project': {
          'actions': 1,
          '_id': 0
        }
      }
    ]);

    if (result.length === 0)
      return {
        success: false,
        message: "No Logs Found"
      }

    return result

  }

  @Post('/edit-action-log-status/:id/:name')
  async editActionLogStatus(@Param('id') id: string, @Param('name') name: string) {

    const taskStatusDetails: any = await TaskStatus.aggregate([
      {
        '$match': {
          'taskStatusId': id
        }
      } 
    ]);

    const allActions = taskStatusDetails[0].actions

    const newAllActions = allActions.map((item: any, index: any) => {

      if(item.actionName == name) {  
        item.isLogDeleted = true  
      }
      return item 
    })

    taskStatusDetails.actions = newAllActions

    console.log("New Details", taskStatusDetails)

    const result = await TaskStatus.findOneAndUpdate({ 'taskStatusId': id }, { 'actions': newAllActions })

        if (!result)
          return {
            success: false,
            message: "Log status could not be updated. Please try after some time."
          }

        return {
          success: true,
          message: "Log Status is updated."
       };
  }

    



}
