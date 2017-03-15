package com.ssm.tools;

import com.ssm.common.Constant;
import com.ssm.entity.Admin;
import org.springframework.stereotype.Component;

/**
 * Created by Zly on 2017/3/8.
 * @className:DateFormat
 * @description:表单输入验证
 * @author Zly
 * @
 */
@Component
public class DataFormat {
    /**
     * 登录验证
     * @param admin
     * @return
     */
    public static String adminLogin(Admin admin){
        String username = admin.getUsername();
        String password = admin.getPassword();
        if(null == username||null == password){
            return "username or password cannot be empty";
        }
        else if(0 == password.length()||0 == username.length()) {
            return "username or password cannot be empty";
        }
        else{
            return "";
        }
    }

    /**
     * 注册验证
     * @param admin
     * @return
     */
    public static String adminRegister(Admin admin){
        String username = admin.getUsername();
        String password = admin.getPassword();
        if(null == username||null == password){
            return "username or password cannot be empty";
        }
        else if(0 == password.length()||0 == username.length()) {
            return "username or password cannot be empty";
        }
        else{
            return "";
        }
    }
}
