package com.ssm.service.impl;

import com.ssm.common.GraphArray;
import com.ssm.dao.NavMapDao;
import com.ssm.dao.NavPointDao;
import com.ssm.dao.NavRoutineDao;
import com.ssm.entity.NavMap;
import com.ssm.entity.NavPoint;
import com.ssm.json.LineIndex;
import com.ssm.service.NavMapService;
import com.ssm.tools.Compute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by Zly on 2017/3/10.
 */
@Service
public class NavMapServiceImpl implements NavMapService{
    @Autowired
    private NavMapDao navMapDao;
    @Autowired
    private NavPointDao navPointDao;
    @Autowired
    private NavRoutineDao navRoutineDao;
    private Compute compute;

    /**
     * 保存边，创建地图
     * @param lineIndex
     */
    public boolean createMap(LineIndex[] lineIndex){
        boolean iscreateSuccess = false;
        compute = new Compute();
        for(int i=0;i<lineIndex.length;i++){
            LineIndex line = lineIndex[i];
            if(line.getStart() != line.getEnd()&&!isEdgeExist(line)) {
                NavPoint navPointPre = navPointDao.selectPointById(line.getStart());
                NavPoint navPointNext = navPointDao.selectPointById(line.getEnd());

                NavMap edge = new NavMap();
                edge.setSsid(navPointPre.getId());
                edge.setSx(navPointPre.getX());
                edge.setSy(navPointPre.getY());
                edge.setEid(navPointNext.getId());
                edge.setEx(navPointNext.getX());
                edge.setEy(navPointNext.getY());
                double dist = compute.distanceBetween(navPointPre.getX(), navPointPre.getY(), navPointNext.getX(), navPointNext.getY());
                edge.setDist(dist);
                try {
                    navMapDao.insertIntoEdge(edge);
                    iscreateSuccess = true;
                }catch (Exception e) {
                    iscreateSuccess = false;
                }
            }
        }
        return iscreateSuccess;
    }

    /**
     * 判断边是否存在
     * @param line
     * @return
     */
    public boolean isEdgeExist(LineIndex line){
        boolean isedgeExist = false;
        int startid = line.getStart();
        int endid = line.getEnd();
        NavMap edge1 = navMapDao.findEdge(startid,endid);
        NavMap edge2 = navMapDao.findEdge(endid,startid);
        if(edge1 != null|| edge2 != null){
            isedgeExist = true;
        }
        return isedgeExist;
    }
    /**
     * 获得地图
     * @return
     */
    public List<LineIndex> showMap(){
        List<LineIndex> edges = new ArrayList<LineIndex>();
        List<NavMap> map = navMapDao.getNavMap();
        for(int i= 0;i<map.size();i++){
            NavMap startend = map.get(i);
            LineIndex edge = new LineIndex();
            edge.setStart(String.valueOf(startend.getSsid()));
            edge.setEnd(String.valueOf(startend.getEid()));
            edges.add(edge);
        }
        return edges;
    }

    /**
     * 删除边
     * @param deletePoint
     * @return
     */
    public boolean deleteEdgeById(NavPoint deletePoint){
        int pointId = deletePoint.getId();
        boolean deletesuccess = false;
        try {
            navMapDao.deleteEdgeById(pointId);
            deletesuccess = true;
        }catch (Exception e){

        }
        return  deletesuccess;
    }

    /**
     * 获取路径
     * @param routePointList
     * @return
     */
    public List<Integer> getRoute(int[] routePointList){
        List<Integer> routeList ;
        //获取所有点
        List<NavPoint> allPoints = navPointDao.selectAllPoints();
        //获取所有边
        List<NavMap> allEdges = navMapDao.getNavMap();
        GraphArray graph = new GraphArray(allPoints.size());
        graph.creatGraph();
        for(int i=0;i<allEdges.size();i++){
            NavMap edge = allEdges.get(i);
            graph.insertEdge(edge.getSsid(),edge.getEid(),edge.getDist());
            graph.insertEdge(edge.getEid(),edge.getSsid(),edge.getDist());
        }
        //获得第一个起点
        int startId = routePointList[0];
        int endId = routePointList[1];
        int sumppointIndex = 0;
        List<Integer> pathIdList = new LinkedList<Integer>();
        if(routePointList.length>2){
            for(int i = 2;i<routePointList.length;i++){
                routePointList[i-1] = routePointList[i];
            }
            routePointList[routePointList.length-1] = endId;
        }
        for(int i=1;i<routePointList.length;i++){
            endId = routePointList[i];
            routeList = graph.getShortestPath(startId,endId);
            int eachNum = routeList.size();
            for(int j = eachNum-1; j >= 0; j--){
                pathIdList.add(eachNum-(j+1)+sumppointIndex,routeList.get(j));
            }
            startId = endId;
            sumppointIndex += eachNum-1;
        }
        return pathIdList;
    }

    /**
     * 保存路径
     * @param routePoints
     * @return
     */
    public boolean savePath(LineIndex[] routePoints){
        boolean isSave = false;
        try {
            navRoutineDao.insertRoutePoint(routePoints);
            isSave = true;
        }catch (Exception e){

        }
        return isSave;
    }
}
