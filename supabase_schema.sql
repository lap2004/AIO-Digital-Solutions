-- Schema Database PostgreSQL cho AIO Digital Solutions trên Supabase

-- Kích hoạt extension uuid-ossp để tự tạo uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Bảng Khách hàng tiềm năng (Leads - CRM)
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    company TEXT,
    email TEXT,
    phone TEXT,
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'negotiation', 'won', 'lost'
    source TEXT NOT NULL, -- 'website', 'referral', 'campaign', 'hotline', 'zalo', 'event'
    interest TEXT,
    estimated_value NUMERIC DEFAULT 0,
    assigned_to TEXT,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Bảng Yêu cầu báo giá (Quotations)
CREATE TABLE quotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT NOT NULL,
    company_name TEXT,
    product_category TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'cancelled'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bảng Sản phẩm (Products)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    name_en TEXT,
    sku TEXT UNIQUE,
    category TEXT NOT NULL,
    brand TEXT,
    country TEXT,
    warranty TEXT,
    price NUMERIC,
    short_description TEXT,
    short_description_en TEXT,
    description TEXT,
    description_en TEXT,
    image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]', -- Mảng các object chứa url và alt
    video_url TEXT,
    specifications JSONB DEFAULT '[]', -- Mảng các cấu hình {label, value}
    documents JSONB DEFAULT '[]', -- Mảng các tài liệu pdf
    applications JSONB DEFAULT '[]', -- Mảng string
    tags JSONB DEFAULT '[]', -- Mảng string
    status TEXT DEFAULT 'active', -- 'active', 'draft', 'archived'
    featured BOOLEAN DEFAULT false,
    related_product_ids JSONB DEFAULT '[]', -- Mảng string ID
    related_project_ids JSONB DEFAULT '[]', -- Mảng string ID
    seo JSONB DEFAULT '{}', -- Object {title, description, keywords}
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Bảng Dự án (Projects)
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    name_en TEXT,
    category TEXT NOT NULL,
    client TEXT,
    client_en TEXT,
    location TEXT,
    location_en TEXT,
    description TEXT,
    description_en TEXT,
    challenge TEXT,
    challenge_en TEXT,
    solution TEXT,
    solution_en TEXT,
    cover TEXT NOT NULL,
    gallery JSONB DEFAULT '[]',
    video_url TEXT,
    technologies JSONB DEFAULT '[]', -- Mảng string
    scale TEXT,
    scale_en TEXT,
    area TEXT,
    area_en TEXT,
    completed_at TIMESTAMPTZ,
    featured BOOLEAN DEFAULT false,
    related_product_ids JSONB DEFAULT '[]',
    seo JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Bảng Giải pháp (Solutions)
CREATE TABLE solutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    name_en TEXT,
    tagline TEXT,
    tagline_en TEXT,
    description TEXT,
    description_en TEXT,
    icon TEXT,
    cover TEXT,
    benefits JSONB DEFAULT '[]', -- Mảng object {title, description, icon}
    architecture JSONB DEFAULT '{}', -- Object chứa luồng kiến trúc
    featured BOOLEAN DEFAULT false,
    seo JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Bảng Tin tức (News)
CREATE TABLE news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    title_en TEXT,
    category TEXT NOT NULL,
    excerpt TEXT,
    excerpt_en TEXT,
    content TEXT,
    content_en TEXT,
    cover TEXT,
    author JSONB DEFAULT '{}', -- Object {name, role, avatar}
    tags JSONB DEFAULT '[]',
    published_at TIMESTAMPTZ DEFAULT NOW(),
    seo JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cài đặt Triggers để tự động cập nhật trường updated_at mỗi khi có thay đổi

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_modtime BEFORE UPDATE ON leads FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_quotations_modtime BEFORE UPDATE ON quotations FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_products_modtime BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_projects_modtime BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_solutions_modtime BEFORE UPDATE ON solutions FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_news_modtime BEFORE UPDATE ON news FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Bật bảo mật mức dòng (Row Level Security - RLS) cho tất cả các bảng 
-- (Sau khi đưa lên Supabase, bạn có thể tùy chỉnh Policy để public read và auth write)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Ví dụ cấu hình Policy cơ bản cho Products (Ai cũng có thể đọc, chỉ người đăng nhập mới được sửa)
CREATE POLICY "Public profiles are viewable by everyone." ON products FOR SELECT USING (true);
CREATE POLICY "Public projects are viewable by everyone." ON projects FOR SELECT USING (true);
CREATE POLICY "Public solutions are viewable by everyone." ON solutions FOR SELECT USING (true);
CREATE POLICY "Public news are viewable by everyone." ON news FOR SELECT USING (true);
