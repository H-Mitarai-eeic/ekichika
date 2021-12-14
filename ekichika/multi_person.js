function multi_person() {
  if (clicked_stations.size < 2) {
    console.log("num of stations selected is not enough!");
    return;
  } else {
    console.log("multi_person_mode");
    d3.selectAll("line")
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .attr("opacity", 0);
    show_center_station();
  }
}

clicked_stations_names;

function show_center_station() {
  meet_up(clicked_stations, 180, stationQueue, goal_station_name_ID).then(
    () => {
      while (stationQueue.length) {
        var rinsetsu_stations = stationQueue.shift();
        g.select(".s" + rinsetsu_stations[0] + "_" + rinsetsu_stations[1])
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("opacity", 1);
      }
      g.selectAll(".circle").attr("fill-opacity", 0.2).attr("fill", "white");
      for (var clicked_station_id of clicked_stations_names) {
        g.select("#" + clicked_station_id)
          .attr("fill-opacity", 1)
          .attr("fill", "red");
      }
      if (goal_station_name_ID.length == 1) {
        // center_stationは駅名+グループID
        var center_station = goal_station_name_ID.shift();
        g.select("#" + center_station)
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("fill-opacity", 1)
          .attr("fill", "lime");
      } else if (goal_station_name_ID.length == 2) {
        var center_station = goal_station_name_ID.shift();
        var nearest_hub_station = goal_station_name_ID.shift();
        g.select("#" + center_station)
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("fill-opacity", 1)
          .attr("fill", "lime");
        g.select("#" + nearest_hub_station)
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("fill-opacity", 1)
          .attr("fill", "darkviolet");
      }
    }
  );
}
