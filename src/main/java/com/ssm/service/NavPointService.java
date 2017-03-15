package com.ssm.service;

import com.ssm.entity.NavPoint;
import com.ssm.json.PointsIndex;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Zly on 2017/3/10.
 */
@Service
public interface NavPointService {
    //创建点
    void establishPoints(PointsIndex point);
    //查找点
    List<NavPoint> getAllPoints();
    //判断点是否存在
    boolean isPointExist(PointsIndex point);
    //删除点
    boolean deletePointById(int id);
    //查找点
    NavPoint getPointById(int id);
}
