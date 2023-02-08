export interface DataTypes {
  id: number;
  title: string;
  thumbnail: {
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

export interface LogIn {
  email: string;
  setEmail: (e: string) => void;
  error: string;
  password: string;
  setPassword: (p: string) => void;
  setIsLogin: (n: boolean) => void;
  handleeSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  user: {
    avatar: string;
    email: string;
    iat: number;
    id: string;
  };
}
