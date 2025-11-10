export interface ILifePath {
    name: string;
    pathStreak: number;
    totalTimeSpent: number;
}

export interface IPathofMotion extends ILifePath {
    totalDistanceCovered: number;
    longestDistanceCovered: number;
    longestTimeSpent: number;
}

export interface MotionLogData {
    userID: string;
    timestamp: string;
    startDate: Date;
    endDate: Date;
    distanceCovered: number;
    timeSpent: number;
    expGained: number;
}