  $(document).ready(function(){



	             var markerNum=0;
               var tArray = new Array();//二维数组，10列为S,L,T,X,Y，U，C,D，rel  4后3个为配置文件，分别为升降，相机，方向,停留
               var xxx=1;
               var mouse_num;//鼠标左键还是右键
               var marker_choose=0;//0表示目前没有选中的，1表示选中了一个
               var nowMarker_rel; // 被选中的marker的rel
               var preMarker_rel; // 之前被选中的marker的rel
               var connectNum=0;
               var cArray = new Array(); //二维数组，两列，第一列存放第一个点，第二个点存放第二个点，表示连线关系
               var temp_x1,temp_y1,temp_x2,temp_y2;//存储临时的关联两点的位置
               var x3,y3;
               var curNum;
               var docuPage=0;  //0时为地图创建模块，1为路径规划，2为手自动创建。
               var  rArray = new Array();//路径规划中的路径点数组，第一个为起点，第二个为终点，后面为中间点
              var routineNum=3;//系统默认存储了3条路径
                var flag_deletePoint=0;//允许删点
                var mapNum=1;
                var tempData1=[],tempData2=[];

                //路径规划的数据

                 
/*                  $("#importIn").click(function(e) {
                                $.each(loadData, function(i, row){
                                          createMark(row);
                                          $(".floatWindow").css("visibility","hidden");

                                        });
                              
                               $(".mapcontain").unbind('mouseup', setPoint());  //移出打点功能
                                $(".mapcontain").unbind('mousewheel'); 
                                });*/
                   var loadData=
                   [
                  // {id:0,L:0,T:0,pageX:30,pageY:60,U:1,C:2,D:2},
                  // {id:1,L:0,T:0,pageX:100,pageY:80,U:1,C:2,D:2},
                  // {id:2,L:0,T:0,pageX:150,pageY:100,U:1,C:0,D:2,W:3},
                  // {id:3,L:0,T:0,pageX:400,pageY:600,U:0,C:1,D:3,W:0},
                  // {id:4,L:0,T:0,pageX:600,pageY:300,U:1,C:0,D:1,W:1},
                  // {id:5,L:0,T:0,pageX:700,pageY:500,U:1,C:1,D:2,W:0}
                   ];
                   var  loadLine=
                  [
                  // [0,1],[2,3],[0,3],[2,5],[3,4]
                   ];

                  //生成路径时服务器传回来的数组
                  // var testRoutine=
                  // [
                  // [0,1],[0,3],[2,3]
                  // ];
/*                  var Routine_1=
                  [
                  [0,1],[0,3]
                  ];
                  var Routine_2=
                  [
                  [3,2],[2,5]
                  ];
                  var Routine_3=
                  [
                  [0,3],[3,4]
                  ];*/
                  var Routine = new Array();
                  Routine[0]="路径"
                  Routine[1]=
                  [
                  [0,1],[0,3]
                  ];
                  Routine[2]=
                  [
                  [3,2],[2,5]
                  ];
                  Routine[3]=
                  [
                  [0,3],[3,4]
                  ];


                //当data不为0时，给map加载点
                   window.onload = function(){

                     var obj=document.getElementById("mapImage");

                                                       obj.style.webkitTransform="translate3d(0px,0px,0px) scale3d(1,1,1)";

                    if (loadData!=""){
                        flag_deletePoint=1;//不允许删点
                                $.each(loadData, function(i, row){
                                  
                           createMark(row);
                          
                           tArray[row.id]=new Array();
                           tArray[row.id][0]=1;
                           tArray[row.id][1]=0;
                           tArray[row.id][2]=0;
                           tArray[row.id][3]=row.pageX;
                           tArray[row.id][4]=row.pageY;
                           tArray[row.id][5]=row.T;
                           tArray[row.id][6]=row.C;
                           tArray[row.id][7]=row.D;
                          
                           tArray[row.id][8]=row.id;

                          

                         
                          $(".floatWindow").css("visibility","hidden");
                          $(".floatWindow").mousedown(function(e){
                           e.stopPropagation();});

                        $(".deletePoint").mousedown(function(e){
                           e.stopPropagation();
                        });
                        $(".changeXML").mousedown(function(e){
                           e.stopPropagation();
                        });
                        

                         });

                          if(loadData[0].T==1){    $(".marker[rel=0]").find("select[name='time']").val("time1");}
                           if(loadData[0].T==2){    $(".marker[rel=0]").find("select[name='time']").val("time2");}
                            if(loadData[0].T==3){    $(".marker[rel=0]").find("select[name='time']").val("time3");}
                             if(loadData[0].C==1){   $(".marker[rel=0]").find("select[name='camera']").val("camera1");}
                              if(loadData[0].C==2){   $(".marker[rel=0]").find("select[name='camera']").val("camera2");}
                               if(loadData[0].C==3){   $(".marker[rel=0]").find("select[name='camera']").val("camera3");}
                               if(loadData[0].D==1){     $(".marker[rel=0]").find("select[name='direction']").val("direction1"); }
                               if(loadData[0].D==2){     $(".marker[rel=0]").find("select[name='direction']").val("direction2"); }
                               if(loadData[0].D==3){     $(".marker[rel=0]").find("select[name='direction']").val("direction3"); }
                      
                         
                          }


                          if(loadLine!=0){
                            reDraw();
                          }
                            docuPage= document.title
                            if(docuPage=="路径"){
                                $(".mapcontain").unbind('mouseup', setPoint());  //移出打点功能
                                /*$(".mapcontain").unbind('mousewheel'); */
                                $(".mapcontain").bind("mouseup",rightClick());
                            }
                            if(docuPage=="地图"){
                              

                            }
                            if(docuPage=="巡航"){
                               $(".mapcontain").unbind('mouseup', setPoint());  //移出打点功能
                            }


}   

              
              $("#startLine").click(function() {   //点击开始连线

                                                       //将比例尺恢复到1
                                                       var obj=document.getElementById("mapImage");

                                                       obj.style.webkitTransform="translate3d(0px,0px,0px) scale3d(1,1,1)";
                                                      for(i=0;i<markerNum;i++){
                                                 var temp_x3=(tArray[i][3]-tArray[i][1])/tArray[i][0];
                                                var temp_y3=(tArray[i][4]-tArray[i][2])/tArray[i][0];

                                                  var temp_x4=Math.round(temp_x3*100)/100;   
                                                  var temp_y4=Math.round(temp_y3*100)/100;
                                                  $(".marker[rel=" + i +"]").css("top",(temp_y4-18) + "px");
                                                    $(".marker[rel=" + i +"]").css("left",(temp_x4-10) + "px");
                                                                }


                $(".mapcontain").unbind('mouseup', setPoint());  //移出打点功能
                   $(".mapImage").unbind('mousewheel'); 
                $("mapcontain").bind("mouseup",connectPoint());






              });


              $("#finishCreate").click(function(e) {
                     
                    alert(tArray);
                    alert(cArray);



/*                     for(i=1;i<=markerNum;i++){
                  console.log(tArray[i]);
                } 
                for(i=0;i<=connectNum;i++){
                  console.log(cArray[i]);
                }*/

                     
              });
              $("#sendMsg").click(function(){

                  for(i=0;i<tArray.length;i++){
                      tempData1.push({
                          'scale':tArray[i][0],
                          'L':tArray[i][1],
                          'T':tArray[i][2],
                          'pageX':tArray[i][3],
                          'pageY':tArray[i][4],
                          'U':tArray[i][5],
                          'C':tArray[i][6],
                          'D':tArray[i][7],
                          'id':tArray[i][8]});
                  }
                  console.log(tempData1);
                  for(j=0;j<cArray.length;j++){
                      tempData2.push({
                          'start':cArray[j][0],
                          'end':cArray[j][1]
                      });

                  }
                  console.log(tempData2);
                  $.ajax({
                      type:'POST',
                      url:"/uploadPointsData",
                      contentType: "application/json",
                      dataType:"json",
                      data:JSON.stringify(tempData1),
                  success:function(data){
                          alert('发送成功');
                  }
                  });
                  $.ajax({
                      type:'POST',
                      url:"/uploadLineData",
                      contentType: "application/json",
                      dataType:"json",
                      data:JSON.stringify(tempData2),
                      success:function(data){
                          alert('发送成功2');
                      }
                  });
              });
                     
                    function rightClick(){



                    }
                  function  reDraw(){
                     var c=document.getElementById("canvas");

                    var cxt=c.getContext("2d");
                    cxt.clearRect(0,0,900,750);
                           $.each(loadLine,function(i,row){
                              $("#canvas").show();
                              var cPoint1=row[0];
                              var cPoint2=row[1];
                              var draw_temp_x1=parseInt($(".marker[rel=" + cPoint1 +"]").css("left"))+10;
                              var draw_temp_y1=parseInt($(".marker[rel=" + cPoint1 +"]").css("top"))+18;
                              var draw_temp_x2=parseInt($(".marker[rel=" + cPoint2 +"]").css("left"))+10;
                              var draw_temp_y2=parseInt($(".marker[rel=" + cPoint2 +"]").css("top"))+18;
                   
                              draw(draw_temp_x1,draw_temp_y1,draw_temp_x2,draw_temp_y2);

                            });


                  }
                  function  resetDraw(){
                        var c=document.getElementById("canvas");
                    var cxt=c.getContext("2d");
                    cxt.clearRect(0,0,900,750);


                  }
                  $("#mapReset").click(function(e) {
                    resetDraw();
                    flag_deletePoint=0;
                  });


                        //绘图函数
                      function draw(x1,y1,x2,y2){
                    var c=document.getElementById("canvas");

                    var cxt=c.getContext("2d");
                    // cxt.clearRect(0,0,900,763);
                     cxt.beginPath();
                     cxt.strokeStyle ='rgb(51, 153, 102)';
                    cxt.lineWidth = 2; 
                    cxt.moveTo(x1,y1);
                    cxt.lineTo(x2,y2);
                    cxt.stroke();
                      }   
                     function drawRed(x1,y1,x2,y2){
                    var c=document.getElementById("canvas");
                    var cxt=c.getContext("2d");
                    cxt.beginPath();
                   cxt.strokeStyle = 'red';
                    cxt.lineWidth = 2; 
                    cxt.moveTo(x1,y1);
                    cxt.lineTo(x2,y2);
                    cxt.stroke();
                      }                                       

                   //判断是否拖动
                   var temp_mouse_x1;   
                   var temp_mouse_y1;
                   var temp_mouse_x2;
                   var temp_mouse_y2;
                   var temp_left_1,temp_left_2;
                   var temp_top_1,temp_top_2;



                  $(".mapcontain").mousedown(function(e) {
                            temp_mouse_x1=event.screenX;  //鼠标按下时鼠标的位置
                            temp_mouse_y1=event.screenY;
                            temp_left_1=$("#mapLeft").attr("value");   //按下时的偏移量
                           temp_top_1=$("#mapTop").attr("value");
                          mouse_num=e.which;


                           });

                                                          
                $(".mapcontain").mouseup(function(e) {
                                setPoint();


                                        });

                function connectPoint(){


                    var obj=document.getElementById("mapImage");
                    obj.style.webkitTransform="translate3d(0px,0px,0px) scale3d(1,1,1)";

               $(".markerImage").click(function(e) {
               
              
          
                       
                     if(marker_choose==0){  //没有选中的marker时

                          preMarker_rel=$(this).parent().attr("rel");//获得当前点击的marker的rel
                           $(this).attr("src","image/37.png");
                           marker_choose=1;
                           temp_x1=parseInt($(this).parent().css("left"))+10;
                           temp_y1=parseInt($(this).parent().css("top"))+18;


                           
                         }
                         else{   //当前有选中marker
                           nowMarker_rel=$(this).parent().attr("rel");//获得当前点击的marker的rel
                          $(".marker[rel=" + preMarker_rel +"]").children().attr("src","image/36.png");
                           marker_choose=0;
                           temp_x2=parseInt($(this).parent().css("left"))+10;
                           temp_y2=parseInt($(this).parent().css("top"))+18;
                          
                           $("#canvas").show();
                            draw(temp_x1,temp_y1,temp_x2,temp_y2);
                           //存入数组
                           cArray[connectNum] = new Array();
                           cArray[connectNum][0]=preMarker_rel;
                           cArray[connectNum][1]=nowMarker_rel;
                           connectNum++;
                           
                         /*console.log(cArray[connectNum-1]);//返回连线数组*/
                       
                         }
                  

/*                 console.log($(this).parent().css("top"));*/
               });






                }   //连点结束


                function setPoint(){

                  

                    temp_mouse_x2=event.screenX;  //鼠标松开时鼠标的位置
                     temp_mouse_y2=event.screenY;
                     var temp_marker_array = new Array();
                     for(i=0;i<markerNum;i++){
                       temp_marker_array[i] = new Array();
                          temp_marker_array[i][0]=$(".marker[rel=" + i +"]").position().left;
                           temp_marker_array[i][1]=$(".marker[rel=" + i +"]").position().top;

                     }
                


                    //判断是点击事件

                    if(temp_mouse_x1 ==temp_mouse_x2&&temp_mouse_y1 ==temp_mouse_y2){  
                     
                    

                     if(mouse_num==1){  //左键
                    x=event.clientX;
                    y=event.clientY;
                    x2=x-$(".mapcontain").offset().left;  //x2,y2为实际点击位置，x3，y3为展示
                    y2=y-$(".mapcontain").offset().top+$("body").scrollTop();
                     $("#xpos").attr("value",x2);
                     $("#ypos").attr("value",y2);
                      x3=parseInt(x2)-10+"px";
                      y3=parseInt(y2)-18+"px";

                   //  var colorData = document.getElementById("backMap").getPixelColor(x2, y2);
                     
                      // var color = colorData.rgba;
                      //   if(color == 'rgba(255,0,0,1)'){
                      //     alert('该区域无法通过，请选择其他区域');
                      //   }else{
                     createMark({
                      pageY : y3,
                      pageX : x3
                    });
                    $(".marker[rel=" + (markerNum-1) +"]").children('img').attr("src","image/37.png");

                     //点击时
                     if(x2<725&&y2>492){
                      $(".marker[rel=" + (markerNum-1) +"]").children(".floatWindow").css("top","-224px");
                     }
                     if(x2>725&&y2<492){
                      $(".marker[rel=" + (markerNum-1) +"]").children(".floatWindow").css("left","-150px");
                     }
                     if(x2>725&&y2>492){
                      $(".marker[rel=" + (markerNum-1) +"]").children(".floatWindow").css("top","-224px");
                      $(".marker[rel=" + (markerNum-1) +"]").children(".floatWindow").css("left","-150px");
                     }
                     

                        $(".floatWindow").mousedown(function(e){
                           e.stopPropagation();
                        });

                        $(".deletePoint").mousedown(function(e){
                           e.stopPropagation();
                        });
                        $(".changeXML").mousedown(function(e){
                           e.stopPropagation();
                        });

                                             /*将点击结果存入数组*/
                     tArray[curNum] = new Array();
                     tArray[curNum][0]=Math.round($("#mapScale")[0].value*100)/100; //为S
                     tArray[curNum][1]=Math.round($("#mapLeft")[0].value*100)/100;//为L（偏移量）
                     tArray[curNum][2]=Math.round($("#mapTop")[0].value*100)/100;//为T
                     tArray[curNum][3]=x2;
                     tArray[curNum][4]=y2;
                     tArray[curNum][5]=0;
                     tArray[curNum][6]=0;
                     tArray[curNum][7]=0;
                     
                     tArray[curNum][8]=curNum;
                 



                   /* console.log(tArray[markerNum]);*/


                             $(this).find(".floatWindow").mouseover(function() {
                               $(this).css("visibility","visible");
                             });
                                                         
                             $(this).find(".floatWindow").mouseout(function() {  //如果鼠标从窗口移出则消失
                               $(this).css("visibility","hidden");
                             });
                           

                              } //左键结束

                                   
                                   else{
                                    if(mouse_num==3){  //右键
                                           $('.marker').contextmenu(function(e){
                                                    
                                                    if ( e && e.preventDefault ){ 
                                                        e.preventDefault(); 
                                                    } else {
                                                        window.event.returnValue = false;
                                                    };

                                                    var marker_rel=Math.round($(this).attr("rel"));  //获得点击的marker的rel值

                                                     if($(this).find(".floatWindow").css("visibility")=="hidden")  //如果右击时，配置选择窗口还在，则不反应
                                                     {

                                                           $(this).find(".rightMenu").css("visibility","visible");//弹出右键菜单
                                                            $(this).find(".rightMenu").mouseover(function() {

                                                             $(this).css("visibility","visible");

                                                           });
                                                                                       
                                                           $(this).find(".rightMenu").mouseout(function() { 
                                                            //如果鼠标从窗口移出则消失
                                                             $(this).css("visibility","hidden");

                                                           });


                                                           $(this).find(".rightMenu").find(".deletePoint").click(function() {  //删除该marker
                                                                    if(flag_deletePoint==0){
                                                                      for(i=0;i<9;i++){
                                                                    tArray[marker_rel][i]=0;    //删去的marker对应的数组值全为0；
                                                                  } ;
                                                                  $(this).parent().parent(".marker").css("visibility","hidden");
                                                                  console.log(tArray[marker_rel]);


                                                                    }else{
                                                                      alert("不允许删点!请重置后选择删除。");
                                                                    }
                                                                 

                                                                  
                                                           });
                                                                
                                                            $(this).find(".rightMenu").find(".changeXML").click(function() {  //修改该marker

                                                                  $(this).parent(".rightMenu").css("visibility","hidden");
                                                                  $(this).parent().prev(".floatWindow").css("visibility","visible");
                                                                  var temp_marker_positionx=parseInt($(this).parent().parent().css("left"));
                                                                  var temp_marker_positiony=parseInt($(this).parent().parent().css("top"));

                                                                  if(temp_marker_positionx<725&&temp_marker_positiony>452){
                                                                          $(this).parent().prev(".floatWindow").css("top","-224px");
                                                                         }
                                                                         if(temp_marker_positionx>725&&temp_marker_positiony<452){
                                                                          $(this).parent().prev(".floatWindow").css("left","-150px");
                                                                         }
                                                                         if(temp_marker_positionx>725&&temp_marker_positiony>452){
                                                                          $(this).parent().prev(".floatWindow").css("top","-224px");
                                                                          $(this).parent().prev(".floatWindow").css("left","-150px");
                                                                         }

                                                           });



                                                          }

                                                        });
                                   }}

                           }  //判断是点击结束
                           else{
                            /*判断为拖动事件*/
                                   console.log("拖动");
                                  /* console.log($(".marker[rel=3]").position().left);*/
                                    temp_left_2=$("#mapLeft").attr("value");   //松开时的偏移量
                                    temp_top_2=$("#mapTop").attr("value");
                                                              
                                     for(i=0;i<markerNum;i++){

                                                 var left_3=Math.round((temp_left_2-temp_left_1+temp_marker_array[i][0])*100)/100;
                                                  var top_3=Math.round((temp_top_2-temp_top_1+temp_marker_array[i][1])*100)/100; 
                                       
                                                  $(".marker[rel=" + i +"]").css("top",top_3 + "px");
                                                   $(".marker[rel=" + i +"]").css("left",left_3 + "px");

                                                                }


                                       } //else结束
                }

               function createMark(data){
      	           	var dataId = data.id || '';
                		var pageX = data.pageX || 0;
                		var pageY = data.pageY|| 0;
                    var T = data.T||0;
                    var C = data.C||0;
                    var D = data.D||0;
                    

                		
                		//更新计数器并记录当前计数
                		curNum = markerNum;
                	if(dataId==""){
                		var mark = $('<div class="marker" rel="'+curNum+'" style="visibility:visible"><img src="image/36.png" class="markerImage"><div class="floatWindow" style="    visibility: visible;"><p class="windowFont_head" style="    position: relative;bottom: 21px; margin-bottom: -18px;">动作设定</p><form><p class="fs14" >停留时间 </p><div class="jianbian" style="width:67px;display:inline-block;margin-bottom:0px;margin-left: 14px;"><select name="time" id="time" style="width: 56px;"><option value="time0">0秒</option><option value="time1">5秒</option><option value="time2">10秒</option><option value="time3">15秒</option></select></div><p class="fs14" >摄像头升降 </p><div class="jianbian" style="width:67px;display:inline-block;margin-bottom:0px;"><select name="camera" id="camera" style="width: 56px;"><option value="camera0">0米</option><option value="camera1">5秒</option><option value="camera2">10秒</option><option value="camera3">15秒</option></select></div><p class="fs14" >拍摄方向 </p><div class="jianbian" style="width:67px;display:inline-block;margin-bottom:0px;margin-left: 14px;"><select name="direction" id="direction" style="width: 56px;"><option value="direction0">东</option><option value="direction1">南</option><option value="direction2">西</option><option value="direction3">北</option></select></div><input type="button" value="确定" class="jianbian_button submitButton" style="width: 80px; padding-left: 7px;left: -30px;bottom: -4px;"></form></div><div class="rightMenu"><p class="fs13 deletePoint">·删除该点<br><p class="fs13 changeXML">·修改设定</div></div>').css({
                			top : pageY > 0 ? pageY-18 :y3,
                			left : pageX > 0 ? pageX-10 :x3,

                		}).appendTo(".mapcontain");}
                    else{
                      var mark = $('<div class="marker" rel="'+dataId+'" style="visibility:visible"><img src="image/36.png" class="markerImage"><div class="floatWindow" style="    visibility: visible;"><p class="windowFont_head" style="    position: relative;bottom: 21px; margin-bottom: -18px;">动作设定</p><form><p class="fs14" >停留时间 </p><div class="jianbian" style="width:67px;display:inline-block;margin-bottom:0px;margin-left: 14px;"><select name="time" id="time" style="width: 56px;"><option value="time0">0秒</option><option value="time1">5秒</option><option value="time2">10秒</option><option value="time3">15秒</option></select></div><p class="fs14" >摄像头升降 </p><div class="jianbian" style="width:67px;display:inline-block;margin-bottom:0px;"><select name="camera" id="camera" style="width: 56px;"><option value="camera0">0米</option><option value="camera1">5秒</option><option value="camera2">10秒</option><option value="camera3">15秒</option></select></div><p class="fs14" >拍摄方向 </p><div class="jianbian" style="width:67px;display:inline-block;margin-bottom:0px;margin-left: 14px;"><select name="direction" id="direction" style="width: 56px;"><option value="direction0">东</option><option value="direction1">南</option><option value="direction2">西</option><option value="direction3">北</option></select></div><input type="button" value="确定" class="jianbian_button submitButton" style="width: 80px; padding-left: 7px;left: -30px;bottom: -4px;"></form></div><div class="rightMenu"><p class="fs13 deletePoint">·删除该点<br><p class="fs13 changeXML">·修改设定</div></div>').css({
                      top : pageY > 0 ? pageY-18 :y3,
                      left : pageX > 0 ? pageX-10 :x3,

                    }).appendTo(".mapcontain");
                    }
                    //存在数据的情况
                    if(T==1){
                      $(".marker[rel=" + dataId +"]").find("select[name='time']").val("time1");
                    }
                    if(T==2){
                      $(".marker[rel=" + dataId +"]").find("select[name='time']").val("time2");
                    }
                    if(T==3){
                      $(".marker[rel=" + dataId +"]").find("select[name='time']").val("time3");
                    }
                    if(C==1){
                      $(".marker[rel=" + dataId +"]").find("select[name='camera']").val("camera1");
                    }
                    if(C==2){
                     $(".marker[rel=" + dataId +"]").find("select[name='camera']").val("camera2");
                    }
                    if(C==3){
                      $(".marker[rel=" + dataId +"]").find("select[name='camera']").val("camera3");
                    }
                    if(D==1){
                     $(".marker[rel=" + dataId +"]").find("select[name='direction']").val("direction1");
                    }
                    if(D==2){
                      $(".marker[rel=" + dataId +"]").find("select[name='direction']").val("direction2");
                    }
                    if(D==3){
                      $(".marker[rel=" + dataId +"]").find("select[name='direction']").val("direction3");
                    }
                    


                    markerNum=markerNum+1;
                  
                   $(".submitButton").click(function(e) {
                        var xxxxxx=$(this).parent().parent().parent().attr("rel");
                     tArray[xxxxxx][5]=$(this).parent().find("select[name='time']").get(0).selectedIndex;
                     tArray[xxxxxx][6]=$(this).parent().find("select[name='camera']").get(0).selectedIndex;
                     tArray[xxxxxx][7]=$(this).parent().find("select[name='direction']").get(0).selectedIndex;
                      
                          

                            $(this).parent().parent().css("visibility","hidden");

                                  });
                       

                        }




              $(".mapcontain").on("mousewheel DOMMouseScroll", function (e) {   //监听鼠标滚轮
                
                              var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                                          (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox

                              var temp_x;   //临时的x，y，用于计算对应的比例尺为1时的坐标
                              var temp_y;
                              if (delta > 0) {
                                  // 向上滚
                  
                                      for(i=0;i<markerNum;i++){
                                                temp_x=(tArray[i][3]-tArray[i][1])/tArray[i][0];
                                                temp_y=(tArray[i][4]-tArray[i][2])/tArray[i][0];
                                                //滚动后的值
                                                  var s1=  Math.round($("#mapScale")[0].value*100)/100;
                                                  var l1=  Math.round($("#mapLeft")[0].value*100)/100; 
                                                  var t1= Math.round($("#mapTop")[0].value*100)/100;
                                                  var top_2=Math.round((temp_y*s1+t1)*100)/100;   
                                                  var left_2=Math.round((temp_x*s1+l1)*100)/100;
                                          //修改坐标
                                                  $(".marker[rel=" + i +"]").css("top",(top_2-18) + "px");
                                                    $(".marker[rel=" + i +"]").css("left",(left_2-10) + "px");
                                                                }

                               

                               } else if (delta < 0) {
                                       // 向下滚
                                      for(i=0;i<markerNum;i++){
                                                temp_x=(tArray[i][3]-tArray[i][1])/tArray[i][0];
                                                temp_y=(tArray[i][4]-tArray[i][2])/tArray[i][0];
                                                //滚动后的值
                                                  var s1=  Math.round($("#mapScale")[0].value*100)/100;
                                                  var l1=  Math.round($("#mapLeft")[0].value*100)/100; 
                                                  var t1= Math.round($("#mapTop")[0].value*100)/100;
                                                  var top_2=Math.round((temp_y*s1+t1)*100)/100;   
                                                  var left_2=Math.round((temp_x*s1+l1)*100)/100;
                                          //修改坐标
                                                  $(".marker[rel=" + i +"]").css("top",(top_2-18) + "px");
                                                   $(".marker[rel=" + i +"]").css("left",(left_2-10) + "px");
                                                                }
                }
                                                          

            });
                
var  if_choosed=0;
//路径规划模块
$("#chooseStartPoint").click(function(e) {
  reDraw();
                  $(".marker").click(function(e) {
                    if(if_choosed==0){
                      rArray[0]=Math.round($(this).attr("rel"));
                    $(this).children().attr("src","image/38.png");
                    
                    if_choosed=1;
                  }else{
                    alert("您已选中一个点");
                  }
                  return false;
                  });    
  
});   
//选择起点结束
$("#chooseEndPoint").click(function(e) {
                  $(".marker").unbind('click');
                  $(".marker").click(function(e) {
                    if(if_choosed==1){
                      rArray[1]=Math.round($(this).attr("rel"));
                      $(this).children().attr("src","image/38.png");
                   
                    if_choosed=0;
                    
                  }else{
                    alert("请先选择起点！");
                  }

                  });    
  
});   
//选择终点结束
$("#chooseMiddlePoint").click(function(e) {
                $(".marker").unbind('click');
                
                var middleNum=1;
                  $(".marker").click(function(e) {
                     middleNum=middleNum+1;
                     rArray[middleNum]=Math.round($(this).attr("rel"));
                    $(this).children().attr("src","image/39.png");
                    


                  });    
  
});   
//选择中间点结束

$("#createRoutine").click(function(e) {
            // alert(rArray);
            if(testRoutine!=0){
              $.each(testRoutine,function(i,row){
                              $("#canvas").show();
                              var cPoint1=row[0];
                              var cPoint2=row[1];
                              var draw_temp_x1=parseInt($(".marker[rel=" + cPoint1 +"]").css("left"))+10;
                              var draw_temp_y1=parseInt($(".marker[rel=" + cPoint1 +"]").css("top"))+18;
                              var draw_temp_x2=parseInt($(".marker[rel=" + cPoint2 +"]").css("left"))+10;
                              var draw_temp_y2=parseInt($(".marker[rel=" + cPoint2 +"]").css("top"))+18;
                   
                              drawRed(draw_temp_x1,draw_temp_y1,draw_temp_x2,draw_temp_y2);
                              

                            });
            }
              else{
                alert("无法生成路径");
              }
            
 }); //生成路径结束

$("#resetRoutine").click(function(e) {
            var rArrayLength=rArray.length;

            for(i=0;i<rArrayLength;i++){
              
              $(".marker[rel=" + rArray[i] +"]").children().attr("src","image/36.png");
              rArray[i]="";

            }
            reDraw();

 }); //重置路径结束
$("#saveRoutine").click(function(e) {
  var name=prompt("请输入路径名称","路径");
  routineNum=routineNum+1;
  $("#routine").append("<option value='routine"+routineNum+"'>"+ name + "</option>");

    Routine[routineNum]=new Array();
    Routine[routineNum]=testRoutine;
    

    

    
  if(name==null||name==""){
            alert("请输入路径名称");
  }
 
 }); //存储路径结束
var chooseRoutineValue;
//select变化
$("#routine").change(function() {
  var checkValue=$("#routine").val();

  for(i=1;i<=routineNum;i++){
    eval("var routineCheck = 'routine"+i+"'");   
   
       if(checkValue==routineCheck){
                reDraw();
                  $.each(Routine[i],function(i,row){
                              $("#canvas").show();
                              var cPoint1=row[0];
                              var cPoint2=row[1];
                              var draw_temp_x1=parseInt($(".marker[rel=" + cPoint1 +"]").css("left"))+10;
                              var draw_temp_y1=parseInt($(".marker[rel=" + cPoint1 +"]").css("top"))+18;
                              var draw_temp_x2=parseInt($(".marker[rel=" + cPoint2 +"]").css("left"))+10;
                              var draw_temp_y2=parseInt($(".marker[rel=" + cPoint2 +"]").css("top"))+18;
                   
                              drawRed(draw_temp_x1,draw_temp_y1,draw_temp_x2,draw_temp_y2);
                              

                            });

                chooseRoutineValue=i;



       }
  }

  


});
   $("#deleteRoutine").click(function(e) {

            reDraw();
              var checkValue=$("#routine").val();
            $("#routine option[value="+checkValue+"]").remove();
            Routine[chooseRoutineValue]=[];
            alert(Routine);
            
  });

//手自动控制模块
/*$("#robot_1").css("top","100px");
$("#robot_1").css("left","50px");
$("#robot_2").css("top","200px");
$("#robot_2").css("left","313px");
$("#robot_3").css("top","500px");
$("#robot_3").css("left","424px");

$(".robotIcon").click(function(e) {
        var robotRel=$(this).attr("rel");
        $("#robotList")[0].selectedIndex=robotRel;
        $(".robotIcon").children().attr("src","image/robot.png");
        $(this).children().attr("src","image/robot_light.png");
        event.stopPropagation();
        robot_choosen=1;


 
});
$(".mapcontain").click(function(e) {
 $(".robotIcon").children().attr("src","image/robot.png");
 $('#robotList').val('none');
 robot_choosen=0;
});



$("#robotList").change(function() {
  $(".robotIcon").children().attr("src","image/robot.png");
  var robot_index= $('option:selected', '#robotList').index();
  $(".robotIcon[rel="+robot_index+"]").children().attr("src","image/robot_light.png");
  if($('#robotList').val()=="none"){
    robot_choosen=0;
  }
  else{
    robot_choosen=1;
  }
});




$("#positionButton").click(function(e) {
  event.stopPropagation();
});



var robot_choosen=0;//1表示此时有机器人被选中
var if_pause=0;//1表示此时处于暂停状态
$("#PauseButton").click(function(e) {
  if_pause=1;
});
$("#restartButton").click(function(e) {
  if_pause=0;
});





$("#topPosition").click(function(e) {
  alert("aaa");
  if(robot_choosen==1&&if_pause==1){
        
           var robot_index= $('option:selected', '#robotList').index();
           
           var robot_position_top= parseInt($(".robotIcon[rel="+robot_index+"]").css("top"))-10;
           $(".robotIcon[rel="+robot_index+"]").css("top",robot_position_top+"px");
         


  }
  else{
    alert("请先选中机器人或者暂停机器人");
  }
});

$("#leftPosition").click(function(e) {
  
  if(robot_choosen==1&&if_pause==1){
        
           var robot_index= $('option:selected', '#robotList').index();
           var robot_position_left=parseInt( $(".robotIcon[rel="+robot_index+"]").css("left"))-10;
          
           $(".robotIcon[rel="+robot_index+"]").css("left",robot_position_left+"px");
         


  }  else{
    alert("请先选中机器人或者暂停机器人");
  }
});

$("#rightPosition").click(function(e) {
  
  if(robot_choosen==1&&if_pause==1){
        
           var robot_index= $('option:selected', '#robotList').index();
           
           var robot_position_right= parseInt($(".robotIcon[rel="+robot_index+"]").css("left"))+10;
           $(".robotIcon[rel="+robot_index+"]").css("left",robot_position_right+"px");
         


  }  else{
    alert("请先选中机器人或者暂停机器人");
  }
});

$("#bottomPosition").click(function(e) {
  
  if(robot_choosen==1&&if_pause==1){
        
           var robot_index= $('option:selected', '#robotList').index();
         
           var robot_position_bottom= parseInt($(".robotIcon[rel="+robot_index+"]").css("top"))+10;
           $(".robotIcon[rel="+robot_index+"]").css("top",robot_position_bottom+"px");
         


  }  else{
    alert("请先选中机器人或者暂停机器人");
  }
});
*/

//用户管理模块
$("#systemSet").click(function(e) {
  $("#manage_head").html("系统设置");
  $(".UserPage1").css("display","none");
  $(".UserPage3").css("display","none");
  $(".UserPage2").css("display","");

});
          
 $("#userManage").click(function(e) {
  $("#manage_head").html("用户权限管理");
    $(".UserPage1").css("display","none");
  $(".UserPage2").css("display","none");
  $(".UserPage3").css("display","");
  
});
  
$("#visit a").click(function(e) {
  $("#visit a").parent().removeClass("tableActive");
  $(this).parent().addClass("tableActive");

});


$("#createUser").click(function(e) {
    addRow();

});
function addRow(){
                var UserName1=$("#createUserName").val();
        var UserPass1=$("#createUserPass").val();
        var myDate = new Date();   

        if(UserName1==""||UserPass1==""){
          alert("用户名或密码不能为空");
        }else{

          var tableAdd = $("<tr><td style='width=25%'>"+UserName1+"</td><td style='width=25%'>"+UserPass1+"</td><td style='width=25%'>"+myDate.toLocaleDateString()+"</td><td style='width=25%'><input type='button' value='修改' class='changeUser' >&nbsp;&nbsp;<input type='button' value='删除' class='deleteUser' ></td></tr>").appendTo('#usertable');
        $("#createUserName").val("");
         $("#createUserPass").val("");
         // var xxxxxxx= $(this).parent().parent().index(); 
         
        }


}
var changeUser_flag=0;//此时button名为修改


$("#usertable").on('click', '.changeUser', function(event) {
  event.preventDefault();
    var rowIndex1= $(this).parent().parent().index();  //用户第一行的index为2开始。点击的修改的行索引

    if(changeUser_flag==0){
        $(this).attr("value","确定");
        $('.changeUser').not(this).attr("disabled",true);
         changeUser_flag=1;

         var name_temp_1 = $("#usertable tr:gt(0):eq("+(rowIndex1-1)+") td:eq(0)").text(); //name
         var pass_temp_1 = $("#usertable tr:gt(0):eq("+(rowIndex1-1)+") td:eq(1)").text();
         $("#usertable tr:gt(0):eq("+(rowIndex1-1)+") td:eq(0)").html("<input type='text' id='nameInput' value='"+name_temp_1+"'>");
          $("#usertable tr:gt(0):eq("+(rowIndex1-1)+") td:eq(1)").html("<input type='text' id='passInput' value='"+pass_temp_1+"'>");
  }
else{
        $(this).attr("value","修改");
         changeUser_flag=0;
         var name_temp_2=$("#nameInput").val();
         var pass_temp_1=$("#passInput").val();
        $("#usertable tr:gt(0):eq("+(rowIndex1-1)+") td:eq(0)").html(name_temp_2);
          $("#usertable tr:gt(0):eq("+(rowIndex1-1)+") td:eq(1)").html(pass_temp_1); 
           $(".changeUser").bind('click');
           $('.changeUser').attr("disabled",false);

}
});



$("#usertable").on('click', '.deleteUser', function(event) {
  event.preventDefault();
  var rowIndex1= $(this).parent().parent().index();  //用户第一行的index为2开始。点击的修改的行索引
  $("#usertable tr:gt(0):eq("+(rowIndex1-1)+")").remove();
});


//地图创建中的上传地图
$("#CreateNewMap").click(function(e) {
  $("#uploadNewMap").trigger('click');
  //判断上传完毕后弹出窗口
  //var mapRealScale=prompt("请输入真实比例尺","");
    mapNum=mapNum+1;
  $("#map").append("<option value='map"+mapNum+"'>地图"+ mapNum + "</option>");

});

$("#cameraWindow").click(function(event) {
  alert("aaaa");
  window.open ('http://192.168.1.14', 'newwindow', 'height=600, width=1200, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no') 

});




//改界面





                  });