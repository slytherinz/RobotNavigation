package com.ssm.service.impl;

import com.ssm.dao.NavPointDao;
import com.ssm.entity.NavMap;
import com.ssm.entity.NavPoint;
import com.ssm.json.PointsIndex;
import com.ssm.service.NavMapService;
import com.ssm.service.NavPointService;
import com.ssm.tools.Compute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

/**
 * Created by Zly on 2017/3/10.
 */
@Service
public class NavPointServiceImpl implements NavPointService {
    @Autowired
    private NavPointDao navPointDao;

    /**
     * 保存点
     * @param point
     */
    public void establishPoints(PointsIndex point){
        NavPoint navPoint = new NavPoint();
        Compute compute = new Compute();
        //换算x,y对应的真实坐标点位置
        compute.changeXY(point);
        //对应id,x,y
        navPoint.setId(point.getId());
        navPoint.setX(point.getPageX());
        navPoint.setY(point.getPageY());
        navPoint.setDirection(point.getD());
        navPoint.setLift(point.getU());
        navPoint.setRemain(point.getC());

        navPointDao.insertIntoPoint(navPoint);
    }

    /**
     *
     * @return
     */
    public List<NavPoint> getAllPoints(){
        return navPointDao.selectAllPoints();
    }

    /**
     * 判断此点是否存在
     * @param point
     * @return
     */
    public boolean isPointExist(PointsIndex point){
        boolean exist = false;
        NavPoint navpoint = navPointDao.selectPointById(point.getId());

        if(navpoint != null){
            exist = true;
        }
        return exist;
    }

    /**
     * 删除点
     * @param id
     * @return
     */
    public boolean deletePointById(int id){
        boolean isdeleteSuccess = false;
        try {
            navPointDao.deletePointById(id);
            isdeleteSuccess = true;
        }catch (Exception e){
        }
        return isdeleteSuccess;
    }

    /**
     * 查找点
     * @param id
     * @return
     */
    public NavPoint getPointById(int id){
       return navPointDao.selectPointById(id);
    }
}
