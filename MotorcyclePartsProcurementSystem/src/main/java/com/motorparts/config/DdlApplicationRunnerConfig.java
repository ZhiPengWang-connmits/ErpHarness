package com.motorparts.config;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 * 配置类，用于解决ddlApplicationRunner的问题
 */
@Configuration
public class DdlApplicationRunnerConfig {

    /**
     * 注册一个ddlApplicationRunner bean，以避免Spring Boot启动时的错误
     */
    @Bean(name = "ddlApplicationRunner")
    @Primary
    public ApplicationRunner ddlApplicationRunner() {
        return args -> {
            // 空实现，只是为了避免Spring Boot启动时的错误
        };
    }
}
