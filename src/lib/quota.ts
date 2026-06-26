export const QUOTAS = {
  trial: { images: 3, videos: 1 },
  basic: { images: 50, videos: 10 },
  pro: { images: 200, videos: 50 },
  enterprise: { images: 3000, videos: 600 },
} as const;

export type PlanType = keyof typeof QUOTAS | 'trial';

export interface UsageData {
  trialClaimed: boolean;
  plan: PlanType | null;
  imagesUsed: number;
  videosUsed: number;
  imagesTotal: number;
  videosTotal: number;
  membershipExpiry: string | null;
  freeTrialAvailable: boolean;
  canGenerateImage: boolean;
  canGenerateVideo: boolean;
}
