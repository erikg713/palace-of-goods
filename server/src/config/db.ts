import 'reflect-metadata';
import { DataSource, DataSourceOptions, EntityManager } from 'typeorm';
import mongoose from "mongoose";
import { Pool } from "pg";
import { env } from "../config/dotenv";
import logger from "../utils/logger";

// Choose between MongoDB or PostgreSQL
const USE_MONGODB = env.MONGODB_URI !== undefined;
const USE_POSTGRES = env.DATABASE_URL !== undefined;

// ✅ MongoDB Connection
const connectMongoDB = async (): Promise<void> => {
  if (!USE_MONGODB) return;

  try {
    await mongoose.connect(env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Fast fail on bad connection
    } as mongoose.ConnectOptions);
    
    logger.info("✅ Connected to MongoDB Database");
  } catch (error) {
    logger.error("❌ MongoDB Connection Failed. Retrying in 5s...", error);
    setTimeout(connectMongoDB, 5000);
  }
};

// ✅ PostgreSQL Connection
const pool = USE_POSTGRES
  ? new Pool({
      connectionString: env.DATABASE_URL,
      ssl: env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    })
  : null;

// ✅ TypeORM PostgreSQL Configuration
class DatabaseConfig {
  private static instance: DatabaseConfig;
  private dataSource: DataSource;

  private constructor() {
    if (!USE_POSTGRES) return;

    const baseConfig: DataSourceOptions = {
      type: 'postgres',
      url: env.DATABASE_URL,
      synchronize: env.NODE_ENV !== 'production', // Disable in production!
      logging: env.DB_LOGGING === "true",
      entities: ["src/models/**/*.ts"],
      migrations: ["dist/migrations/*.js"],
      subscribers: [],
      poolSize: parseInt(env.DB_POOL_SIZE || '10', 10),
      extra: {
        ssl: env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
      },
    };

    this.dataSource = new DataSource(baseConfig);
  }

  public static getInstance(): DatabaseConfig {
    if (!DatabaseConfig.instance && USE_POSTGRES) {
      DatabaseConfig.instance = new DatabaseConfig();
    }
    return DatabaseConfig.instance!;
  }

  public async initialize(): Promise<void> {
    if (!USE_POSTGRES) return;
    try {
      await this.dataSource.initialize();
      logger.info("✅ PostgreSQL connection established");

      if (env.NODE_ENV === "production") {
        await this.dataSource.runMigrations();
        logger.info("✅ PostgreSQL migrations executed");
      }
    } catch (error) {
      logger.error("❌ PostgreSQL connection failed:", error);
      process.exit(1);
    }
  }

  public async close(): Promise<void> {
    if (USE_POSTGRES) {
      await this.dataSource.destroy();
      logger.info("✅ PostgreSQL connection closed");
    }
  }

  public async transaction<T>(operation: (entityManager: EntityManager) => Promise<T>): Promise<T> {
    if (!USE_POSTGRES) throw new Error("PostgreSQL is not enabled");
    
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await operation(queryRunner.manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      logger.error("❌ Transaction failed:", error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

// ✅ Export Functions Based on Database Choice
export const connectDB = async (): Promise<void> => {
  await connectMongoDB();
  if (USE_POSTGRES) await DatabaseConfig.getInstance().initialize();
};

export const database = USE_POSTGRES ? DatabaseConfig.getInstance() : null;
export const pgPool = pool;
