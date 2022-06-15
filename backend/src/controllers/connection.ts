import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import ConnectionType from 'models/connectionType';
import Connection from 'models/connection';
 
@Controller('/api')
export class ConnectionController {
 
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