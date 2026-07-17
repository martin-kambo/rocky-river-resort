"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    const adminHash = await bcrypt.hash('Admin@RRR2025!', 12);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@rockyriverresort.co.ke' },
        update: {},
        create: {
            email: 'admin@rockyriverresort.co.ke',
            passwordHash: adminHash,
            firstName: 'Resort',
            lastName: 'Admin',
            role: 'admin',
            nationality: 'KEN',
            preferredLocale: 'en',
            emailVerifiedAt: new Date(),
        },
    });
    console.log('✅ Admin user:', admin.email);
    const roomTypes = [
        {
            slug: 'river-suite',
            nameEn: 'River Suite',
            nameSw: 'Suite ya Mto',
            descriptionEn: 'Floor-to-ceiling windows frame the Athi River in its full glory. Unwind in a clawfoot bathtub, step out to your private river-facing terrace, and fall asleep to the sound of flowing water.',
            descriptionSw: 'Madirisha ya dari hadi dari yanaonyesha Mto Athi kwa utukufu wake wote. Pumzika kwenye bafu la miguu ya paka, toka nje kwenye terasi yako ya kibinafsi inayotazama mto.',
            basePriceKes: 28000,
            basePriceUsd: 215,
            maxOccupancy: 2,
            sizeSqm: 48,
            amenities: ['King bed', 'River terrace', 'Clawfoot bath', 'Rain shower', 'Free Wi-Fi', 'Mini bar', 'Air conditioning', 'Smart TV'],
            sortOrder: 1,
        },
        {
            slug: 'riverside-cottage',
            nameEn: 'Riverside Cottage',
            nameSw: 'Kibanda cha Mto',
            descriptionEn: 'A standalone cottage with your own plunge pool, outdoor shower, and a private path leading directly to the Athi River.',
            descriptionSw: 'Kibanda cha kujitegemea chenye bwawa lako la kupiga mbizi, bafu la nje, na njia ya kibinafsi inayoelekea moja kwa moja kwenye Mto Athi.',
            basePriceKes: 38000,
            basePriceUsd: 290,
            maxOccupancy: 3,
            sizeSqm: 72,
            amenities: ['King bed', 'Private plunge pool', 'Outdoor shower', 'Kitchenette', 'River access path', 'Free Wi-Fi', 'Mini bar', 'Fireplace'],
            sortOrder: 2,
        },
        {
            slug: 'savannah-room',
            nameEn: 'Savannah Room',
            nameSw: 'Chumba cha Savana',
            descriptionEn: 'Warm earth tones, hand-carved Kenyan furniture, and a garden balcony with views of our lush grounds.',
            descriptionSw: 'Vivuli vya ardhi vya joto, samani za Kikenya zilizochongwa kwa mkono, na balcony ya bustani yenye mandhari ya ardhi yetu ya kijani.',
            basePriceKes: 18000,
            basePriceUsd: 138,
            maxOccupancy: 2,
            sizeSqm: 34,
            amenities: ['Queen bed', 'Garden balcony', 'Pool access', 'Rain shower', 'Free Wi-Fi', 'Mini bar', 'Air conditioning', 'Smart TV'],
            sortOrder: 3,
        },
        {
            slug: 'family-villa',
            nameEn: 'Family Villa',
            nameSw: 'Vila ya Familia',
            descriptionEn: "Two spacious bedrooms, a generous lounge, full kitchen, and a children's play deck overlooking the pool.",
            descriptionSw: 'Vyumba viwili vikubwa vya kulala, sebule ya kutosha, jiko kamili, na dari ya watoto inayotazama bwawa.',
            basePriceKes: 48000,
            basePriceUsd: 368,
            maxOccupancy: 6,
            sizeSqm: 110,
            amenities: ['2 Bedrooms', 'Full kitchen', 'Private lounge', "Children's play deck", 'Pool view', 'Free Wi-Fi', 'Washing machine', 'Air conditioning'],
            sortOrder: 4,
        },
    ];
    for (const rt of roomTypes) {
        const roomType = await prisma.roomType.upsert({
            where: { slug: rt.slug },
            update: {},
            create: rt,
        });
        await prisma.room.upsert({
            where: { roomNumber: `${roomType.sortOrder}01` },
            update: {},
            create: {
                roomTypeId: roomType.id,
                roomNumber: `${roomType.sortOrder}01`,
                floor: roomType.sortOrder <= 2 ? 2 : 1,
                viewType: roomType.slug === 'savannah-room' ? 'garden'
                    : roomType.slug === 'family-villa' ? 'pool'
                        : 'river',
                status: 'available',
            },
        });
        console.log(`✅ ${rt.nameEn}`);
    }
    const allRoomTypes = await prisma.roomType.findMany();
    const periods = [
        { label: 'Christmas & New Year', start: '2025-12-20', end: '2026-01-05', multiplier: 1.5 },
        { label: 'Easter Holiday', start: '2026-04-02', end: '2026-04-12', multiplier: 1.3 },
        { label: 'August Peak Season', start: '2026-08-01', end: '2026-08-31', multiplier: 1.2 },
    ];
    for (const rt of allRoomTypes) {
        for (const p of periods) {
            await prisma.seasonalPricing.upsert({
                where: {
                    roomTypeId_startDate_endDate: {
                        roomTypeId: rt.id,
                        startDate: new Date(p.start),
                        endDate: new Date(p.end),
                    },
                },
                update: { multiplier: p.multiplier },
                create: {
                    roomTypeId: rt.id,
                    startDate: new Date(p.start),
                    endDate: new Date(p.end),
                    multiplier: p.multiplier,
                    label: p.label,
                },
            });
        }
    }
    console.log('✅ Seasonal pricing');
    console.log('\n🎉 Seed complete!');
}
main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map