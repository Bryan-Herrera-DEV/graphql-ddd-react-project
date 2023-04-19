import { ILogger } from "./ILogger";

abstract class BaseLogger {
  private static colorReset = "\x1b[0m";
  private static colorRed = "\x1b[31m";
  private static colorGreen = "\x1b[32m";
  private static colorYellow = "\x1b[33m";
  private static colorBlue = "\x1b[34m";

  protected static getConstructTypeMeesage(
    type: "red" | "green" | "yellow" | "blue",
    value: string
  ): string {
    switch (type) {
      case "red":
        return `\n[${BaseLogger.colorRed}${value}${BaseLogger.colorReset}]`;
      case "green":
        return `\n[${BaseLogger.colorGreen}${value}${BaseLogger.colorReset}]`;
      case "yellow":
        return `\n[${BaseLogger.colorYellow}${value}${BaseLogger.colorReset}]`;
      case "blue":
        return `\n[${BaseLogger.colorBlue}${value}${BaseLogger.colorReset}]`;
      default:
        return `\n[${BaseLogger.colorBlue}${value}${BaseLogger.colorReset}]`;
    }
  }
}

class Logger extends BaseLogger implements ILogger {
  public log(message: string): void {
    console.log(`${Logger.getConstructTypeMeesage("blue", "LOG")} ${message}`);
  }

  public info(message: string): void {
    console.log(
      `${Logger.getConstructTypeMeesage("green", "INFO")} ${message}`
    );
  }

  public warn(message: string): void {
    console.log(
      `${Logger.getConstructTypeMeesage("yellow", "WARN")} ${message}`
    );
  }

  public error(message: string): void {
    console.log(`${Logger.getConstructTypeMeesage("red", "ERROR")} ${message}`);
  }
}

export default new Logger();
