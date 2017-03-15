package com.ssm.json;

/**
 * Created by Zly on 2017/3/11.
 */
public class LineIndex {
    private int start;
    private int end;

    public int getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = Integer.valueOf(start);
    }

    public int getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = Integer.valueOf(end);
    }
}
