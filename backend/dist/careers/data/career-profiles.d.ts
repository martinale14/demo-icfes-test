export interface CareerProfile {
    code: string;
    name: string;
    description: string;
    weights: Record<string, number>;
}
export declare const CAREER_PROFILES: CareerProfile[];
