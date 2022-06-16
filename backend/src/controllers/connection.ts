import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import ConnectionType from 'models/connectionType';
import Connection from 'models/connection';
 
// UPDATE 
// DELETE
// LOOKUP DATA
@Controller('/api')
export class ConnectionController {
 
  @Get('/get-connection-type')
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
    async updateConnectionById( @Body() body: any ) {
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

    @Post('/delete-connection')
    async deleteConnectionById( @Body() body: any ) {
      const { connectionTypeId } = body;
      try {
        await Connection.findOneAndUpdate({ connectionTypeId })
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
  async addConnectionType( @Body() body: any ) {
    const newConnectionType = new ConnectionType(body);
    const result = await newConnectionType.save();

    if(!result) 
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
  async addConnection( @Body() body: any ) {
    const { connectionTypeId, connectionTypeAttributes } = body;
    const findConnectionType = await ConnectionType.aggregate([
      {
        '$match': {
          'connectionTypeId': connectionTypeId
        }
      }
    ])
    if(findConnectionType.length === 0) return {
      success: false,
      message: "Connection could not be added as Connection Type does not exist"
    }

    // if(findConnectionType[0].attributes.length !== connectionTypeAttributes.length) {
    //   return {
    //     success: false,
    //     message: "Contection Type Attributes length should match Connection Attributes length"
    //   }
    // }

    const newConnection = new Connection(body);
    const result = await newConnection.save();

    if(!result) 
      return {
        success: false,
        message: "Connection could not be added. Please try after some time."
      }

    return {
      success: true,
      message: "Connection is added."
    };
   }
}