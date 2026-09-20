export function isAuthenticatedUser(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const user = value;
    return (typeof user.id === "number" &&
        Number.isInteger(user.id) &&
        user.id > 0 &&
        typeof user.name === "string" &&
        typeof user.email === "string" &&
        typeof user.type === "string" &&
        typeof user.cep === "string");
}
//# sourceMappingURL=auth.js.map