import { UserRepository } from "../repositories/UserRepository";
import { CustomError } from "../../shared/errors/CustomError";
interface IRequest {
  email: string;
  otp: string;
  active:boolean;
}
interface IdRequest {
  id: string;
}

interface UpdateRequest extends IRequest {
  _id: string;
}

export class UserService {
  constructor(
    private UserRepository: UserRepository,
  ) {}

  async create(data: IRequest) {
    try {
      if (!data) throw new CustomError("User not found", 400);

      const user = await this.UserRepository.create(data);

      if (!user) throw new CustomError("Internal server error", 400);

      return user;
    } catch (err) {
      throw err;
    }
  }

  async getAll() {
    try {
      const eventsCalendar = await this.UserRepository.getAll();

      if (!eventsCalendar) {
        return [];
      }

      return eventsCalendar;
    } catch (err) {
      throw err;
    }
  }

  async getById({ id }: IdRequest) {
    try {
      if (!id) throw new CustomError("Id not found", 400);

      const user = await this.UserRepository.getOne({_id: id})

      if (!user) throw new CustomError("User not exist", 400);

      return user;
    } catch (err) {
      throw err;
    }
  }

  async updateById({_id, email, otp, active}: UpdateRequest) {
    const userUpdated: any = {
      _id,
      email,
      otp,
      active
    }

    try {
      if (!_id) throw new CustomError("User not found", 400);

      const userExist = await this.UserRepository.getOne({_id});

      if (!userExist) throw new CustomError("Internal server error", 400);

      for (const index in userUpdated) {
        if (typeof userUpdated[index] === "undefined") {
          delete userUpdated[index];
        }
      }
      
      const user = await this.UserRepository.update(userUpdated);

      return user;
    } catch (err) {
      throw err;
    }
  }

  async delete({ id }: IdRequest) {
    try {
      if (!id) throw new CustomError("Id not found", 400);

      const userExist = await this.UserRepository.getOne({_id: id})

      if (!userExist) throw new CustomError("User not exist", 400);

      const deleteuser = await this.UserRepository.delete({
        _id: userExist._id,
      })

      return deleteuser;
    } catch (err) {
      throw err;
    }
  }
}
