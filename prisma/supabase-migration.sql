-- =============================================================================
-- Supabase Database Migration for AfterWork
-- =============================================================================
-- 
-- Import Instructions for Supabase Dashboard:
-- 1. Go to https://app.supabase.com and select your project
-- 2. Navigate to SQL Editor in the left sidebar
-- 3. Click "New Query" 
-- 4. Copy and paste this entire SQL file content
-- 5. Click "Run" to execute the migration
--
-- Alternative: Use Supabase CLI
--   supabase db push
--   supabase migration new migration_name
--
-- =============================================================================

-- Enable UUID extension (required for gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. USERS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for username lookups
CREATE INDEX idx_users_username ON users(username);

-- =============================================================================
-- 2. MOODS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS moods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    emoji VARCHAR(10),
    color VARCHAR(7),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for active mood lookups
CREATE INDEX idx_moods_active ON moods(is_active) WHERE is_active = true;

-- =============================================================================
-- 3. POSTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    mood VARCHAR(50) DEFAULT '深思',
    likes INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    anonymous BOOLEAN DEFAULT true,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for posts
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_mood ON posts(mood);

-- =============================================================================
-- 4. COMMENTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    anonymous BOOLEAN DEFAULT true,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for comments
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

-- =============================================================================
-- 5. MEMORIES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    mood VARCHAR(50),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    drink_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for memories
CREATE INDEX idx_memories_user_id ON memories(user_id);
CREATE INDEX idx_memories_drink_id ON memories(drink_id);
CREATE INDEX idx_memories_created_at ON memories(created_at DESC);

-- =============================================================================
-- 6. FORTUNES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS fortunes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    fortune_type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    prediction JSONB,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fortunes
CREATE INDEX idx_fortunes_user_id ON fortunes(user_id);
CREATE INDEX idx_fortunes_type ON fortunes(fortune_type);
CREATE INDEX idx_fortunes_expires_at ON fortunes(expires_at);

-- =============================================================================
-- 7. BOOKMARKS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, post_id)
);

-- Indexes for bookmarks
CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_post_id ON bookmarks(post_id);

-- =============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE moods ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE fortunes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- RLS POLICIES FOR USERS
-- =============================================================================

-- Users can read all profiles (username only for privacy)
CREATE POLICY "Users can view all profiles"
    ON users FOR SELECT
    USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON users FOR UPDATE
    USING (auth.uid() = id);

-- Users can insert their own profile (registration)
CREATE POLICY "Users can create own profile"
    ON users FOR INSERT
    WITH CHECK (auth.uid() = id);

-- =============================================================================
-- RLS POLICIES FOR MOODS
-- =============================================================================

-- All users can read active moods
CREATE POLICY "All users can view active moods"
    ON moods FOR SELECT
    USING (is_active = true);

-- Only authenticated users can manage moods (admin level)
CREATE POLICY "Authenticated users can manage moods"
    ON moods FOR ALL
    USING (auth.role() = 'authenticated');

-- =============================================================================
-- RLS POLICIES FOR POSTS
-- =============================================================================

-- All users can read posts
CREATE POLICY "All users can view posts"
    ON posts FOR SELECT
    USING (true);

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts"
    ON posts FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Users can update their own posts
CREATE POLICY "Users can update own posts"
    ON posts FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete own posts"
    ON posts FOR DELETE
    USING (auth.uid() = user_id);

-- =============================================================================
-- RLS POLICIES FOR COMMENTS
-- =============================================================================

-- All users can read comments
CREATE POLICY "All users can view comments"
    ON comments FOR SELECT
    USING (true);

-- Authenticated users can create comments
CREATE POLICY "Authenticated users can create comments"
    ON comments FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Users can update their own comments
CREATE POLICY "Users can update own comments"
    ON comments FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments"
    ON comments FOR DELETE
    USING (auth.uid() = user_id);

-- =============================================================================
-- RLS POLICIES FOR MEMORIES
-- =============================================================================

-- Users can read all memories (for community viewing)
CREATE POLICY "All users can view memories"
    ON memories FOR SELECT
    USING (true);

-- Authenticated users can create memories
CREATE POLICY "Authenticated users can create memories"
    ON memories FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Users can update their own memories
CREATE POLICY "Users can update own memories"
    ON memories FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own memories
CREATE POLICY "Users can delete own memories"
    ON memories FOR DELETE
    USING (auth.uid() = user_id);

-- =============================================================================
-- RLS POLICIES FOR FORTUNES
-- =============================================================================

-- Users can read their own fortunes
CREATE POLICY "Users can view own fortunes"
    ON fortunes FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create their own fortunes
CREATE POLICY "Users can create own fortunes"
    ON fortunes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own fortunes
CREATE POLICY "Users can update own fortunes"
    ON fortunes FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own fortunes
CREATE POLICY "Users can delete own fortunes"
    ON fortunes FOR DELETE
    USING (auth.uid() = user_id);

-- =============================================================================
-- RLS POLICIES FOR BOOKMARKS
-- =============================================================================

-- Users can read their own bookmarks
CREATE POLICY "Users can view own bookmarks"
    ON bookmarks FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create their own bookmarks
CREATE POLICY "Users can create own bookmarks"
    ON bookmarks FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can delete their own bookmarks
CREATE POLICY "Users can delete own bookmarks"
    ON bookmarks FOR DELETE
    USING (auth.uid() = user_id);

-- =============================================================================
-- ENABLE REALTIME (optional - for live updates)
-- =============================================================================
-- ALTER PUBLICATION supabase_realtime ADD TABLE posts;
-- ALTER PUBLICATION supabase_realtime ADD TABLE comments;
-- ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;

-- =============================================================================
-- TRIGGER: Auto-update updated_at timestamp
-- =============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_moods_updated_at
    BEFORE UPDATE ON moods
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_memories_updated_at
    BEFORE UPDATE ON memories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fortunes_updated_at
    BEFORE UPDATE ON fortunes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookmarks_updated_at
    BEFORE UPDATE ON bookmarks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
