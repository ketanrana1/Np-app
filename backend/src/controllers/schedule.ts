import { Controller, Param, Body, Get, Post, Put, Delete, UseBefore } from 'routing-controllers';
import schedule from 'models/schedule';
import AuthMiddleware from 'middlewares/AuthMiddleware';

// UPDATE 
// DELETE
// LOOKUP DATA
@Controller('/api')
export class ScheduleController {
 

  @Get('/get-schedule')
  @UseBefore(AuthMiddleware)
  async getSchedule() {
    return await schedule.aggregate([
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

  @Get('/get-schedule/:id')
  @UseBefore(AuthMiddleware)
  async getScheduleById(@Param('id') id: string) {
    return await schedule.aggregate([
      {
        '$match': {
          'scheduleId': id
        }
      },
    ]);
  }



  @Post('/update-schedule')
  @UseBefore(AuthMiddleware)
  async updateScheduleById(@Body() body: any) {
    const { scheduleTypeId } = body;
    const updateItems = { ...body }
    delete updateItems.scheduleTypeId;
    try {
      await schedule.findOneAndUpdate({ scheduleTypeId }, { ...updateItems })
      return {
        success: true,
        message: "Schedule updated successfully"
      }
    } catch (error) {
      return {
        success: false,
        message: "Schedule could not be updated. Please try after some time."
      }
    }
  }

  @Post('/delete-schedule')
  @UseBefore(AuthMiddleware)
  async deleteScheduleById(@Body() body: any) {
    const { scheduleId } = body;
    try {
      await schedule.findOneAndDelete({ scheduleId })
      return {
        success: true,
        message: "Schedule deleted successfully"
      }
    } catch (error) {
      return {
        success: false,
        message: "Schedule could not be deleted. Please try after some time."
      }
    }
  }

 

  @Post('/add-schedule')
  @UseBefore(AuthMiddleware)
  async addSchedule(@Body() body: any) {
    const newSchedule = new schedule(body);
    const result = await newSchedule.save();

    if (!result)
      return {
        success: false,
        message: "Schedule could not be added. Please try after some time."
      }

    return {
      success: true,
      message: "Schedule is added."
    };
  }

  @Post('/edit-schedule')
  @UseBefore(AuthMiddleware)
  async editTask( @Body() body: any ) {
    const payload = {
      ...body
    }
    delete body.id

    const result = await schedule.findOneAndUpdate({ "scheduleId": body.scheduleDetails.scheduleId }, {
      description: body.scheduleDetails.description,
      flows: body.scheduleDetails.flows,
      cronPattern: body.scheduleDetails.cronPattern,
      activeFlag: body.scheduleDetails.activeFlag,
      success_Email: body.scheduleDetails.success_Email,
      error_Email: body.scheduleDetails.error_Email,

    });

    if(!result) 
      return {
        success: false,
        message: "Schedule could not be updated. Please try after some time."
      }
 
    return {
      success: true,
      message: "Schedule is updated."
    };
   }

}