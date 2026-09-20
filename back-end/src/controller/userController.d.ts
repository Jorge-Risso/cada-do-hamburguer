import type { Request, Response } from "express";
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const logout: (req: Request, res: Response) => void;
export declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const auth: (req: Request, res: Response) => Promise<void>;
export declare const pedidos: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=userController.d.ts.map