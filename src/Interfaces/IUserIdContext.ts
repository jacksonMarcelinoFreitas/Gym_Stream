export interface IUserIdContext {
  userId: string | null;
  setUserId: (value: string) => void;
  // handleResetUserId: () => Promise<void>;
}

