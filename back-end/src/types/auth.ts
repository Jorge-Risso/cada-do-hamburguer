export type AuthenticatedUser = {
  id: number;
  name: string;
  email: string;
  type: string;
  cep: string;
};

export function isAuthenticatedUser(
  value: unknown,
): value is AuthenticatedUser {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const user = value as Record<string, unknown>;

  return (
    typeof user.id === "number" &&
    Number.isInteger(user.id) &&
    user.id > 0 &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    typeof user.type === "string" &&
    typeof user.cep === "string"
  );
}
