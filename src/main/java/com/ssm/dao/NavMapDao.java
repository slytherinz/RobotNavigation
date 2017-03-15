package com.ssm.dao;

import com.ssm.entity.NavMap;
import com.ssm.entity.NavPoint;
import com.ssm.json.LineIndex;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Zly on 2017/3/10.
 */
@Repository
public interface NavMapDao {
    //获得所有边，为一张地图
    List<NavMap> getNavMap();
    //插入边
    void insertIntoEdge(NavMap edge);
    //查找边
    NavMap findEdge(@Param("ssid")int ssid,@Param("eid")int eid);
    //删除边
    void deleteEdgeById(int id);
}
