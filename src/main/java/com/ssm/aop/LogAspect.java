package com.ssm.aop;

import com.ssm.entity.Log;
import com.ssm.entity.NavPoint;
import com.ssm.service.LogService;
import com.ssm.service.NavPointService;
import org.aspectj.lang.JoinPoint;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

/**
 * Created by Zly on 2017/3/15.
 */
@Aspect
public class LogAspect {
    @Autowired
    private LogService logService;
    @Autowired
    private NavPointService navPointService;
    /**
     * 删除坐标点业务逻辑方法切入点
     */
    @Pointcut("execution( * com.ssm.service.NavPointService.deletePointById(..))")
    public void deletePointCall(){}

    @Around(value = "deletePointCall()")
    public void deletePointCallCalls(ProceedingJoinPoint pjp)throws Throwable{
        Object result = null;
        Integer id = (Integer)pjp.getArgs()[0];
        NavPoint point = null;
        if(id != null){
            point = navPointService.getPointById(id);
        }
        result = pjp.proceed();
        if(point != null){
            //创建日志
            Log log = new Log();
            log.setUserid(logService.loginAdminId());
            log.setCreateDate(new Date());
            StringBuffer msg = new StringBuffer("坐标点：");
            msg.append(String.valueOf(point.getX()));
            msg.append(",");
            msg.append(String.valueOf(point.getY()));
            log.setContent(msg.toString());
            log.setOperation("删除");
            //添加日志
            logService.log(log);
        }
    }
}
