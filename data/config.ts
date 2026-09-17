export interface SiteConfig {
    partnerName: string;
    anniversaryDate: string;
    relationshipStartDate: string;
    heroMessage: string;
    heroPhoto: string;
}

export const siteConfig = {
    partnerName: "PARTNER_NAME_HERE",
    anniversaryDate: "2024-01-01",
    relationshipStartDate: "2024-01-01",
    heroMessage: "PLACEHOLDER_MESSAGE_HERE",
    heroPhoto: "/images/hero-placeholder.jpg",
} satisfies SiteConfig;

export const rotatingMessages: string[] = [
    "PLACEHOLDER_MESSAGE_1",
    "PLACEHOLDER_MESSAGE_2",
    "PLACEHOLDER_MESSAGE_3",
];