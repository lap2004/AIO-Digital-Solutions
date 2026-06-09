export type QuotationStatus = 'draft' | 'sent' | 'approved' | 'rejected';

export interface QuotationItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Quotation {
  id: string;
  code: string;
  customerName: string;
  company: string;
  email: string;
  phone: string;
  items: QuotationItem[];
  status: QuotationStatus;
  total: number;
  note: string;
  createdAt: string;
  validUntil: string;
}

export const QUOTATION_STATUS_LABEL: Record<QuotationStatus, string> = {
  draft: 'Nháp',
  sent: 'Đã gửi',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
};
