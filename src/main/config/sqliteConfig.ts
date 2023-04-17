import { DataSource } from "typeorm";

export const connectionDB: DataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  synchronize: true,
  logging: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
