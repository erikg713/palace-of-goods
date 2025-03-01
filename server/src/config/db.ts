import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { config } from '../config';
import { User } from '../entities/User';
import { Product } from '../entities/Product';

export class DatabaseService {
  private static instance: DatabaseService;
  private connection: Connection | null = null;

  private constructor() {}  // Enforce singleton pattern

  /**
   * Get database service instance (Singleton pattern)
   */
  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  /**
   * Establish database connection
   */
  public async connect(): Promise<void> {
    if (this.connection) {
      console.log('Database already connected');
      return;
    }

    const connectionOptions: ConnectionOptions = {
      type: 'postgres',
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      entities: [User, Product],
      synchronize: config.NODE_ENV === 'development',
      logging: config.NODE_ENV === 'development',
      extra: {
        ssl: config.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      }
    };

    try {
      this.connection = await createConnection(connectionOptions);
      console.log('Database connection established');
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }

  /**
   * Close database connection
   */
  public async disconnect(): Promise<void> {
    if (!this.connection) {
      console.log('No active database connection to close');
      return;
    }

    await this.connection.close();
    this.connection = null;
    console.log('Database connection closed');
  }

  /**
   * Get active database connection
   */
  public getConnection(): Connection {
    if (!this.connection) {
      throw new Error('Database not connected');
    }
    return this.connection;
  }
}

// Export singleton instance
export const database = DatabaseService.getInstance();
