import { getCustomRepository } from "typeorm"
import { TagRepository } from "../repositories/TagRepository"

class CreateTagService {
  async execute(name: string){
    const tagRepository = getCustomRepository(TagRepository)

    if(!name){
      throw new Error("No name provided")
    }
    const tagAlreadyExist = await tagRepository.findOne({ name })

    if(tagAlreadyExist) {
      throw new Error("Tag already exist")
    }

    const tag = tagRepository.create({ name })

    await tagRepository.save(tag)

    return tag
  }
}

export { CreateTagService }