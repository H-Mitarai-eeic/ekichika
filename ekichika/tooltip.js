var stationTooltip;
var stationTooltipScale = 1;  //for tooltip
var stationTooltipFontSize = 10;
//circle.on("mouseover", showStaionTooltip)
      //   .on("mouseout", hideStationTooltip);
/*
var stationTooltipZoom = d3.zoom().scaleExtent([1, 200])
  .on("zoom", function(event){
    //tooltip
    stationTooltipScale = event.transform.k;
    console.log(stationTooltipScale)
    if (stationTooltip != undefined){
      resizeStationTooltip(event);
  }
});
*/
function showStationTooltip(event){
  //console.log(d3.select(this));
  var selected_circle = d3.select(this);

  var data_stationTooltip = [selected_circle.datum().GroupID, selected_circle.datum().name]
  var circle_cx = selected_circle.attr("cx")
  var circle_cy = selected_circle.attr("cy")
  var circle_r = selected_circle.attr("r")

  var circle_transform = selected_circle.attr("transform");
  //var circle_scale = selected_circle.attr("scale");
  var y_offset = 20;
  var y_col = circle_cy - y_offset / Math.cbrt(stationTooltipScale);

  var fontsize = 10;
  //console.log(stationTooltipScale);

  stationTooltip = g.selectAll(".stationTooltip")
      .data(data_stationTooltip)
      .enter()
      .append("g")
      .attr("class", "stationTooltip")
      .attr("transform", circle_transform)
      .call(zoom);
  //console.log(stationTooltipZoom);
  stationTooltip.selectAll(".stationTooltipText")
      .data(data_stationTooltip)
      .enter()
      .append("text")
      .attr("class", "stationTooltipText")
      .attr("fill", "black")
      .attr("stroke", "none")
      .attr("text-anchor", "middle")
      .attr("x", circle_cx)
      .attr("y", function(d, i){return stationTooltipFontSize / Math.cbrt(stationTooltipScale) * i + y_col;})
      .attr("font-size", stationTooltipFontSize / Math.cbrt(stationTooltipScale))
      .text(function(d){return d; })
      .call(zoom);
  /*
  stationTooltip.append("rect")
      .attr("class", "stationTooltipBg")
      .attr("width", 20)
      .attr("height", 20)
      .attr("x", circle_cx)
      .attr("y", circle_cy)
      .attr("fill", "white")
      .attr("stroke", "black");*/
  //console.log("stationTooltip", stationTooltip.selectAll("rect"));
  //stationTooltip.on("zoom", resizeStationTooltip);
  
  //console.log("stationTooltip", stationTooltip);
}
function hideStationTooltip(event){
  svg.selectAll(".stationTooltip").remove();
}
function resizeStationTooltip(event){
  current_y = stationTooltip.selectAll(".stationTooltipText").attr("y");
  stationTooltip.attr("transform", event.transform);
  stationTooltip.selectAll(".stationTooltipText")
            .attr("font-size", stationTooltipFontSize / Math.cbrt(event.transform.k));
}