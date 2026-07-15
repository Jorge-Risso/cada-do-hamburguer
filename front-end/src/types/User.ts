export interface UserInterface {
  id: number;
  name: string;
  email: string;
  type: "admin" | "user";
  cep: string;
}

export type UserContextType = {
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
};
