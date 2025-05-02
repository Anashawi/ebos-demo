import { hash, compare } from "bcryptjs";
import { dbConnect } from "./db.service";
import { IUser, User } from "../models/user";

const USERS_COLLECTION = "users";

export async function createUser(user: IUser) {
  try {
    await dbConnect();

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPassword = await hash(user.password, 12);

    const newUser = new User({
      email: user.email,
      password: hashedPassword,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      provider: "credentials",
      role: user?.role || "client",
      activeStatus: user?.activeStatus || false,
    } as IUser);

    await newUser.save();
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function login(credentials: { email: string; password: string }) {
  try {
    await dbConnect();
    const result = await User.findOne({ email: credentials.email });

    if (!result) {
      throw new Error("invalid email");
    }

    const isValid = await compare(credentials.password, result.password);
    if (!isValid) {
      return new Error("invalid password");
    }
    const user = result?.toJSON();
    return {
      email: user.email,
      role: user.role,
      id: user.id,
      fullName: user.fullName,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function checkPassword(credentials: {
  email: string;
  password: string;
}) {
  try {
    await dbConnect();
    const result = await User.findOne({ email: credentials.email });

    const isValid = await compare(credentials.password, result.password);
    if (!isValid) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function ChangePassword(credentials: {
  email: string;
  password: string;
}) {
  try {
    await dbConnect();
    const result = await User.findOne({ email: credentials.email });

    if (!result) {
      throw new Error("invalid email");
    }

    const isValid = await compare(credentials.password, result.password);
    if (!isValid) {
      return new Error("invalid password");
    }
    const user = result?.toJSON();
    return {
      email: user.email,
      role: user.role,
      id: user.id,
      fullName: user.fullName,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function updatePassword({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) {
  try {
    await dbConnect();
    const hashedPassword = await hash(newPassword, 12);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    console.error(error);
    //@ts-ignore
    throw new Error(error.message);
  }
}
