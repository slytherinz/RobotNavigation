package com.ssm.dao;

import com.ssm.entity.NavPoint;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Zly on 2017/3/10.
 */
@Repository
public interface NavPointDao {
    void insertIntoPoint(NavPoint point);
    NavPoint selectPointById(int id);
    List<NavPoint> selectAllPoints();
    void deletePointById(int id);
}
