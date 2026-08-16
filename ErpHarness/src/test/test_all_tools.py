"""
MCP 工具全量测试。

测试模式：
  - mcp_client：通过 fastmcp.Client 内存模式直接测试 MCP 服务端（需 Java 后端运行）
  - agent_client：通过 MultiServerMCPClient 模拟 Agent，经 HTTP 获取工具并调用

运行方式：
  python -m test.test_all_tools
"""

import asyncio
import random
from datetime import date, datetime
from decimal import Decimal

from fastmcp import Client
from langchain_mcp_adapters.client import MultiServerMCPClient

from mcp_server.server_main import mcp

# ============================================================
# 随机测试数据生成
# ============================================================

SUPPLIER_NAMES = ["博世", "大陆", "德尔福", "电装", "爱信", "采埃孚", "法雷奥", "海拉"]
PART_NAMES = ["活塞", "制动片", "火花塞", "机油滤清器", "空气滤清器", "气缸盖", "曲轴", "凸轮轴"]
CATEGORIES = ["发动机类", "车架类", "电气类", "制动类", "传动类", "外观件"]


def _random_supplier_name() -> str:
    return random.choice(SUPPLIER_NAMES)


def _random_part_name() -> str:
    return random.choice(PART_NAMES)


def _random_category() -> str:
    return random.choice(CATEGORIES)


def _random_supplier_id() -> int:
    return random.randint(1, 50)


def _random_part_id() -> int:
    return random.randint(1, 200)


def _random_quantity() -> int:
    return random.randint(1, 500)


def _random_price() -> Decimal:
    return Decimal(str(round(random.uniform(10.0, 5000.0), 2)))


def _random_status() -> int:
    return random.randint(1, 5)


def _now_iso() -> str:
    """生成当前时间的 ISO 格式字符串：yyyy-MM-ddTHH:mm:ss.SSS"""
    now = datetime.now()
    return now.strftime("%Y-%m-%dT%H:%M:%S.") + f"{now.microsecond // 1000:03d}"


def _random_order_detail(num_items: int = 2) -> list:
    """生成随机订单明细列表（含 subtotal）"""
    items = []
    for i in range(num_items):
        quantity = _random_quantity()
        unit_price = float(_random_price())
        items.append({
            "partId": _random_part_id(),
            "quantity": quantity,
            "unitPrice": unit_price,
            "subtotal": round(quantity * unit_price, 2),
            "remark": f"测试明细-{i+1}",
        })
    return items


# ============================================================
# 1. mcp_client 测试（内存模式，直接调用 MCP 工具）
# ============================================================

async def test_mcp_supplier_query():
    """测试 supplier_query — 按名称模糊搜索供应商"""
    name = _random_supplier_name()
    print(f"\n{'='*60}")
    print(f"[mcp_client] 测试 supplier_query: name={name}")
    print(f"{'='*60}")

    async with Client(mcp) as client:
        result = await client.call_tool("supplier_query", {
            "params": {"name": name}
        })
        print(f"结果: {result}")
        return result


async def test_mcp_part_query():
    """测试 part_query — 分页查询零部件"""
    category = _random_category()
    print(f"\n{'='*60}")
    print(f"[mcp_client] 测试 part_query: current=1, size=5, category={category}")
    print(f"{'='*60}")

    async with Client(mcp) as client:
        result = await client.call_tool("part_query", {
            "params": {
                "current": 1,
                "size": 5,
                "category": category,
            }
        })
        print(f"结果: {result}")
        return result


async def test_mcp_part_search():
    """测试 part_search — 按名称搜索零部件"""
    name = _random_part_name()
    print(f"\n{'='*60}")
    print(f"[mcp_client] 测试 part_search: name={name}")
    print(f"{'='*60}")

    async with Client(mcp) as client:
        result = await client.call_tool("part_search", {"name": name})
        print(f"结果: {result}")
        return result


async def test_mcp_part_by_supplier():
    """测试 part_by_supplier — 按供应商 ID 查零部件"""
    supplier_id = _random_supplier_id()
    print(f"\n{'='*60}")
    print(f"[mcp_client] 测试 part_by_supplier: supplier_id={supplier_id}")
    print(f"{'='*60}")

    async with Client(mcp) as client:
        result = await client.call_tool("part_by_supplier", {
            "supplier_id": supplier_id
        })
        print(f"结果: {result}")
        return result


