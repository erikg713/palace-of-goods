import 'reflect-metadata';
import { DataSource, DataSourceOptions, EntityManager } from 'typeorm';
import { env } from '../config/env';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import logger from '../utils/logger';

export class DatabaseConfig {
  private static instance: DatabaseConfig;
  private dataSource: DataSource;

  // Database entities/models
  private entities = [
    User,
    Product,
    Order
  ];

  private constructor() {
    const isProduction = env.NODE_ENV === 'production';
    
    const baseConfig: DataSourceOptions = {
      type: 'postgres',
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      synchronize: !isProduction, // Disable in production!
      logging: env.DB_LOGGING,
      entities: this.entities,
      migrations: ['dist/migrations/*.js'],
      subscribers: [],
      poolSize: parseInt(env.DB_POOL_SIZE || '10', 10),
      extra: {
        ssl: isProduction ? { rejectUnauthorized: false } : false
      }
    };

    this.dataSource = new DataSource(baseConfig);
  }

  public static getInstance(): DatabaseConfig {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new DatabaseConfig();
    }
    return DatabaseConfig.instance;
  }

  public async initialize(): Promise<void> {
    try {
      await this.dataSource.initialize();
      logger.info('Database connection established');
      
      // Run migrations in production
      if (env.NODE_ENV === 'production') {
        await this.dataSource.runMigrations();
        logger.info('Database migrations executed');
      }
    } catch (error) {
      logger.error('Failed to connect to database:', error);
      process.exit(1);
    }
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }

  public async close(): Promise<void> {
    await this.dataSource.destroy();
    logger.info('Database connection closed');
  }

  // Example transaction wrapper
  public async transaction<T>(
    operation: (entityManager: EntityManager) => Promise<T>
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await operation(queryRunner.manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      logger.error('Transaction failed:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

// Singleton instance export
export const database = DatabaseConfig.getInstance();


import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
