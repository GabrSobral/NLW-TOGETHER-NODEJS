import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repositories/UserRepository"
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import { secret } from "../config/jwtSecret"

interface IAuthenticatedRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticatedRequest){
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({ email })

    if(!user){
      throw new Error("Email/Password incorrect  aaaa")
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
      throw new Error("Email/Password incorrect bbb")
    }

    const token = JWT.sign({email: user.email}, secret, { 
      expiresIn: '1d',
      subject: user.id,
    })

    return token

  }
}

export { AuthenticateUserService }