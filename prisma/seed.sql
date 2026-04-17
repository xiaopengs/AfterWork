-- =============================================================================
-- Seed Data for AfterWork - Initial Moods
-- =============================================================================
--
-- Import Instructions:
-- 1. Run supabase-migration.sql first
-- 2. Go to SQL Editor in Supabase Dashboard
-- 3. Copy and paste this file content
-- 4. Click "Run"
--
-- =============================================================================

-- Insert default moods for the app
INSERT INTO moods (name, emoji, color, description, is_active) VALUES
    ('开心', '😊', '#FFD700', '心情愉悦，充满正能量', true),
    ('放松', '😌', '#90EE90', '轻松自在，享受当下', true),
    ('沉思', '🤔', '#87CEEB', '安静思考，沉淀心情', true),
    ('忧伤', '😢', '#9370DB', '有些低落，需要安慰', true),
    ('愤怒', '😠', '#FF6B6B', '情绪激动，需要冷静', true),
    ('兴奋', '🎉', '#FF69B4', '超级兴奋，好事发生', true),
    ('疲惫', '😴', '#C0C0C0', '累了想休息', true),
    ('孤独', '🌙', '#6A5ACD', '独自一人，享受安静', true),
    ('感恩', '🙏', '#F4A460', '心怀感激', true),
    ('期待', '✨', '#00CED1', '充满期待和希望', true),
    ('焦虑', '😰', '#CD853F', '有些紧张和不安', true),
    ('平静', '🍃', '#98FB98', '心如止水', true)
ON CONFLICT DO NOTHING;

-- Verify mood data
SELECT 'Moods seeded successfully!' AS status, COUNT(*) AS mood_count FROM moods;
