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
  setIsLogin: (n: boolean) => void;
}