/** CRM lead pipeline entities. */
export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'negotiation'
  | 'won'
  | 'lost';

export type LeadSource = 'website' | 'referral' | 'campaign' | 'hotline' | 'zalo' | 'event';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  interest: string;
  estimatedValue: number;
  assignedTo: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export const LEAD_STATUS_FLOW: LeadStatus[] = [
  'new',
  'contacted',
  'negotiation',
  'won',
  'lost',
];

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  new: 'Mới',
  contacted: 'Đã liên hệ & Báo giá',
  negotiation: 'Đàm phán',
  won: 'Thành công',
  lost: 'Thất bại',
};
