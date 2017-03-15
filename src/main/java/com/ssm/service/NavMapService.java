package com.ssm.service;

import com.ssm.entity.NavMap;
import com.ssm.entity.NavPoint;
import com.ssm.json.LineIndex;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Zly on 2017/3/10.
 */
@Service
public interface NavMapService {
    boolean createMap(LineIndex[] navPoints);
    List<LineIndex> showMap();
    boolean deleteEdgeById(NavPoint deletePoint);
    List<Integer> getRoute(int[] routePointList);
    boolean savePath(LineIndex[] routePoints);
}
