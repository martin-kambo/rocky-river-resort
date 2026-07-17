"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBookingReference = generateBookingReference;
exports.calcNights = calcNights;
exports.formatKes = formatKes;
exports.formatUsd = formatUsd;
exports.formatCurrency = formatCurrency;
exports.slugify = slugify;
exports.clamp = clamp;
const date_fns_1 = require("date-fns");
function generateBookingReference() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let ref = 'RRR-';
    for (let i = 0; i < 6; i++) {
        ref += chars[Math.floor(Math.random() * chars.length)];
    }
    return ref;
}
function calcNights(checkIn, checkOut) {
    return (0, date_fns_1.differenceInCalendarDays)(new Date(checkOut), new Date(checkIn));
}
function formatKes(amount) {
    return `KES ${amount.toLocaleString('en-KE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })}`;
}
function formatUsd(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}
function formatCurrency(kes, usd, locale) {
    return locale === 'sw' || locale === 'en-KE' ? formatKes(kes) : formatUsd(usd);
}
function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
//# sourceMappingURL=index.js.map