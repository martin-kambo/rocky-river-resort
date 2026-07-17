export declare class BookingReferenceService {
    private static readonly CHARS;
    private static readonly PREFIX;
    static generate(): string;
    static isValid(ref: string): boolean;
}
