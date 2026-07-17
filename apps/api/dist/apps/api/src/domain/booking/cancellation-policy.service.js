"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancellationPolicyService = void 0;
class CancellationPolicyService {
    static canCancel(checkIn, now = new Date()) {
        const hoursUntilCheckIn = (checkIn.getTime() - now.getTime()) / 3_600_000;
        if (hoursUntilCheckIn >= this.FREE_CANCELLATION_HOURS) {
            return { canCancel: true, refundable: true, hoursUntilCheckIn };
        }
        if (hoursUntilCheckIn > 0) {
            return { canCancel: false, refundable: false, hoursUntilCheckIn,
                reason: `Cancellations within ${this.FREE_CANCELLATION_HOURS} hours of check-in are non-refundable. Please contact us directly.` };
        }
        return { canCancel: false, refundable: false, hoursUntilCheckIn: 0,
            reason: 'Check-in date has already passed.' };
    }
    static getRefundPercentage(checkIn, now = new Date()) {
        const hours = (checkIn.getTime() - now.getTime()) / 3_600_000;
        if (hours >= this.FREE_CANCELLATION_HOURS)
            return 100;
        return 0;
    }
}
exports.CancellationPolicyService = CancellationPolicyService;
CancellationPolicyService.FREE_CANCELLATION_HOURS = 48;
//# sourceMappingURL=cancellation-policy.service.js.map