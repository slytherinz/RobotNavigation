package com.ssm.tools;

import com.ssm.json.PointsIndex;

/**
 * Created by Zly on 2017/3/10.
 */
public class Compute {
    //计算两个坐标之间的距离
    public double distanceBetween(double p1x,double p1y,double p2x,double p2y){
        double distX = Math.abs(p1x-p2x);
        double distY = Math.abs(p1y-p2y);
        double angle = Math.atan(distX/distY);
        return distX/Math.sin(angle);
    }
    //地图缩放，计算对应X，Y
    public void changeXY(PointsIndex point){
        double scale = point.getScale();
        double realX = (point.getPageX()+point.getL())/scale;
        double realY = (point.getPageY()+point.getT())/scale;
        point.setPageX(String.valueOf(realX));
        point.setPageY(String.valueOf(realY));
    }
}
