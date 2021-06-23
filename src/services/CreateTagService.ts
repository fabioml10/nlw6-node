import { getCustomRepository } from 'typeorm'
import { TagsRepositories } from "../repositories/TagsRepositories"

interface ITagRequest {
  name: string;
}

class CreateTagService {
  async execute({ name }: ITagRequest) {
    const tagsRepository = getCustomRepository(TagsRepositories)
    const tagExists = await tagsRepository.findOne({ name })

    if (!name) {
      throw new Error("Tag name cant be blank.")
    }

    if (tagExists) {
      throw new Error("Tag already exists.")
    }

    const tag = tagsRepository.create({
      name
    })

    await tagsRepository.save(tag)
    return tag
  }
}

export { CreateTagService }
