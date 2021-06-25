import { getCustomRepository } from "typeorm"
import { ComplimentRepository } from "./ComplimentsRepository"

class ListUserSenderComplimentsService {
  async execute(user_id: string){
    const complimentsRepository = getCustomRepository(ComplimentRepository) 

    const compliments = await complimentsRepository.find({
      where: {
        userSender: user_id
      }
    })

    return compliments
  }
}

export { ListUserSenderComplimentsService }