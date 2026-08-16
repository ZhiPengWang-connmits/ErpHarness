package com.motorparts;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * 摩托车零部件采购管理系统 - 主启动类
 *
 * @author System
 * @version 1.0.0
 */
@SpringBootApplication
@MapperScan("com.motorparts.mapper")
@ComponentScan(basePackages = "com.motorparts")
@EnableTransactionManagement
public class MotorpartsApplication {

    public static void main(String[] args) {
        SpringApplication.run(MotorpartsApplication.class, args);
        System.out.println("==========================================");
        System.out.println("摩托车零部件采购管理系统启动成功！");
        System.out.println("系统访问地址: http://localhost:8080");
        System.out.println("API文档地址: http://localhost:8080/swagger-ui.html");
        System.out.println("==========================================");
    }
}