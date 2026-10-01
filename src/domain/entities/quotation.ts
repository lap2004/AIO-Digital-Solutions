export type QuotationStatus = 'sent' | 'contacted' | 'approved' | 'rejected' | 'draft';

export interface QuotationItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export type QuotationRequestType = 'consultation' | 'calculator' | 'quote' | 'contact';

export interface Quotation {
  id: string;
  code: string;
  customerName: string;
  company: string;
  email: string;
  phone: string;
  requestType?: QuotationRequestType;
  interest?: string;
  items: QuotationItem[];
  status: QuotationStatus;
  total: number;
  note: string;
  createdAt: string;
  validUntil: string;
}

export const QUOTATION_STATUS_LABEL: Record<QuotationStatus, string> = {
  sent: 'Chờ liên hệ',
  contacted: 'Đang tư vấn / Đã gọi',
  approved: 'Đã chốt hợp đồng',
  rejected: 'Hủy / Không liên lạc được',
  draft: 'Bản nháp',
};

export const QUOTATION_TYPE_LABEL: Record<QuotationRequestType, string> = {
  consultation: 'Tư vấn nhanh 24/7',
  calculator: 'Bảng tính LED tự động',
  quote: 'Báo giá sản phẩm',
  contact: 'Liên hệ website',
};

