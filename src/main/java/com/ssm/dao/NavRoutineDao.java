package com.ssm.dao;

import com.ssm.json.LineIndex;
import org.springframework.stereotype.Repository;

/**
 * Created by Zly on 2017/3/15.
 */
@Repository
public interface NavRoutineDao {
    void insertRoutePoint(LineIndex[] points);
}
