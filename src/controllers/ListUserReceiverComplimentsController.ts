import { Request, Response } from "express";
import { ListUserReceivedComplimentsService } from "../repositories/ListUserReceivedComplimentsService.ts";
import { ListUserSenderComplimentsService } from "../repositories/ListUserSendComplimentsService";


class ListUserReceivedComplimentsController {
  async handle(request: Request, response: Response) {
    const listUserReceivedComplimentsService = new ListUserReceivedComplimentsService()

    const compliments = await listUserReceivedComplimentsService.execute(request.user_id)

    return response.json(compliments)
  }
}

export { ListUserReceivedComplimentsController }