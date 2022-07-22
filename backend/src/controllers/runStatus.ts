import { Controller, Param, Body, Get, Post, Put, Delete, UseBefore } from 'routing-controllers';
import AuthMiddleware from 'middlewares/AuthMiddleware';
import RunStatus from 'models/runStatus';

// UPDATE 
// DELETE
// LOOKUP DATA
@Controller('/api')
export class RunStatusController {

  @Post('/add-run-status')
  @UseBefore(AuthMiddleware)
  async addRunStatus(@Body() body: any) {
    console.log("BODY", body)
      const newRunStatus = new RunStatus(body.bodyData);
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


}
