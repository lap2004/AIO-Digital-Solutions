export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  salaryRange: string;
  quantity: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedAt: string;
  deadline: string;
  featured: boolean;
}

export const JOB_TYPE_LABEL: Record<JobType, string> = {
  'full-time': 'Toàn thời gian',
  'part-time': 'Bán thời gian',
  contract: 'Hợp đồng',
  internship: 'Thực tập',
};
