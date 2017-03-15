package com.ssm.entity;

import org.apache.ibatis.type.Alias;

/**
 * Created by Zly on 2017/3/10.
 */
@Alias("navmap")
public class NavMap {
    private int id;
    private int ssid; //起点id
    private double sx; //起点x
    private double sy; //起点y
    private int eid; //终点id
    private double ex; //终点x
    private double ey; //终点y
    private double dist; //两点间的距离

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSsid() {
        return ssid;
    }

    public void setSsid(int ssid) {
        this.ssid = ssid;
    }

    public double getSx() {
        return sx;
    }

    public void setSx(double sx) {
        this.sx = sx;
    }

    public double getSy() {
        return sy;
    }

    public void setSy(double sy) {
        this.sy = sy;
    }

    public int getEid() {
        return eid;
    }

    public void setEid(int eid) {
        this.eid = eid;
    }

    public double getEx() {
        return ex;
    }

    public void setEx(double ex) {
        this.ex = ex;
    }

    public double getEy() {
        return ey;
    }

    public void setEy(double ey) {
        this.ey = ey;
    }

    public double getDist() {
        return dist;
    }

    public void setDist(double dist) {
        this.dist = dist;
    }
}
