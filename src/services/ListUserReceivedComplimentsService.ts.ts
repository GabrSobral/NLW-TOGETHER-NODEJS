import { getCustomRepository } from "typeorm"
import { ComplimentRepository } from "../repositories/ComplimentsRepository"

class ListUserReceivedComplimentsService {
  async execute(user_id: string){
    const complimentsRepository = getCustomRepository(ComplimentRepository) 

    const compliments = await complimentsRepository.find({
      where: {
        user_receiver: user_id
      },
      relations: ["userSender", "userReceiver", 'tag']
    })

    return compliments
  }
}

export { ListUserReceivedComplimentsService }