import UserModel from "../entities/User";

interface ICreateUser {
  email: string;
  otp: string;
  active:boolean;
}

interface IGetOneUser {
  _id: string
}

interface IUpdateUser {
  _id: string;
  email: string;
  otp: string;
  active:boolean;
}

interface IDeleteUser {
  _id: string;
}

export class UserRepository {
  async create(data: ICreateUser) {
    try {
      return await new UserModel(data).save();
    } catch (err) {
      throw err;
    }
  }

  async getAll() {
    try {
      return await UserModel.find({});
    } catch (err) {
      throw err;
    }
  }

  async getOne({ _id }: IGetOneUser) {
    try {
      return await UserModel.findOne({_id});
    } catch (err) {
      throw err;
    }
  }

  async delete({_id}: IDeleteUser) {
    try {
      return await UserModel.findOneAndDelete({_id});
    } catch (err) {
      throw err;
    }
  }

  async update(data: IUpdateUser) {
    try {
      return await UserModel.findOneAndUpdate({
        _id: data._id,
      }, {
        $set: data
      }, {
        new: true,
      })
    } catch (err) {
      throw err;
    }
  }
}
