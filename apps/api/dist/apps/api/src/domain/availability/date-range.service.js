"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRangeService = void 0;
const date_fns_1 = require("date-fns");
class DateRangeService {
    static nights(checkIn, checkOut) {
        return (0, date_fns_1.differenceInCalendarDays)(new Date(checkOut), new Date(checkIn));
    }
    static overlaps(a, b) {
        return (0, date_fns_1.isBefore)(a.start, b.end) && (0, date_fns_1.isAfter)(a.end, b.start);
    }
    static isValidRange(checkIn, checkOut) {
        const ci = new Date(checkIn);
        const co = new Date(checkOut);
        return (0, date_fns_1.isAfter)(co, ci) && !(0, date_fns_1.isEqual)(ci, co);
    }
    static isInFuture(date, now = new Date()) {
        return (0, date_fns_1.isAfter)(new Date(date), now);
    }
    static toDateString(date) {
        return date.toISOString().slice(0, 10);
    }
}
exports.DateRangeService = DateRangeService;
//# sourceMappingURL=date-range.service.js.map