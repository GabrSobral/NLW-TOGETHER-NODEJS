import { getCustomRepository } from 'typeorm'
import bcrypt from 'bcryptjs'
import { UserRepository } from "../repositories/UserRepository"

interface UserRequest{
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({name, email, password, admin = false}: UserRequest){
    const userRepository = getCustomRepository(UserRepository)

    if(!email){
      throw new Error("Email invalid")
    }
    const userAlreadyExists = await userRepository.findOne({email })

    if(userAlreadyExists) {
      throw new Error("User already exists")
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = userRepository.create({
      name, 
      email, 
      admin,
      password: passwordHash
    })

    await userRepository.save(user)

    return user
  }
}
export { CreateUserService }