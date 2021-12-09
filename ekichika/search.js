//search.js

var stationQueue = [];

function within_T_min(startGroupID, T){
    var Adj_list = {};   //隣接リスト　keyはstation ID
    var groupInfo = {};  //グループIDでそのグループ内の駅情報を検索するための辞書 keyはgroupe ID
    var stationInfo = {};   //駅idで駅情報検索
    var time = {};       //その駅グループに到達するまでの所要時間    keyはgroupe ID
    var visited_station_flag = {};  
    var previousStation = {};  //ひとつ前の[駅ID, routename]を格納　keyはgroupe ID

    var queue = new pairing_heap(); //最大ヒープ

    var ARAKAWASEN = 0.8;   //所要時間0分の駅間の所要時間
    var changeTrains_time = 5;  //乗り換え時間
    var stopTime = 0.5;         //停車時間
    new Promise((resolve) => {
        Make_Adj_List();
        resolve();
    }).then(() => {
        setTimeout(() => {
            //console.log(Adj_list)
            dijkstra();
            console.log(stationQueue);
        }, 500);
    });

    //return //到達可能駅のリスト
    function Make_Adj_List(){
        var groupInfo_flag = {}

        d3.csv("../importantData/join.csv").then(function(data){
            data.forEach(function(d){
                var time_tmp
                //時間を設定
                if (d.time == 0){
                    time_tmp = parseFloat(ARAKAWASEN) + parseFloat(stopTime);  //d.time=0のときの例外処理
                }else{
                    time_tmp = parseFloat(d.time) + parseFloat(stopTime);
                }
                //groupInfoを追加
                if (groupInfo[d.fromGroupID] == undefined){
                    groupInfo[d.fromGroupID] = [[d.fromID, d.fromName, d.routeID, d.routeName]];
                    groupInfo_flag[d.fromGroupID] = [d.fromID];
                }else if(groupInfo_flag[d.fromGroupID].indexOf(d.fromID) == -1){
                    groupInfo[d.fromGroupID].push([d.fromID, d.fromName, d.routeID, d.routeName]);
                    groupInfo_flag[d.fromGroupID].push(d.fromID);
                }
                if (groupInfo[d.toGroupID] == undefined){
                    groupInfo[d.toGroupID] = [[d.toID, d.toName, d.routeID, d.routeName]];
                    groupInfo_flag[d.toGroupID] = [d.toID];
                }else if(groupInfo_flag[d.toGroupID].indexOf(d.toID) == -1){
                    groupInfo[d.toGroupID].push([d.toID, d.toName, d.routeID, d.routeName]);
                    groupInfo_flag[d.toGroupID].push(d.toID);
                }
                //隣接リストに追加
                if (Adj_list[d.fromID] == undefined){
                    Adj_list[d.fromID] = [[d.toGroupID, d.toID, d.toName, d.routeID, d.routeName, time_tmp]];
                    stationInfo[d.fromID] = {GroupID: d.fromGroupID, stationName: d.fromName, routeID: d.routeID, routeName: d.routeName};
                    time[d.fromID] = T + 100;
                    previousStation[d.fromID] = [];
                    visited_station_flag[d.fromID] = false;

                    for (var i = 0; i < groupInfo[d.fromGroupID].length; i++){
                        if(groupInfo[d.fromGroupID][i][0] != d.fromID){
                            var StID_tmp = groupInfo[d.fromGroupID][i][0];
                            var StName_tmp = groupInfo[d.fromGroupID][i][1];
                            var RouteID_tmp = groupInfo[d.fromGroupID][i][2];
                            var RouteName_tmp = groupInfo[d.fromGroupID][i][3];
                            Adj_list[d.fromID].push([d.fromGroupID, StID_tmp, StName_tmp, RouteID_tmp, RouteName_tmp, changeTrains_time]);
                            Adj_list[StID_tmp].push([d.fromGroupID, d.fromID, d.fromName, d.routeID, d.routeName, changeTrains_time]);
                        }
                    }
                }
                else{
                    Adj_list[d.fromID].push([d.toGroupID, d.toID, d.toName, d.routeID, d.routeName, time_tmp]);
                }
                if (Adj_list[d.toID] == undefined){
                    Adj_list[d.toID] = [[d.fromGroupID, d.fromID, d.fromName, d.routeID, d.routeName, time_tmp]];
                    stationInfo[d.toID] = {GroupID: d.toGroupID, stationName: d.toName, routeID: d.routeID, routeName: d.routeName};
                    time[d.toID] = T + 100;
                    previousStation[d.toID] = [];
                    visited_station_flag[d.toID] = false;
                    //同一グループ内の駅とつなげる
                    for (var i = 0; i < groupInfo[d.toGroupID].length; i++){
                        if(groupInfo[d.toGroupID][i][0] != d.toID){
                            var StID_tmp = groupInfo[d.toGroupID][i][0];
                            var StName_tmp = groupInfo[d.toGroupID][i][1];
                            var RouteID_tmp = groupInfo[d.toGroupID][i][2];
                            var RouteName_tmp = groupInfo[d.toGroupID][i][3];
                            Adj_list[d.toID].push([d.toGroupID, StID_tmp, StName_tmp, RouteID_tmp, RouteName_tmp, changeTrains_time]);
                            Adj_list[StID_tmp].push([d.toGroupID, d.toID, d.toName, d.routeID, d.routeName, changeTrains_time]);
                        }
                    }
                }
                else{
                    Adj_list[d.toID].push([d.fromGroupID, d.fromID, d.fromName, d.routeID, d.routeName, time_tmp]);
                } 


            });
        });
    }
    function dijkstra(){
        for(var j = 0; j < groupInfo[startGroupID].length; j++){
            var startStationID = groupInfo[startGroupID][j][0];
            time[startStationID] = 0; //スタート地点の時間は0
            previousStation[startStationID].push([startGroupID, -1, "start", -1]);
            queue.enqueue(-time[startStationID], startStationID);   //最大ヒープなのでtimeにマイナス付ける
        }

        while(queue.size() != 0){
            var currentStationID = queue.dequeue();
            var currentStationName = stationInfo[currentStationID].stationName;
            var currentGroupID = stationInfo[currentStationID].GroupID;
            var currentStationRouteName = stationInfo[currentStationID].routeName;
            if (visited_station_flag[currentStationID] == false){
                visited_station_flag[currentStationID] = true;
                if (previousStation[currentStationID][0][0] != currentGroupID){
                    stationQueue.push([previousStation[currentStationID][0][1], currentStationID]);
                }
                for(var i = 0; i < Adj_list[currentStationID].length; i++){
                    var nextStationID = Adj_list[currentStationID][i][1];
                    var dt = parseFloat(Adj_list[currentStationID][i][5]);  //次の駅までの所要時間
                    var current_node_time = parseFloat(time[currentStationID]);
                    var next_node_time = parseFloat(time[nextStationID]);
                    if( (next_node_time > current_node_time + dt && current_node_time + dt　< T)){
                        time[nextStationID] = current_node_time + dt;
                        previousStation[nextStationID].push([currentGroupID, currentStationID, currentStationName, currentStationRouteName]);
                        queue.enqueue(-time[nextStationID], nextStationID);
                    }
                }
            }

        }
    }
}
