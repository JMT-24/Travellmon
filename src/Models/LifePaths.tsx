class LifePath {
    name: string;
    pathStreak: number;
    totalTimeSpent: number;

    constructor(name: string, pathStreak: number, totalTimeSpent: number)
    {
        this.name = name;
        this.pathStreak = pathStreak;
        this.totalTimeSpent = totalTimeSpent;
    }
}

export class PathOfMotion extends LifePath {
    totalDistanceCovered: number;
    longestDistanceCovered: number;
    longestTimeSpent: number;

    constructor(data: {
        name: string, pathStreak: number, totalTimeSpent: number, totalDistanceCovered: number, 
        longestDistanceCovered: number, longestTimeSpent: number
    })
    {
        super(data.name, data.pathStreak, data.totalTimeSpent);
        this.totalDistanceCovered = data.totalDistanceCovered;
        this.longestDistanceCovered = data.longestDistanceCovered;
        this.longestTimeSpent = data.longestTimeSpent;
    }
}