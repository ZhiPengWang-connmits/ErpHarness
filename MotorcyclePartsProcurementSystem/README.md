# 摩托车零部件采购管理系统

## 项目介绍

这是一个基于SpringBoot的摩托车零部件采购管理系统，用于管理供应商、产品/零部件、采购订单、库存、客户和物流等业务。

### 主要功能

- **供应商管理**：管理供应商信息，包括信用评级、合作状态等
- **产品管理**：管理摩托车零部件信息，包括分类、采购价格等
- **采购订单**：管理采购订单的全流程，包括创建、审核、入库等
- **库存管理**：管理库存，包括入库、出库、预警等功能
- **客户管理**：管理客户信息，包括客户类型、折扣等级等
- **物流管理**：管理物流信息，跟踪货物运输状态
- **统计分析**：提供采购统计、库存预警等分析报表

## 技术栈

| 技术 | 版本 |
|------|------|
| Spring Boot | 2.7.18 |
| MyBatis Plus | 3.5.6 |
| MySQL | 8.0 |
| Lombok | 1.18.x |
| Swagger/OpenAPI | 1.7.0 |
| Hutool | 5.8.25 |

## 快速开始

### 环境要求

- JDK 1.8+
- MySQL 8.0+
- Maven 3.6+

### 数据库配置

1. 创建数据库（系统会自动创建，也可以手动创建）：

```sql
CREATE DATABASE motorparts_db CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
```

2. 修改配置文件 `src/main/resources/application.yml` 中的数据库连接信息：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/motorparts_db?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
    username: root
    password: 123456
```

### 构建项目

```bash
# 克隆项目
git clone <repository-url>

# 进入项目目录
cd MotorcyclePartsProcurementSystem

# 编译项目
mvn clean compile

# 运行项目
mvn spring-boot:run
```

### 访问地址

- **系统首页**：http://localhost:8080
- **API文档**：http://localhost:8080/swagger-ui.html

## 项目结构

```
src/main/java/com/motorparts/
├── MotorpartsApplication.java          # 启动类
├── config/                              # 配置类
│   ├── MyBatisPlusConfig.java
│   ├── WebMvcConfig.java
│   └── SwaggerConfig.java
├── controller/                          # 控制器层
│   ├── SupplierController.java
│   ├── PartController.java
│   ├── PurchaseOrderController.java
│   ├── InventoryController.java
│   ├── CustomerController.java
│   ├── LogisticsController.java
│   └── StatisticsController.java
├── service/                              # 服务层
│   ├── SupplierService.java
│   ├── PartService.java
│   ├── PurchaseOrderService.java
│   ├── InventoryService.java
│   ├── CustomerService.java
│   ├── LogisticsService.java
│   └── impl/                             # 实现类
├── mapper/                               # Mapper接口
├── entity/                               # 实体类
├── dto/                                  # 数据传输对象
├── common/                               # 通用类
│   ├── Result.java
│   ├── PageResult.java
│   ├── enums/
│   └── exception/
└── init/                                 # 数据初始化
    └── DatabaseInitializer.java
```

## 数据初始化

项目启动时会自动执行数据初始化，包括：

- 创建数据库表结构
- 插入模拟数据（约30个供应商、60个产品、120个订单等）

### 初始化配置

在 `application.yml` 中配置：

```yaml
motorparts:
  init:
    enabled: true          # 是否启用数据初始化
    insert-sample-data: true  # 是否插入模拟数据
```

### 模拟数据说明

- **供应商**：30条，包含Bosch、DENSO、Brembo等知名品牌
- **产品**：60条，包含发动机类、车架类、电气类等分类
- **采购订单**：120条，时间范围2024年至今
- **客户**：40条，包含经销商、零售店、个人用户
- **用户**：12条，包含管理员、采购员、仓管员、销售员
- **库存**：60条，与产品一一对应
- **物流**：80-100条，与已发货订单关联

## API接口测试

### 使用Swagger UI测试

1. 启动项目后访问：http://localhost:8080/swagger-ui.html
2. 在页面上可以看到所有API接口
3. 点击任意接口可以查看详情和测试

### 使用Postman测试

1. 导入API文档或手动添加接口
2. 基础URL：`http://localhost:8080/api`
3. 示例请求：

**创建供应商**
```http
POST http://localhost:8080/api/suppliers
Content-Type: application/json

{
  "supplierCode": "SUP00031",
  "name": "测试供应商",
  "contactPerson": "张三",
  "phone": "13800138000",
  "email": "test@example.com",
  "address": "上海市某区某路1号",
  "creditRating": "A",
  "status": 1
}
```

**分页查询**
```http
GET http://localhost:8080/api/suppliers?current=1&size=10
```

## 数据库设计

### 表结构

| 表名 | 说明 | 关联关系 |
|------|------|----------|
| supplier | 供应商表 | - |
| part | 产品/零部件表 | supplier_id -> supplier |
| purchase_order | 采购订单表 | supplier_id -> supplier, created_by -> user |
| order_detail | 订单明细表 | order_id -> purchase_order, part_id -> part |
| inventory | 库存表 | part_id -> part |
| customer | 客户表 | - |
| user | 用户表 | - |
| logistics | 物流表 | order_id -> purchase_order |

### 主要字段

- 所有表都包含 `deleted`（逻辑删除）、`create_time`、`update_time` 字段
- 金额字段使用 DECIMAL 类型确保精度
- 时间字段使用 DATETIME 类型

## 注意事项

1. **首次运行**：首次运行时会自动创建表结构和插入模拟数据
2. **重新初始化**：如果需要重新插入数据，可以先删除数据库中的数据，或设置 `motorparts.init.recreate-tables: true`
3. **API测试**：建议使用Swagger UI进行API测试
4. **密码说明**：用户密码已加密存储，默认密码为 `admin123`

## 默认用户

| 用户名 | 密码 | 角色 | 部门 |
|--------|------|------|------|
| admin | admin123 | 管理员 | 财务部 |
| user1 | admin123 | 采购员 | 采购部 |
| user2 | admin123 | 仓管员 | 仓储部 |
| user3 | admin123 | 销售员 | 销售部 |

## 文档

- [API接口文档](docs/API_DOCUMENTATION.md)
- [数据库表结构](docs/database_schema.sql)
- [数据来源说明](docs/数据来源说明.txt)

## 许可证

本项目仅供学习和参考使用。

## 联系方式

如有问题，请联系项目维护者。