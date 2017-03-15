package com.ssm.controller;

import com.ssm.common.Response;
import com.ssm.common.Status;
import com.ssm.entity.NavMap;
import com.ssm.entity.NavPoint;
import com.ssm.json.*;
import com.ssm.service.NavMapService;
import com.ssm.service.NavPointService;
import org.apache.ibatis.type.Alias;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Zly on 2017/3/9.
 */
@Controller
public class MapController {
    @Resource
    private NavPointService navPointService;
    @Resource
    private NavMapService navMapService;
    /**
     * 获得坐标点
     * @param pointsIndexList
     * @return
     */
    @RequestMapping(value = "/uploadPointsData" ,method = RequestMethod.POST)
    @ResponseBody
    public void uploadPoints(@RequestBody PointsIndex[] pointsIndexList){
        PointsIndex[] pointsData =  pointsIndexList;
        try {
            for(int i=0;i<pointsData.length;i++){
               PointsIndex point =  pointsData[i];
               //如果放缩尺度为空，则此点为空
               if(point.getScale() != 0.0) {
                   //如果此点不存在，则创建此点
                   if(!navPointService.isPointExist(point)) {
                       navPointService.establishPoints(point);
                   }
               }
               else{
                   //删除此点及与此点的连线

               }
            }
        }catch(Exception e){
            String msg = "点保存失败";
           // return new Response(Status.ERROR,msg);
        }
        String msg = "点保存成功";
       // return new Response(Status.SUCCESS,msg);

    }

    /**
     * 获取边，创建地图
     * @param lineIndexList
     * @return
     */
    @RequestMapping(value = "/uploadLineData" ,method = RequestMethod.POST)
    @ResponseBody
    public void createMap(@RequestBody LineIndex[] lineIndexList){
        LineIndex[] lineData =  lineIndexList;
        boolean success = navMapService.createMap(lineData);
        if(success == false) {
            String msg = "地图保存失败";
            //   return new Response(Status.ERROR,msg);
        }
        else {
            String msg = "地图保存成功";
            //  return new Response(Status.SUCCESS,msg);
        }
    }
    /**
     * 显示地图
     * @return
     */
    @RequestMapping(value = "/showMap",method = RequestMethod.GET)
    @ResponseBody
    public Response showMap(){
       List<LineIndex> map =  navMapService.showMap();
       List<NavPoint> pointsIndex = navPointService.getAllPoints();
       Map<String,Object> body = new HashMap<String,Object>();
       if(map != null) {
           body.put("lineData", map);
           body.put("pointsData",pointsIndex);
           return new Response(Status.SUCCESS, body);
       }
       String msg = "地图不存在";
       return new Response(Status.ERROR,msg);
    }

    /**
     * 删除坐标点
     * @param id
     * @return
     */
    @RequestMapping(value = "/deletePoint/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Response deletePoint(@PathVariable int id){

        NavPoint deletePoint = navPointService.getPointById(id);
        //删除边
        boolean isDeleteEdge = navMapService.deleteEdgeById(deletePoint);
        if(isDeleteEdge == true) {
            //删除坐标点
            boolean isDeletePoint = navPointService.deletePointById(id);
            if(isDeletePoint == true) {
                String msg = "删除成功";
                return new Response(Status.SUCCESS, msg);
            }
            else{
                String msg = "坐标点删除失败";
                return new Response(Status.ERROR,msg);
            }
        }
        String msg = "边删除失败";
        return new Response(Status.ERROR,msg);
    }

    /**
     * 生成路径
     * @param routePointList
     * @return
     */
    @RequestMapping(value = "/generatepath" ,method = RequestMethod.POST)
    @ResponseBody
    public Response generatePath(@RequestBody int[] routePointList){
        Map<String,Object> body = new HashMap<String,Object>();
        List<Integer> routine =  navMapService.getRoute(routePointList);
        if(routine.size() != 0 ){

            body.put("routine",routine);
            return new Response(Status.SUCCESS,body);
        }
        String msg = "获取路径为空";
        return new Response(Status.ERROR,msg);
    }

    /**
     * 保存当前路径
     * @param routePointList
     * @return
     */
    @RequestMapping(value = "/savePath" ,method = RequestMethod.POST)
    @ResponseBody
    public Response savePath(@RequestBody LineIndex[] routePointList){
        if(navMapService.savePath(routePointList)){
            return new Response(Status.SUCCESS);
        }
        else{
            String msg = "保存路径失败";
            return new Response(Status.ERROR,msg);
        }
    }
}

