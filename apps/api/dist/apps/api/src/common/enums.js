"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomStatus = exports.PaymentStatus = exports.BookingStatus = void 0;
exports.BookingStatus = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    CANCELLED: 'CANCELLED',
    COMPLETED: 'COMPLETED',
};
exports.PaymentStatus = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED',
};
exports.RoomStatus = {
    available: 'available',
    occupied: 'occupied',
    maintenance: 'maintenance',
};
//# sourceMappingURL=enums.js.map