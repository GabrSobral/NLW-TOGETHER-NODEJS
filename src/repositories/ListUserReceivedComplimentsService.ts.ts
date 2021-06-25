import { getCustomRepository } from "typeorm"
import { ComplimentRepository } from "./ComplimentsRepository"

class ListUserReceivedComplimentsService {
  async execute(user_id: string){
    const complimentsRepository = getCustomRepository(ComplimentRepository) 

    const compliments = await complimentsRepository.find({
      where: {
        user_receiver: user_id
      }
    })

    return compliments
  }
}

export { ListUserReceivedComplimentsService }