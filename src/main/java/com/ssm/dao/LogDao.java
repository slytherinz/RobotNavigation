package com.ssm.dao;

import com.ssm.entity.Log;
import org.springframework.stereotype.Repository;

/**
 * Created by Zly on 2017/3/15.
 * 日志记录
 */
@Repository
public interface LogDao {
    //添加日志记录
    void insertLog(Log log);
}
