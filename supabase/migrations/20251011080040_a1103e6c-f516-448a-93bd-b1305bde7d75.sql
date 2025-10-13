-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
    AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  discount_price DECIMAL(10,2),
  sku TEXT UNIQUE NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  category TEXT,
  tags TEXT[],
  fabric_type TEXT,
  sizes TEXT[],
  colors TEXT[],
  images TEXT[],
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS policies for products
CREATE POLICY "Products are viewable by everyone"
ON public.products FOR SELECT
USING (status = 'active' OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

CREATE POLICY "Only admins can insert products"
ON public.products FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update products"
ON public.products FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete products"
ON public.products FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create collections table
CREATE TABLE public.collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  season TEXT,
  cover_image TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  release_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on collections
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Collections are viewable by everyone"
ON public.collections FOR SELECT
USING (status = 'active' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage collections"
ON public.collections FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create collection_products junction table
CREATE TABLE public.collection_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(collection_id, product_id)
);

ALTER TABLE public.collection_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Collection products viewable by all"
ON public.collection_products FOR SELECT
USING (true);

CREATE POLICY "Only admins can manage collection products"
ON public.collection_products FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'packed', 'shipped', 'delivered', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  shipping_address JSONB,
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
ON public.orders FOR SELECT
USING (auth.uid() = customer_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage orders"
ON public.orders FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_sku TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  size TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own order items"
ON public.order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND (orders.customer_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
  )
);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT CHECK (category IN ('campaign', 'behind-scenes', 'editorial', 'runway', 'lookbook')),
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery viewable by all"
ON public.gallery FOR SELECT
USING (true);

CREATE POLICY "Only admins can manage gallery"
ON public.gallery FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create lookbooks table
CREATE TABLE public.lookbooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  season TEXT,
  year INTEGER,
  behind_story TEXT,
  video_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  publish_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.lookbooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published lookbooks viewable by all"
ON public.lookbooks FOR SELECT
USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage lookbooks"
ON public.lookbooks FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create lookbook_images table
CREATE TABLE public.lookbook_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lookbook_id UUID REFERENCES public.lookbooks(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.lookbook_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lookbook images viewable with lookbook"
ON public.lookbook_images FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.lookbooks
    WHERE lookbooks.id = lookbook_images.lookbook_id
    AND (lookbooks.status = 'published' OR public.has_role(auth.uid(), 'admin'))
  )
);

CREATE POLICY "Only admins can manage lookbook images"
ON public.lookbook_images FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  views INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts viewable by all"
ON public.blog_posts FOR SELECT
USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage posts"
ON public.blog_posts FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create custom_design_requests table
CREATE TABLE public.custom_design_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  description TEXT NOT NULL,
  measurements JSONB,
  reference_images TEXT[],
  budget_range TEXT,
  deadline DATE,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'approved', 'in-progress', 'completed', 'declined')),
  admin_notes TEXT,
  quotation DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.custom_design_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own requests"
ON public.custom_design_requests FOR SELECT
USING (client_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can create requests"
ON public.custom_design_requests FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only admins can update requests"
ON public.custom_design_requests FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  appointment_type TEXT NOT NULL,
  appointment_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own appointments"
ON public.appointments FOR SELECT
USING (client_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can create appointments"
ON public.appointments FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only admins can manage appointments"
ON public.appointments FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.collections FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.gallery FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.lookbooks FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.custom_design_requests FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();