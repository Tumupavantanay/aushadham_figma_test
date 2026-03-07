// Doctor data layer — swap the return value here for a real DB/API call when ready
// e.g. return await prisma.doctor.findMany() or fetch('/api/doctors')

export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    experience: string;
    rating: number;
    reviewCount?: number;
    specialties: string[];
    avatarColor?: string;
    avatarInitials: string;
}

export async function getDoctors(): Promise<Doctor[]> {
    // TODO: replace with real DB query, e.g.:
    // return prisma.doctor.findMany({ where: { active: true } });
    return [
        {
            id: "1",
            name: "Dr. Himadri Chaudary",
            specialization: "Ayurveda Practitioner (BAMS, MD)",
            experience: "10 Yrs Experience",
            rating: 4.9,
            reviewCount: 312,
            avatarInitials: "HC",
            avatarColor: "#228573",
            specialties: ["Nutrition", "Digestion", "Stress Relief", "Skin Care", "Weight Loss"],
        },
        {
            id: "2",
            name: "Dr. Priya Nair",
            specialization: "Ayurveda Practitioner (BAMS, MD)",
            experience: "8 Yrs Experience",
            rating: 4.9,
            reviewCount: 287,
            avatarInitials: "PN",
            avatarColor: "#3aa692",
            specialties: ["Women's Health", "Hormonal Balance", "Detox", "Joint Pain", "Sleep"],
        },
        {
            id: "3",
            name: "Dr. Anand Sharma",
            specialization: "Ayurveda Specialist (BAMS, PhD)",
            experience: "12 Yrs Experience",
            rating: 4.9,
            reviewCount: 401,
            avatarInitials: "AS",
            avatarColor: "#065b4b",
            specialties: ["Diabetes", "Hypertension", "Immunity", "Respiratory", "Liver Care"],
        },
    ];
}
