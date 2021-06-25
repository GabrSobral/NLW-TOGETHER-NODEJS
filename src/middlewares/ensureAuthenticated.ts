import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { secret } from "../config/jwtSecret";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    return response.status(401).send({ error: "No token provided" })
  }

  const tokenParts = authHeader.split(' ')

  if(tokenParts.length !== 2) {
    throw new Error("Token error")
  }

  const [ scheme, token ] = tokenParts

  if(!/^Bearer$/i.test(scheme)){
    throw new Error("Token malformatted")
  }

  verify(token, secret, (err, decode) => {
    if(err){
      throw new Error(err.message)
    }
    request.user_id = decode.sub
  })

  return next()
}