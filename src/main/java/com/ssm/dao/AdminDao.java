package com.ssm.dao;

import com.ssm.entity.Admin;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by Zly on 2017/3/8.
 */
@Repository
public interface AdminDao {
    //根据用户名和密码查找用户
    public Admin findByUsernameAndPassword(@Param("username")String username, @Param("password")String password);
    //根据用户名查询用户
    public Admin findByUsername(String username);
    public Admin findById(int id);
    //新增用户
    public void saveAdmin(Admin admin);
    //修改密码
    public void setPassword(String password,int id);
}
