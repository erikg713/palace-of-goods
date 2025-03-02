export interface AuthRequest extends Request {
  user?: { id: string };
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    role?: string;
  };
}
