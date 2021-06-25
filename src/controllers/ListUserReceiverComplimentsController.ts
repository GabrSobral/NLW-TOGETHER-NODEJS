import { Request, Response } from "express";
import { ListUserReceivedComplimentsService } from "../services/ListUserReceivedComplimentsService.ts";

class ListUserReceivedComplimentsController {
  async handle(request: Request, response: Response) {
    const listUserReceivedComplimentsService = new ListUserReceivedComplimentsService()

    const compliments = await listUserReceivedComplimentsService.execute(request.user_id)

    return response.json(compliments)
  }
}

export { ListUserReceivedComplimentsController }