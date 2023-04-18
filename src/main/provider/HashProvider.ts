import * as bcrypt from "bcryptjs";
import { IHashProvider } from "./IHashProvider";

export class BcryptProvider implements IHashProvider {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}