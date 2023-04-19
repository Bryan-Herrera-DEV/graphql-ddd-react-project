import { DataSource } from "typeorm";

export const connectionDB: DataSource = new DataSource({
  type: "sqlite",
  database: "db/todolist.sqlite",
  synchronize: true,
  entities: ["src/infrastructure/database/entities/*.ts"],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export const openConnection = async (): Promise<void> => {
  await connectionDB.connect();
};

