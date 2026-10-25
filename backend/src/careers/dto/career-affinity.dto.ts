export class CareerAffinityDto {
  code!: string;
  name!: string;
  description!: string;
  affinityScore!: number; // 0-100
  rank!: number; // 1-based, 1 = best match
}
