import { getCustomRepository } from 'typeorm'
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from '../repositories/UsersRepositories'

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepositories)
    const usersRepository = getCustomRepository(UsersRepositories)

    const userReceiverExists = await usersRepository.findOne(user_receiver)

    if (user_sender === user_receiver) {
      throw new Error("Sender and receiver cant be the same.")
    }

    if (!userReceiverExists) {
      throw new Error("User does not exists.")
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    })

    await complimentsRepository.save(compliment)
    return compliment
  }
}

export { CreateComplimentService }
