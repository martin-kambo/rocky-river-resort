export declare class CancellationPolicyService {
    private static readonly FREE_CANCELLATION_HOURS;
    static canCancel(checkIn: Date, now?: Date): CancellationResult;
    static getRefundPercentage(checkIn: Date, now?: Date): number;
}
export interface CancellationResult {
    canCancel: boolean;
    refundable: boolean;
    hoursUntilCheckIn: number;
    reason?: string;
}
