# -*- coding: utf-8 -*-
import docx
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=140, bottom=140, left=200, right=200):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def create_document():
    doc = Document()

    # Page Margins
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Style Defaults
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Calibri'
    font.size = Pt(11)
    font.color.rgb = RGBColor(0x33, 0x41, 0x55) # Slate 700

    # Document Header Title
    p_org = doc.add_paragraph()
    p_org.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_org = p_org.add_run("CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ SỐ AIO\n")
    r_org.font.size = Pt(13)
    r_org.font.bold = True
    r_org.font.color.rgb = RGBColor(0x0E, 0x74, 0x90) # Cyan/Teal Dark

    r_sub = p_org.add_run("WEBSITE CHÍNH THỨC: HTTPS://AIOLED.VN\n")
    r_sub.font.size = Pt(10)
    r_sub.font.bold = True
    r_sub.font.color.rgb = RGBColor(0x64, 0x74, 0x8B)

    # Big Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_title = p_title.add_run("TÀI LIỆU BÀN GIAO TOÀN DIỆN HỆ THỐNG WEBSITE")
    r_title.font.size = Pt(19)
    r_title.font.bold = True
    r_title.font.color.rgb = RGBColor(0x0F, 0x17, 0x2A) # Slate 900

    p_desc = doc.add_paragraph()
    p_desc.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_desc = p_desc.add_run("Cổng thông tin doanh nghiệp, Catalog 293+ sản phẩm, 222 dự án thực tế & Báo giá tự động 24/7\n")
    r_desc.font.size = Pt(11)
    r_desc.font.italic = True
    r_desc.font.color.rgb = RGBColor(0x47, 0x55, 0x69)

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # 1. THÔNG TIN CHUNG
    def add_heading_1(text):
        h = doc.add_paragraph()
        h.paragraph_format.space_before = Pt(16)
        h.paragraph_format.space_after = Pt(6)
        r = h.add_run(text)
        r.font.size = Pt(13.5)
        r.font.bold = True
        r.font.color.rgb = RGBColor(0x02, 0x84, 0xC7) # Sky 600
        return h

    # Section 1
    add_heading_1("1. TÀI KHOẢN & PHÂN QUYỀN TRANG QUẢN TRỊ (ADMIN)")
    p1 = doc.add_paragraph()
    p1.add_run("Đường dẫn đăng nhập quản trị: ").font.bold = True
    r_link = p1.add_run("https://aioled.vn/admin\n")
    r_link.font.bold = True
    r_link.font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
    p1.add_run("Hệ thống đã được thiết lập sẵn 3 cấp độ phân quyền theo nhu cầu quản lý doanh nghiệp:")

    # Table Accounts
    table_acc = doc.add_table(rows=4, cols=4)
    table_acc.alignment = WD_TABLE_ALIGNMENT.CENTER
    headers = ["Phân quyền", "Email đăng nhập", "Mật khẩu", "Chức năng chính"]
    
    for i, h_text in enumerate(headers):
        cell = table_acc.cell(0, i)
        cell.paragraphs[0].text = h_text
        cell.paragraphs[0].runs[0].font.bold = True
        cell.paragraphs[0].runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        set_cell_background(cell, "0F172A") # Slate 900
        set_cell_margins(cell, top=140, bottom=140, left=150, right=150)

    acc_data = [
        ("👑 Super Admin", "admin@aio.vn", "admin123", "Toàn quyền quản trị cao nhất hệ thống, xem toàn bộ báo giá, sản phẩm, dự án và cấu hình."),
        ("✍️ Quản trị viên (Editor)", "editor@aio.vn", "editor123", "Quản lý sản phẩm, cập nhật bảng giá, nội dung bài viết và danh mục dự án."),
        ("💼 Nhân viên Sales", "sales@aio.vn", "sales123", "Tiếp nhận yêu cầu báo giá của khách từ website, bấm gọi ngay & nhắn Zalo tư vấn.")
    ]

    for row_idx, data in enumerate(acc_data, start=1):
        bg_color = "F8FAFC" if row_idx % 2 == 1 else "FFFFFF"
        for col_idx, text in enumerate(data):
            cell = table_acc.cell(row_idx, col_idx)
            cell.paragraphs[0].text = text
            if col_idx in [0, 1, 2]:
                cell.paragraphs[0].runs[0].font.bold = True
            if col_idx == 1:
                cell.paragraphs[0].runs[0].font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
            if col_idx == 2:
                cell.paragraphs[0].runs[0].font.color.rgb = RGBColor(0xDC, 0x26, 0x26) # Red
            set_cell_background(cell, bg_color)
            set_cell_margins(cell, top=140, bottom=140, left=150, right=150)

    # Section 2
    add_heading_1("2. THÔNG TIN TÊN MIỀN (DOMAIN) & CÁCH DUY TRÌ")
    p2 = doc.add_paragraph()
    p2.add_run("• Tên miền chính thức: ").font.bold = True
    p2.add_run("https://aioled.vn\n")
    p2.add_run("• Nhà cung cấp quản lý: ").font.bold = True
    p2.add_run("iNET (Nhà đăng ký tên miền quốc gia Việt Nam).\n")
    p2.add_run("• Tài khoản quản lý tên miền: ").font.bold = True
    p2.add_run("Khách hàng nắm giữ tài khoản chính chủ tại website inet.vn.\n")
    p2.add_run("• Chứng chỉ bảo mật SSL (HTTPS): ").font.bold = True
    p2.add_run("Đã kích hoạt chứng chỉ khóa xanh bảo mật quốc tế vĩnh viễn (Miễn phí 100%, tự động gia hạn).\n")
    p2.add_run("• Hướng dẫn duy trì: ").font.bold = True
    p2.add_run("Khách hàng chỉ cần gia hạn tên miền định kỳ hàng năm theo thông báo trực tiếp từ iNET (chi phí theo quy định nhà nước khoảng 400.000đ - 450.000đ/năm).")

    # Section 3
    add_heading_1("3. NƠI TRIỂN KHAI, MÁY CHỦ (HOSTING) & CHI PHÍ VẬN HÀNH")
    p3 = doc.add_paragraph()
    p3.add_run("• Nơi đặt máy chủ: ").font.bold = True
    p3.add_run("Hệ thống Đám mây Toàn cầu Serverless Edge Network của Vercel, kết nối mạng lưới truyền tải siêu tốc đặt tại Châu Á & Việt Nam.\n")
    p3.add_run("• Tốc độ tải trang: ").font.bold = True
    p3.add_run("Siêu nhanh dưới 0.5 giây, mở ngay tức thì trên mọi thiết bị và đường truyền 4G/5G.\n")
    p3.add_run("• Độ chịu tải: ").font.bold = True
    p3.add_run("Tự động co giãn theo số lượng khách, có thể tiếp nhận hàng trăm nghìn lượt truy cập cùng lúc mà không lo nghẽn mạng hay sập web.\n")
    p3.add_run("• Chi phí thuê máy chủ (Hosting): ").font.bold = True
    r_free = p3.add_run("0 VNĐ / tháng (Miễn phí trọn đời). ")
    r_free.font.bold = True
    r_free.font.color.rgb = RGBColor(0x16, 0xA3, 0x4A) # Green
    p3.add_run("Doanh nghiệp không cần phải trả tiền thuê máy chủ hàng tháng.")

    # Section 4
    add_heading_1("4. NƠI LƯU TRỮ DỮ LIỆU, VIDEO 4K & HÌNH ẢNH")
    p4 = doc.add_paragraph()
    p4.add_run("• Kho dữ liệu Sản phẩm (293+ sản phẩm): ").font.bold = True
    p4.add_run("Lưu trữ trên đám mây CDN, tối ưu dung lượng hình ảnh siêu nhẹ nhưng vẫn giữ nét căng.\n")
    p4.add_run("• Video công trình thực tế (91 video 4K/Full HD): ").font.bold = True
    p4.add_run("Lưu trữ và phát luồng trực tiếp với 100% độ sắc nét bóng LED của video gốc của AIO, khách bấm vào xem ngay không bị giật lag.\n")
    p4.add_run("• Dữ liệu mã nguồn hệ thống: ").font.bold = True
    p4.add_run("Được sao lưu và lưu trữ an toàn tuyệt đối trên kho lưu trữ mã nguồn quốc tế GitHub (kho: lap2004/AIO-Digital-Solutions).")

    # Section 5
    add_heading_1("5. TIẾP NHẬN BÁO GIÁ & CHĂM SÓC KHÁCH HÀNG 24/7")
    p5 = doc.add_paragraph()
    p5.add_run("Khi khách hàng truy cập website và gửi số điện thoại từ bất kỳ vị trí nào (Cửa sổ chat nổi 24/7, Bảng tính LED tự động, Giỏ hàng báo giá, Form liên hệ):\n")
    p5.add_run("1. Hệ thống Admin lập tức nhận diện và hiện chuông báo đỏ.\n")
    p5.add_run("2. Nhân viên kinh doanh mở trang Quản trị Báo giá để bấm nút ")
    r_call = p5.add_run("Gọi ngay")
    r_call.font.bold = True
    r_call.font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
    p5.add_run(" hoặc nút ")
    r_zalo = p5.add_run("Zalo")
    r_zalo.font.bold = True
    r_zalo.font.color.rgb = RGBColor(0x16, 0xA3, 0x4A)
    p5.add_run(" để tư vấn và gửi bảng giá ngay trong vài giây.")

    # Section 6
    add_heading_1("6. TÌNH TRẠNG KHAI BÁO GOOGLE & CHUẨN SEO")
    p6 = doc.add_paragraph()
    p6.add_run("• Xác minh Google Search Console: ").font.bold = True
    p6.add_run("Đã xác minh quyền sở hữu chính chủ 100% tên miền aioled.vn.\n")
    p6.add_run("• Sơ đồ trang web (Sitemap): ").font.bold = True
    p6.add_run("Đã gửi sitemap.xml thành công lên Google (Trạng thái: Thành công).\n")
    p6.add_run("• Lập chỉ mục tìm kiếm: ").font.bold = True
    p6.add_run("Đã gửi yêu cầu lập chỉ mục ưu tiên cho Trang chủ. Google sẽ hoàn tất hiển thị kết quả tìm kiếm trong vòng 24h - 48h tới.")

    # Section 7
    add_heading_1("7. BẢNG TỔNG HỢP CHI PHÍ ĐỊNH KỲ HÀNG NĂM")
    
    table_fee = doc.add_table(rows=6, cols=3)
    table_fee.alignment = WD_TABLE_ALIGNMENT.CENTER
    fee_headers = ["Hạng mục dịch vụ", "Chi phí định kỳ", "Ghi chú & Trách nhiệm"]
    for i, h_text in enumerate(fee_headers):
        cell = table_fee.cell(0, i)
        cell.paragraphs[0].text = h_text
        cell.paragraphs[0].runs[0].font.bold = True
        cell.paragraphs[0].runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        set_cell_background(cell, "0F172A")
        set_cell_margins(cell, top=140, bottom=140, left=150, right=150)

    fee_rows = [
        ("Máy chủ (Hosting Cloud)", "0 VNĐ / tháng", "Miễn phí trọn đời trên hạ tầng đám mây cao cấp"),
        ("Chứng chỉ bảo mật SSL (HTTPS)", "0 VNĐ", "Tự động kích hoạt khóa xanh bảo mật vĩnh viễn"),
        ("Lưu trữ Video 4K & Hình ảnh", "0 VNĐ", "Đã nén tối ưu CDN không phát sinh chi phí"),
        ("Duy trì Tên miền aioled.vn", "Theo giá iNET (~450k/năm)", "Khách hàng tự thanh toán trực tiếp cho nhà đăng ký iNET"),
        ("TỔNG CHI PHÍ VẬN HÀNH HÀNG THÁNG", "0 VNĐ / THÁNG", "TIẾT KIỆM 100% CHI PHÍ THUÊ MÁY CHỦ CHO DOANH NGHIỆP")
    ]

    for row_idx, data in enumerate(fee_rows, start=1):
        bg_color = "F1F5F9" if row_idx == 5 else ("F8FAFC" if row_idx % 2 == 1 else "FFFFFF")
        for col_idx, text in enumerate(data):
            cell = table_fee.cell(row_idx, col_idx)
            cell.paragraphs[0].text = text
            if row_idx == 5 or col_idx == 1:
                cell.paragraphs[0].runs[0].font.bold = True
            if row_idx == 5:
                cell.paragraphs[0].runs[0].font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
            set_cell_background(cell, bg_color)
            set_cell_margins(cell, top=140, bottom=140, left=150, right=150)

    # Footer Sign
    p_end = doc.add_paragraph()
    p_end.paragraph_format.space_before = Pt(30)
    p_end.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r_end1 = p_end.add_run("ĐẠI DIỆN ĐƠN VỊ BÀN GIAO\n")
    r_end1.font.bold = True
    r_end1.font.size = Pt(11)
    r_end2 = p_end.add_run("(Đã hoàn tất bàn giao toàn bộ mã nguồn, tài khoản & quyền quản trị)")
    r_end2.font.italic = True
    r_end2.font.size = Pt(10)

    output_path = r"e:\web\Camanh\TAI_LIEU_BAN_GIAO_WEBSITE_AIOLED_VN.docx"
    doc.save(output_path)
    print(f"Document created successfully at: {output_path}")

if __name__ == "__main__":
    create_document()
