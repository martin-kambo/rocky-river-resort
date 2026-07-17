export declare class DateRangeService {
    static nights(checkIn: Date | string, checkOut: Date | string): number;
    static overlaps(a: {
        start: Date;
        end: Date;
    }, b: {
        start: Date;
        end: Date;
    }): boolean;
    static isValidRange(checkIn: Date | string, checkOut: Date | string): boolean;
    static isInFuture(date: Date | string, now?: Date): boolean;
    static toDateString(date: Date): string;
}
