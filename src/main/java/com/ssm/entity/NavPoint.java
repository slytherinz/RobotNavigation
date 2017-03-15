package com.ssm.entity;

import org.apache.ibatis.type.Alias;

/**
 * Created by Zly on 2017/3/10.
 */
@Alias("navpoint")
public class NavPoint {
    private int id;
    private double x;
    private double y;
    private char lift;
    private char direction;
    private char remain;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public char getLift() {
        return lift;
    }

    public void setLift(char lift) {
        this.lift = lift;
    }

    public char getDirection() {
        return direction;
    }

    public void setDirection(char direction) {
        this.direction = direction;
    }

    public char getRemain() {
        return remain;
    }

    public void setRemain(char remain) {
        this.remain = remain;
    }
}
