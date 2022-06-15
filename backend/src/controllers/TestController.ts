import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';


@Controller('/api')
export class TestController {
 
  @Get('/test')
  async getAllContacts() {
     return { 
         message: 'TESTTTTTTTTTTTTT'
     };
   }

}