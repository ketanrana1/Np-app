import { Controller, Param, Body, Get, Post, Put, Delete, UseBefore } from 'routing-controllers';
import ConnectionType from 'models/connectionType';
import Connection from 'models/connection';
import AuthMiddleware from 'middlewares/AuthMiddleware';

// UPDATE 
// DELETE
// LOOKUP DATA
@Controller('/api')
export class ConnectionController {

  @Get('/get-connection-type')
  @UseBefore(AuthMiddleware)
  async getConnectionType() {
    return await ConnectionType.aggregate([
      {
        '$project': {
          'name': 1,
          'connectionTypeId': 1,
          'attributes': 1,
          '_id': 0
        }
      }
    ]);
  }

  @Get('/get-connection')
  @UseBefore(AuthMiddleware)
  async getConnection() {
    return await Connection.aggregate([
      {
        '$lookup': {
          'from': 'connectiontypes',
          'localField': 'connectionTypeId',
          'foreignField': 'connectionTypeId',
          'as': 'connectionType'
        }
      }, {
        '$project': {
          '_id': 0,
          'name': 1,
          'description': 1,
          'connectionName': {
            '$first': '$connectionType.name'
          },
          'connectionId': 1
        }
      }
    ]);
  }

  @Get('/get-connection/:id')
  @UseBefore(AuthMiddleware)
  async getConnectionById(@Param('id') id: string) {
    return await Connection.aggregate([
      {
        '$match': {
          'connectionTypeId': id
        }
      },
    ]);
  }

  @Get('/get-connection-type/:id')
  @UseBefore(AuthMiddleware)
  async getConnectionTypeById(@Param('id') id: string) {
    return await ConnectionType.aggregate([
      {
        '$match': {
          'connectionTypeId': id
        }
      },
    ]);
  }

  @Post('/update-connection')
  @UseBefore(AuthMiddleware)
  async updateConnectionById(@Body() body: any) {
    const { connectionTypeId } = body;
    const updateItems = { ...body }
    delete updateItems.connectionTypeId;
    try {
      await Connection.findOneAndUpdate({ connectionTypeId }, { ...updateItems })
      return {
        success: true,
        message: "Connection updated successfully"
      }
    } catch (error) {
      return {
        success: false,
        message: "Connection could not be updated. Please try after some time."
      }
    }
  }

  @Post('/delete-connectionType')
  @UseBefore(AuthMiddleware)
  async deleteConnectionTypeById(@Body() body: any) {
    const { connectionTypeId } = body;
    try {
      await ConnectionType.findOneAndDelete({ connectionTypeId })
      return {
        success: true,
        message: "Connection deleted successfully"
      }
    } catch (error) {
      return {
        success: false,
        message: "Connection could not be deleted. Please try after some time."
      }
    }
  }

  @Post('/delete-connection')
  @UseBefore(AuthMiddleware)
  async deleteConnectionById(@Body() body: any) {
    const { connectionId } = body;
    try {
      await Connection.findOneAndDelete({ connectionId })
      return {
        success: true,
        message: "Connection deleted successfully"
      }
    } catch (error) {
      return {
        success: false,
        message: "Connection could not be deleted. Please try after some time."
      }
    }
  }

  @Post('/add-connection-type')
  @UseBefore(AuthMiddleware)
  async addConnectionType(@Body() body: any) {
    const newConnectionType = new ConnectionType(body);
    const result = await newConnectionType.save();

    if (!result)
      return {
        success: false,
        message: "Connection type could not be added. Please try after some time."
      }

    return {
      success: true,
      message: "Connection type is added."
    };
  }

  @Post('/add-connection')
  @UseBefore(AuthMiddleware)
  async addConnection(@Body() body: any) {
    const { connectionTypeId, connectionTypeAttributes } = body;
    const findConnectionType = await ConnectionType.aggregate([
      {
        '$match': {
          'connectionTypeId': connectionTypeId
        }
      }
    ])
    if (findConnectionType.length === 0) return {
      success: false,
      message: "Connection could not be added as Connection Type does not exist"
    }

    const newConnection = new Connection(body);
    const result = await newConnection.save();

    if (!result)
      return {
        success: false,
        message: "Connection could not be added. Please try after some time."
      }

    return {
      success: true,
      message: "Connection is added."
    };
  }
  @Post('/edit-connection-type')
  @UseBefore(AuthMiddleware)
  async editConnectionType(@Body() body: any) {
    const payload = {
      ...body
    }
    delete body.id

    const result = await ConnectionType.findOneAndUpdate({ 'connectionTypeId': body.connectionType.connectionTypeId }, {
      attributes: body.connectionType.attributes,
    });

    if (!result)
      return {
        success: false,
        message: "Connection type could not be updated. Please try after some time."
      }

    return {
      success: true,
      message: "Connection type is updated."
    };
  }
}
