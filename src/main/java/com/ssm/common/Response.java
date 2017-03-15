package com.ssm.common;

/**
 * Created by Zly on 2017/3/6.
 */
public class Response {
    private int status;
    private String msg;
    private Object object;

    public Response() {
    }

    public Response(int status,String msg,Object object ) {
        this.status = status;
        this.msg = msg;
        this.object = object;
    }

    public Response(int status) {
        this.status = status;
    }

    public Response(int status,Object object) {
        this.object = object;
        this.status = status;
    }

    public Response(int status, String msg) {
        this.status = status;
        this.msg = msg;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String errmsg) {
        this.msg = errmsg;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }
}
