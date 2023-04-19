import * as bcrypt from "bcryptjs";
import { IHashProvider } from "./IHashProvider";

export class BcryptProvider implements IHashProvider {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string | undefined): Promise<boolean> {
    if (!hash) {
      return false;
    }
    return await bcrypt.compare(password, hash);
  }
}