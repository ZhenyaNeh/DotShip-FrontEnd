export interface RatingProgression {
  classic: {
    createdAt: Date;
    newRating: number;
  }[];
  battleRoyal: {
    createdAt: Date;
    newRating: number;
  }[];
}
