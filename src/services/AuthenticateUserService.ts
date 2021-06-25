import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repositories/UserRepository"
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

interface IAuthenticatedRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticatedRequest){
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({ email })
    console.log(user)

    if(!user){
      throw new Error("Email/Password incorrect  aaaa")
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
      throw new Error("Email/Password incorrect bbb")
    }

    const token = JWT.sign({email: user.email}, "senha", { 
      expiresIn: '1d',
      subject: user.id,
    })

    return token

  }
}

export { AuthenticateUserService }