import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (!user || user.role !== 'admin') {
    return res.status(403).json({
      message: 'Akses ditolak! Endpoint ini hanya dapat diakses oleh Admin.',
    });
  }

  next();
};

// Generic version kalau nanti butuh role lain selain admin/customers
export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({
        message: `Akses ditolak! Endpoint ini hanya untuk role: ${roles.join(', ')}`,
      });
    }

    next();
  };
};