import type { Request, Response } from "express";
export declare function createOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getOrders(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getMyOrders(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getOrderById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=orderController.d.ts.map