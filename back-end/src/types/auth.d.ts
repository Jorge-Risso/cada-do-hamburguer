export type AuthenticatedUser = {
    id: number;
    name: string;
    email: string;
    type: string;
    cep: string;
};
export declare function isAuthenticatedUser(value: unknown): value is AuthenticatedUser;
//# sourceMappingURL=auth.d.ts.map