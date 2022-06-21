import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
// import scheduleType from 'models/schedule';
import schedule from 'models/schedule';

// UPDATE 
// DELETE
// LOOKUP DATA
@Controller('/api')
export class ScheduleController {


  @Get('/get-schedule')
  async getSchedule() {
    return await schedule.aggregate([
      {
        '$lookup': {
          'from': 'scheduletypes',
          'localField': 'scheduleTypeId',
          'foreignField': 'scheduleTypeId',
          'as': 'scheduleType'
        }
      }, {
        '$project': {
          '_id': 0,
          'name': 1,
          'description': 1,
          'scheduleName': {
            '$first': '$scheduleType.name'
          },
          'scheduleId': 1
        }
      }
    ]);
  }

  @Get('/get-schedule/:id')
  async getScheduleById(@Param('id') id: string) {
    return await schedule.aggregate([
      {
        '$match': {
          'scheduleTypeId': id
        }
      },
    ]);
  }



  @Post('/update-schedule')
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
  async addSchedule(@Body() body: any) {


    // if(findScheduleType[0].attributes.length !== ScheduleTypeAttributes.length) {
    //   return {
    //     success: false,
    //     message: "Contection Type Attributes length should match Schedule Attributes length"
    //   }
    // }

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
}