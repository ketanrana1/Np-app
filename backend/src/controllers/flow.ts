import { Controller, Param, Body, Get, Post, Put, Delete, UseBefore } from 'routing-controllers';
import flow from 'models/flow';
import AuthMiddleware from 'middlewares/AuthMiddleware';

// UPDATE  
// DELETE
// LOOKUP DATA
@Controller('/api')
export class FlowController {

  @Get('/get-flow')
  @UseBefore(AuthMiddleware)
  async getflow() {
    return await flow.aggregate([
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

  @Get('/get-flow/:id')
  @UseBefore(AuthMiddleware)
  async getFlowById(@Param('id') id: string) {
    return await flow.aggregate([
      {
        '$match': {
          'flowId': id
        }
      },
    ]);
  }

  @Post('/update-flow')
  @UseBefore(AuthMiddleware)
  async updateflowById(@Body() body: any) {
    const { flowTypeId } = body;
    const updateItems = { ...body }
    delete updateItems.flowTypeId;
    try {
      await flow.findOneAndUpdate({ flowTypeId }, { ...updateItems })
      return {
        success: true,
        message: "Flow updated successfully"
      }
    } catch (error) {
      return { 
        success: false,
        message: "Flow could not be updated. Please try after some time."
      }
    }
  }

  @Post('/delete-flow')
  @UseBefore(AuthMiddleware)
  async deleteFlowById(@Body() body: any) {
    const { flowId } = body;
    try {
      await flow.findOneAndDelete({ flowId })
      return {
        success: true,
        message: "Flow deleted successfully"
      }
    } catch (error) {
      return {
        success: false,
        message: "Flow could not be deleted. Please try after some time."
      }
    }
  }

  @Post('/add-flow')
  @UseBefore(AuthMiddleware)
  async addflow(@Body() body: any) {

    const newFlow = new flow(body);
    const result = await newFlow.save();

    if (!result)
      return {
        success: false,
        message: "Flow could not be added. Please try after some time."
      }

    return {
      success: true,
      message: "Flow is added."
    };
  }

  @Post('/edit-flow')
  @UseBefore(AuthMiddleware)
  async editTask( @Body() body: any ) {
    const payload = {
      ...body
    }
    delete body.id

    const result = await flow.findOneAndUpdate({ "flowId": body.flowDetails.flowId }, {
      description: body.flowDetails.description,
      tasks: body.flowDetails.tasks,
      variableSel: body.flowDetails.variableSel,
    });

    if(!result) 
      return {
        success: false,
        message: "Flow could not be updated. Please try after some time."
      }
 
    return {
      success: true,
      message: "Flow is updated."
    };
   }


}