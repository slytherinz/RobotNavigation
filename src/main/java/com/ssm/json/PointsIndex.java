package com.ssm.json;

/**
 * Created by Zly on 2017/3/10.
 */
public class PointsIndex {
    //S,L,T,X,Y，U，C,D，rel
    private double scale;
    private double L;
    private double T;
    private double pageX;
    private double pageY;
    //摄像机
    private char C;
    //方向
    private char D;
    //升降
    private char U;
    private int id;

    public double getScale() {
        return scale;
    }

    public void setScale(String scale) {
        this.scale = Double.valueOf(scale);
    }

    public double getL() {
        return L;
    }

    public void setL(String l) {
        L = Double.valueOf(l);
    }

    public double getT() {
        return T;
    }

    public void setT(String t) {
        T = Double.valueOf(t);
    }

    public double getPageX() {
        return pageX;
    }

    public void setPageX(String pageX) {
        this.pageX = Double.valueOf(pageX);
    }

    public double getPageY() {
        return pageY;
    }

    public void setPageY(String pageY) {
        this.pageY = Double.valueOf(pageY);
    }

    public char getC() {
        return C;
    }

    public void setC(String c) {
        C = c.charAt(0);
    }

    public char getD() {
        return D;
    }

    public void setD(String d) {
        D = d.charAt(0);
    }

    public char getU() {
        return U;
    }

    public void setU(String u) {
        U = u.charAt(0);
    }

    public int getId() {
        return id;
    }

    public void setId(String id) {
        this.id = Integer.valueOf(id);
    }
}
