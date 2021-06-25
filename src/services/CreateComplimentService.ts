import { getCustomRepository } from "typeorm"
import { ComplimentRepository } from "../repositories/ComplimentsRepository"
import { UserRepository } from "../repositories/UserRepository"

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string
}

class CreateComplimentService {
  async execute({
    message,
    tag_id,
    user_receiver,
    user_sender,
  }: IComplimentRequest){
    const complimentsRepository = getCustomRepository(ComplimentRepository)
    const userRepository = getCustomRepository(UserRepository)

    if(user_sender === user_receiver){
      throw new Error("User cannot send self compliments")
    }

    const userReceiverExists = await userRepository.findOne(user_receiver)

    if(!userReceiverExists){
      throw new Error("User receiver does not exists")
    }
    
    const compliment = complimentsRepository.create({
      message,
      tag_id,
      user_receiver,
      user_sender,
    })

    await complimentsRepository.save(compliment)

    return compliment
  }
}

export { CreateComplimentService }