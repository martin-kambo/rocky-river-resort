"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingReferenceService = void 0;
class BookingReferenceService {
    static generate() {
        let ref = this.PREFIX;
        for (let i = 0; i < 6; i++) {
            ref += this.CHARS[Math.floor(Math.random() * this.CHARS.length)];
        }
        return ref;
    }
    static isValid(ref) {
        return /^RRR-[A-Z0-9]{6}$/.test(ref);
    }
}
exports.BookingReferenceService = BookingReferenceService;
BookingReferenceService.CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
BookingReferenceService.PREFIX = 'RRR-';
//# sourceMappingURL=booking-reference.service.js.map