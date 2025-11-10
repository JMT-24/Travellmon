import { ILifePath, IPathofMotion } from "./LifePathInterfaces";
import { MotionLogData } from "./LifePathInterfaces";

class LifePath implements ILifePath {
    name: string;
    pathStreak: number;
    totalTimeSpent: number;

    constructor({name, pathStreak, totalTimeSpent} : ILifePath)
    {
        this.name = name;
        this.pathStreak = pathStreak;
        this.totalTimeSpent = totalTimeSpent;
    }
}

export class PathOfMotion extends LifePath implements IPathofMotion {
    totalDistanceCovered: number;
    longestDistanceCovered: number;
    longestTimeSpent: number;

    constructor(data: IPathofMotion)
    {
        super(data);
        this.totalDistanceCovered = data.totalDistanceCovered;
        this.longestDistanceCovered = data.longestDistanceCovered;
        this.longestTimeSpent = data.longestTimeSpent;
    }
}

export class MotionLogs {
    constructor(public data: MotionLogData) {};
}