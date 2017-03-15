package com.ssm.controller;

import com.ssm.common.Response;
import com.ssm.common.Status;
import com.ssm.entity.Admin;
import com.ssm.service.AdminService;
import com.ssm.tools.DataFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Zly on 2017/3/8.
 */
@Controller
public class AdminController {
    @Resource
    private AdminService adminService;
    //登录页面
    String loginPage = "/0index.html";

    /**
     * 登录
     * @param admin
     * @param session
     * @return
     */
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Response login(@RequestBody Admin admin, HttpSession session){
        String msg;
        //表单输入是否合法
        String formatError = DataFormat.adminLogin(admin);
        if(formatError.length()!=0){
            return new Response(Status.ERROR,formatError);
        }
        admin = adminService.checkLogin(admin);
        if(admin != null){
            session.setAttribute("admin",admin);
            return new Response(Status.SUCCESS);
        }
        else{
            msg = "The username is not exist or password is error";
            return new Response(Status.ERROR,msg);
        }
    }

    /**
     * 用户修改密码
     * @param oldPassword
     * @param newPassword
     * @param session
     * @return
     */
    @RequestMapping(value = "/psw",method = RequestMethod.PATCH)
    @ResponseBody
    public Response setpsw(@RequestParam String oldPassword,@RequestParam String newPassword,HttpSession session){
        //获得当前登录用户
        Admin admin = (Admin) session.getAttribute("admin");
        String msg = adminService.setPassword(oldPassword,newPassword,admin.getId());
        if(msg.equals("success")){
            return new Response(Status.SUCCESS);
        }
        else
            return new Response(Status.ERROR,msg);
    }

    /**
     * 获得当前登录用户的信息
     * @param session
     * @return
     */
    @RequestMapping(value = "/admin")
    @ResponseBody
    public Response adminInfo(HttpSession session){
        Admin admin = (Admin) session.getAttribute("admin");
        Map<String,Object> body = new HashMap<String, Object>();
        if(null != admin){
            admin.setPassword(null);
            body.put("admin",admin);
            return new Response(Status.SUCCESS,body);
        }
        else
            return  new Response(Status.ERROR);
    }
}
