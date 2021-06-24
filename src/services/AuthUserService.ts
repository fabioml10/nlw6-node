import { getCustomRepository } from "typeorm"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthReq {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: IAuthReq) {

    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({
      email
    })

    if (!user) {
      throw new Error("Email or Password is incorrect.")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error("Email or Password is incorrect.")
    }

    const token = sign(
      { email: user.email },
      "dd5daef1fbff759dd119d0ebf2438ae6",
      { subject: user.id, expiresIn: "1d" }
    )

    return token
  }
}

export { AuthUserService }