async def test_mcp_order_create():
    """测试 order_create — 创建采购订单"""
    order_detail = _random_order_detail(2)
    total_amount = sum(item["subtotal"] for item in order_detail)
    test_data = {
        "orderNumber": f"PO{datetime.now().strftime('%Y%m%d')}{str(random.randint(0, 999)).zfill(3)}",
        "orderTime": _now_iso(),
        "orderDetail": order_detail,
        "totalAmount": round(total_amount, 2),
        "status": _random_status(),
        "remark": "mcp_client 测试订单",
    }
    print(f"\n{'='*60}")
    print(f"[mcp_client] 测试 order_create")
    print(f"  请求体: {test_data}")
    print(f"{'='*60}")

    async with Client(mcp) as client:
        result = await client.call_tool("order_create", {
            "create_data": test_data
        })
        print(f"结果: {result}")
        return result


async def test_mcp_order_update():
    """测试 order_update — 更新采购订单（含无 orderDetail 的情况）"""
    order_id = random.randint(1, 100)

    # 场景1：带 orderDetail 的更新
    order_detail = _random_order_detail(1)
    test_data_with_detail = {
        "orderNumber": f"PO{datetime.now().strftime('%Y%m%d')}{str(random.randint(0, 999)).zfill(3)}",
        "orderTime": _now_iso(),
        "orderDetail": order_detail,
        "status": 3,
        "remark": "mcp_client 测试-更新订单(含明细)",
    }
    print(f"\n{'='*60}")
    print(f"[mcp_client] 测试 order_update (场景1: 含 orderDetail): order_id={order_id}")
    print(f"  请求体: {test_data_with_detail}")
    print(f"{'='*60}")

    async with Client(mcp) as client:
        result1 = await client.call_tool("order_update", {
            "order_id": order_id,
            "update_data": test_data_with_detail,
        })
        print(f"结果(含明细): {result1}")

        # 场景2：不带 orderDetail 的纯状态更新
        test_data_no_detail = {
            "orderNumber": f"PO{datetime.now().strftime('%Y%m%d')}{str(random.randint(0, 999)).zfill(3)}",
            "orderTime": _now_iso(),
            "status": 2,
            "remark": "mcp_client 测试-仅更新状态和备注",
        }
        print(f"\n[mcp_client] 测试 order_update (场景2: 无 orderDetail，仅更新状态): order_id={order_id}")
        print(f"  请求体: {test_data_no_detail}")
        result2 = await client.call_tool("order_update", {
            "order_id": order_id,
            "update_data": test_data_no_detail,
        })
        print(f"结果(无明细): {result2}")
        return result1


async def test_mcp_order_search_details():
    """测试 order_search_details — 搜索订单明细"""
    part_name = _random_part_name()
    print(f"\n{'='*60}")
    print(f"[mcp_client] 测试 order_search_details: partName={part_name}")
    print(f"{'='*60}")

    async with Client(mcp) as client:
        # 方式1：按零部件名称搜索
        result = await client.call_tool("order_search_details", {
            "params": {"partName": part_name}
        })
        print(f"结果(按名称): {result}")

        # 方式2：按日期范围搜索
        result2 = await client.call_tool("order_search_details", {
            "params": {
                "startDate": "2026-01-01",
                "endDate": "2026-05-06",
            }
        })
        print(f"结果(按日期): {result2}")
        return result


async def test_mcp_inventory_warning():
    """测试 inventory_warning — 查询库存预警列表（无参）"""
    print(f"\n{'='*60}")
    print(f"[mcp_client] 测试 inventory_warning (无参调用)")
    print(f"{'='*60}")

    async with Client(mcp) as client:
        result = await client.call_tool("inventory_warning", {})
        print(f"结果: {result}")
        return result


# ============================================================
# 2. agent_client 测试（HTTP 模式，模拟 Agent 调用）
# ============================================================

MCP_SERVER_CONFIG = {
    "erp": {
        "url": "http://127.0.0.1:8000/mcp",
        "transport": "streamable_http",
    }
}


async def test_agent_order_create():
    """
    模拟 Agent 通过 MultiServerMCPClient 获取 order_create 工具并调用。
    前提：MCP Server 已启动（python -m mcp_server.server_main）
    """
    print(f"\n{'='*60}")
    print(f"[agent_client] 模拟 Agent 测试 order_create")
    print(f"{'='*60}")

    client = MultiServerMCPClient(MCP_SERVER_CONFIG)

    try:
        # 获取所有工具
        all_tools = await client.get_tools(server_name="erp")
        print(f"[agent_client] 已加载 {len(all_tools)} 个 MCP 工具")

        # 筛选 order_create 工具
        order_tools = [t for t in all_tools if t.name == "order_create"]
        if not order_tools:
            print("[agent_client] 错误: 未找到 order_create 工具")
            return

        order_create_tool = order_tools[0]
        print(f"[agent_client] 获取到工具: {order_create_tool.name}")
        print(f"[agent_client] 工具描述: {order_create_tool.description}")

        # 构造测试数据
        order_detail = _random_order_detail(2)
        total_amount = sum(item["subtotal"] for item in order_detail)

        # 通过工具对象调用
        result = await order_create_tool.ainvoke({
            "create_data": {
                "orderNumber": f"PO{datetime.now().strftime('%Y%m%d')}{str(random.randint(0, 999)).zfill(3)}",
                "orderTime": _now_iso(),
                "orderDetail": order_detail,
                "totalAmount": round(total_amount, 2),
                "status": 1,
                "remark": "agent_client 模拟测试订单",
            }
        })
        print(f"[agent_client] 执行结果: {result}")
        return result

    finally:
        pass  # MultiServerMCPClient 没有显式 close 方法


