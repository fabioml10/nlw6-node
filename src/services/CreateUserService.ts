import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories)
    const userExists = await usersRepository.findOne({ email })

    if (!email) {
      throw new Error("Email cont be blank.")
    }

    if (userExists) {
      throw new Error("User already exists.")
    }

    const user = usersRepository.create({
      name,
      email,
      admin
    })

    await usersRepository.save(user)
    return user
  }
}

export { CreateUserService }
