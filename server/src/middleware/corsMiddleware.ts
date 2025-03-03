import cors from 'cors';

export const corsMiddleware = cors({
  origin: 'http://yourdomain.com',
  optionsSuccessStatus: 200,
});
