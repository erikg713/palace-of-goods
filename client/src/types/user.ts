export interface User {
  id: number; // Unique identifier
  username: string;
  email: string;
  profilePic?: string; // Follow camelCase convention for consistency
  isAdmin: boolean;
  createdAt?: string; // Optional timestamp for account creation
  updatedAt?: string; // Optional timestamp for last update
}
