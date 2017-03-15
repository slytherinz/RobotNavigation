package com.ssm.common;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Zly on 2017/3/1.
 */
//地杰斯特拉算法
public class GraphArray {
    public static final int MaxWeight = 99999;
    private double[][] graph;
    private int maxVertexNum;
    //设置最大矩阵值
    public  GraphArray(int maxVertexNum){
        this.maxVertexNum = maxVertexNum;

    }
    //初始化
    public void creatGraph(){
        graph=new double[maxVertexNum][maxVertexNum];
        for(int i=0;i<maxVertexNum;i++){
            for(int j=0;j<maxVertexNum;j++){
                graph[i][j] = MaxWeight;
            }
        }
    }
    //边的权重
    public void insertEdge(int front,int after,double weight){
        graph[front][after] = weight;
        graph[after][front] = weight;
    }
    public List<Integer> getShortestPath(int beginIndex,int endIndex){
        boolean[] S = new boolean[maxVertexNum];//建立顶点集合辅助数组
        double[] dist = new double[maxVertexNum];//建立顶点begIndex到顶点endIndex的最小边数组
        List<Integer> path = new ArrayList<Integer>();//建立顶点begIndex到顶点endIndex的路径
        List<Integer> pathIdArray = new ArrayList<Integer>();
        for(int i=0;i<maxVertexNum;i++){
            S[i] = false;
            dist[i] = MaxWeight;
            path.add(i,-1);
        }
        //将起点放入集合S
        S[beginIndex] = true;
        ////在dist数组中寻找最短的边值
        for(int j=0;j<maxVertexNum;j++){
            if(!S[j]&&graph[beginIndex][j]<MaxWeight){
                dist[j] = graph[beginIndex][j];
                path.set(j,beginIndex);
            }
        }
        double minWeight;
        int minIndex = maxVertexNum;
        int count = 1;
        while(count<=maxVertexNum){
            minWeight = MaxWeight;
            for(int i=0;i<maxVertexNum;i++){
                if(!S[i]&&dist[i]<minWeight){
                    minWeight = dist[i];
                    minIndex = i;
                }
            }
            ///此顶点进S
            S[minIndex] = true;
            count++;
            int i;
            for(i=0;i<maxVertexNum;i++){
                if(graph[minIndex][i]<MaxWeight&&!S[i]&&dist[minIndex]+graph[minIndex][i]<dist[i]){
                    dist[i] = dist[minIndex]+graph[minIndex][i];
                    path.set(i,minIndex);
                }
            }
            //
            if(endIndex == i){
                break;
            }
        }
        int index = 0;
        pathIdArray.add(index,endIndex);
        index++;
        while(path.get(endIndex)!=-1){
            pathIdArray.add(index++,path.get(endIndex));
            endIndex = path.get(endIndex);
        }
        return pathIdArray;
    }

}
