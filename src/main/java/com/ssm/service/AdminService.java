package com.ssm.service;

import com.ssm.entity.Admin;

/**
 * Created by Zly on 2017/3/8.
 */
public interface AdminService {
    public Admin checkLogin(Admin admin);
    public int registerAdmin(Admin admin);
    public boolean isExist(String username);
    public String setPassword(String oldPassword,String newPassword,int adminId);
}
