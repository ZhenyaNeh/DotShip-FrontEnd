export interface AdminDashboardStats {
  users: {
    total: number;
    newLast24h: number;
  };
  currentActivity: {
    classicActiveRooms: number;
    battleRoyalActiveRooms: number;
  };
  globalHistory: {
    classicFinishedTotal: number;
    battleRoyalFinishedTotal: number;
  };
  popularity: {
    name: string;
    totalStarts: number;
  }[];
}
