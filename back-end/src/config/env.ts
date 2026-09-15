import "dotenv/config";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret || jwtSecret.length < 16) {
  throw new Error(
    "JWT_SECRET não definida ou muito curta. Configure pelo menos 16 caracteres no arquivo .env.",
  );
}

export const env = {
  jwtSecret,
};
