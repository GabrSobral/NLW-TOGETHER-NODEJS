import { NextFunction, Request, Response } from "express"

export function ErrorCatch(err: Error, request: Request, response: Response, next: NextFunction){
  if(err instanceof Error) {
    return response.status(400).send({ error: err.message })
  }
  const { message } = err
  return response.status(500).send({ message: `Internal Server Error: ${message}` })
}