async def test_agent_inventory_warning():
    """
    模拟 Agent 通过 MultiServerMCPClient 获取 inventory_warning 工具并调用（无参）。
    前提：MCP Server 已启动（python -m mcp_server.server_main）
    """
    print(f"\n{'='*60}")
    print(f"[agent_client] 模拟 Agent 测试 inventory_warning")
    print(f"{'='*60}")

    client = MultiServerMCPClient(MCP_SERVER_CONFIG)

    try:
        all_tools = await client.get_tools(server_name="erp")
        print(f"[agent_client] 已加载 {len(all_tools)} 个 MCP 工具")

        # 筛选 inventory_warning 工具
        inv_tools = [t for t in all_tools if t.name == "inventory_warning"]
        if not inv_tools:
            print("[agent_client] 错误: 未找到 inventory_warning 工具")
            return

        inv_tool = inv_tools[0]
        print(f"[agent_client] 获取到工具: {inv_tool.name}")
        print(f"[agent_client] 工具描述: {inv_tool.description}")

        # 无参调用
        result = await inv_tool.ainvoke({})
        print(f"[agent_client] 执行结果: {result}")
        return result

    finally:
        pass


# ============================================================
# 批量运行入口
# ============================================================

async def run_all_mcp_client_tests():
    """依次运行全部 8 个 mcp_client 测试"""
    tests = [
        ("supplier_query", test_mcp_supplier_query),
        ("part_query", test_mcp_part_query),
        ("part_search", test_mcp_part_search),
        ("part_by_supplier", test_mcp_part_by_supplier),
        ("order_create", test_mcp_order_create),
        ("order_update", test_mcp_order_update),
        ("order_search_details", test_mcp_order_search_details),
        ("inventory_warning", test_mcp_inventory_warning),
    ]

    results = {}
    for name, test_fn in tests:
        try:
            results[name] = await test_fn()
        except Exception as e:
            results[name] = f"失败: {e}"
            print(f"[ERROR] {name} 测试失败: {e}")

    print(f"\n{'='*60}")
    print("[汇总] mcp_client 测试完成")
    print(f"{'='*60}")
    for name, result in results.items():
        status = "失败" if isinstance(result, str) and result.startswith("失败") else "完成"
        print(f"  {name}: {status}")


async def run_all_agent_client_tests():
    """依次运行 agent_client 测试：order_create + inventory_warning"""
    results = {}
    for name, test_fn in [
        ("order_create", test_agent_order_create),
        ("inventory_warning", test_agent_inventory_warning),
    ]:
        try:
            results[name] = await test_fn()
        except Exception as e:
            results[name] = f"失败: {e}"
            print(f"[ERROR] agent_client {name} 测试失败: {e}")

    print(f"\n{'='*60}")
    print("[汇总] agent_client 测试完成")
    print(f"{'='*60}")
    for name, result in results.items():
        status = "失败" if isinstance(result, str) and result.startswith("失败") else "完成"
        print(f"  {name}: {status}")


if __name__ == "__main__":
    import sys

    # if len(sys.argv) > 1:
    #     mode = sys.argv[1]
    # else:
    mode = "agent"

    if mode == "mcp":
        print("运行全部 mcp_client 测试（内存模式）...")
        asyncio.run(run_all_mcp_client_tests())
    elif mode == "agent":
        print("运行 agent_client 测试（需 MCP Server 已启动在 127.0.0.1:8000）...")
        asyncio.run(run_all_agent_client_tests())
    elif mode == "all":
        print("=== 第一阶段：mcp_client 测试 ===\n")
        asyncio.run(run_all_mcp_client_tests())
        print("\n=== 第二阶段：agent_client 测试 ===\n")
        asyncio.run(run_all_agent_client_tests())
    else:
        print(f"未知模式: {mode}")
        print("用法: python -m test.test_all_tools [mcp|agent|all]")
