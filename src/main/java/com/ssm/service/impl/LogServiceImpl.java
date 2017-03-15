package com.ssm.service.impl;

import com.ssm.dao.LogDao;
import com.ssm.entity.Log;
import com.ssm.service.AdminService;
import com.ssm.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.support.SecurityContextProvider;
import org.springframework.stereotype.Service;

/**
 * Created by Zly on 2017/3/15.
 */
@Service
public class LogServiceImpl implements LogService{
    @Autowired
    private AdminService adminService;
    @Autowired
    private LogDao logDao;

    public void log(Log log){
        logDao.insertLog(log);
    }

    /**
     * 获取登录者Id
     * @return
     */
    public int loginAdminId(){
        return 1;
    }
}
