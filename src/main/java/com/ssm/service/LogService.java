package com.ssm.service;

import com.ssm.entity.Log;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Zly on 2017/3/15.
 * 日志记录业务逻辑接口
 */
@Service
public interface LogService {
    /**
     * 日志记录
     * @param log
     */
    @Transactional
    void log(Log log);

    /**
     * 获取登陆者Id
     * @return
     */
    int loginAdminId();
}
