package com.ssm.entity;

import org.apache.ibatis.type.Alias;

/**
 * Created by Zly on 2017/3/10.
 */
@Alias("navroutine")
public class NavRoutine {
    private int id;
    private int pid;
    private int nid;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public int getNid() {
        return nid;
    }

    public void setNid(int nid) {
        this.nid = nid;
    }
}
