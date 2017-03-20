package com.ssm.service.impl;

import com.ssm.common.Status;
import com.ssm.dao.AdminDao;
import com.ssm.entity.Admin;
import com.ssm.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Zly on 2017/3/8.
 */
@Service
public class AdminServiceImpl implements AdminService{
    @Autowired
    private AdminDao adminDao;

    /**
     * 登录查找
     * @param admin
     * @return
     */
    public Admin checkLogin(Admin admin){
        String username = admin.getUsername();
        //需加入MD5加密
        String password = admin.getPassword();
        Admin admincheck = adminDao.findByUsernameAndPassword(username,password);
        return admincheck;
    }

    /**
     * 用户注册
     * @param admin
     * @return
     */
    public int registerAdmin(Admin admin){
        try {
            adminDao.saveAdmin(admin);
            return Status.SUCCESS;
        }catch (Exception e){
            return Status.ERROR;
        }
    }

    /**
     * 判断用户是否存在
     * @param username
     * @return
     */
    public boolean isExist(String username){
        Admin admin = adminDao.findByUsername(username);
        if(null == admin){
            return false;
        }
        else{
            return true;
        }
    }

    /**
     * 修改密码
     * @param oldPassword
     * @param newPassword
     * @param id
     * @return
     */
    public String setPassword(String oldPassword,String newPassword,int id){
        Admin admin = adminDao.findById(id);
        if(null == newPassword){
            return "password cannot be empty";
        }
        if(!admin.getPassword().equals(oldPassword)){
            return "oldpassword is wrong";
        }
        admin.setPassword(newPassword);
        try {
            adminDao.setPassword(admin);
            return "success";
        }catch (Exception e){
            return "error";
        }

    }
}
