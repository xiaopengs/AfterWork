import { NextRequest, NextResponse } from 'next/server';

// 模拟数据库存储
const memoriesStore: Map<string, any> = new Map();
const userMemoriesIndex: Map<string, string[]> = new Map();

interface Memory {
  id: string;
  userId: string;
  type: 'post' | 'collection' | 'drink';
  title: string;
  content?: string;
  date: string;
  createdAt: number;
}

// 获取回忆列表
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId') || 'default';
  const type = searchParams.get('type'); // 'post' | 'collection' | 'drink' | null

  try {
    // 模拟数据库查询延迟
    await new Promise(resolve => setTimeout(resolve, 200));

    const userMemoryIds = userMemoriesIndex.get(userId) || [];
    let memories: any[] = [];

    userMemoryIds.forEach(id => {
      const memory = memoriesStore.get(id);
      if (memory) {
        if (!type || memory.type === type) {
          memories.push(memory);
        }
      }
    });

    // 按时间倒序
    memories.sort((a, b) => b.createdAt - a.createdAt);

    return NextResponse.json({
      success: true,
      data: memories,
      total: memories.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '获取回忆列表失败' },
      { status: 500 }
    );
  }
}

// 存储新回忆
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, title, content } = body;

    if (!userId || !type || !title) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      );
    }

    if (!['post', 'collection', 'drink'].includes(type)) {
      return NextResponse.json(
        { success: false, error: '无效的记忆类型' },
        { status: 400 }
      );
    }

    const memory: Memory = {
      id: `memory_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type,
      title,
      content: content || '',
      date: new Date().toISOString().split('T')[0],
      createdAt: Date.now(),
    };

    // 存储记忆
    memoriesStore.set(memory.id, memory);

    // 更新用户索引
    const userMemoryIds = userMemoriesIndex.get(userId) || [];
    userMemoryIds.push(memory.id);
    userMemoriesIndex.set(userId, userMemoryIds);

    return NextResponse.json({
      success: true,
      data: memory,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '存储回忆失败' },
      { status: 500 }
    );
  }
}

// 更新回忆
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, content } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: '缺少记忆ID' },
        { status: 400 }
      );
    }

    const memory = memoriesStore.get(id);
    if (!memory) {
      return NextResponse.json(
        { success: false, error: '记忆不存在' },
        { status: 404 }
      );
    }

    // 更新字段
    if (title) memory.title = title;
    if (content !== undefined) memory.content = content;
    memory.createdAt = Date.now();

    memoriesStore.set(id, memory);

    return NextResponse.json({
      success: true,
      data: memory,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '更新回忆失败' },
      { status: 500 }
    );
  }
}

// 删除回忆
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const userId = searchParams.get('userId');

    if (!id) {
      return NextResponse.json(
        { success: false, error: '缺少记忆ID' },
        { status: 400 }
      );
    }

    const memory = memoriesStore.get(id);
    if (!memory) {
      return NextResponse.json(
        { success: false, error: '记忆不存在' },
        { status: 404 }
      );
    }

    // 验证用户权限
    if (userId && memory.userId !== userId) {
      return NextResponse.json(
        { success: false, error: '无权删除此记忆' },
        { status: 403 }
      );
    }

    // 从存储中删除
    memoriesStore.delete(id);

    // 从用户索引中移除
    if (memory.userId) {
      const userMemoryIds = userMemoriesIndex.get(memory.userId) || [];
      const index = userMemoryIds.indexOf(id);
      if (index > -1) {
        userMemoryIds.splice(index, 1);
        userMemoriesIndex.set(memory.userId, userMemoryIds);
      }
    }

    return NextResponse.json({
      success: true,
      message: '记忆已删除',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '删除回忆失败' },
      { status: 500 }
    );
  }
}
