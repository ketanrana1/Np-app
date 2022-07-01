
import { NextFunction, Response, Request } from 'express';
import jwt_decode from "jwt-decode";

async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {

  const session = request.headers.authorization;
  try {
    //@ts-ignore
   jwt_decode(session)
   next();

  } catch (error) {
    response.status(404).json({ message: "UNAUTHORIZED"})
    console.log("ERROR", error)
  }

}

export default AuthMiddleware;



