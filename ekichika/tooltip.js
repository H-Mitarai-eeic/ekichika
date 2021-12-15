var stationTooltip;

var stationTooltipScale = 1;  //for tooltip
var stationTooltipPreviousScale = 1;
var stationTooltipFontSize = 10;

var stationTooltipBgWidth = 60;
var stationTooltipBgHeight = 20;

var stationTooltipDataN = 2;

var stationTooltips = svg.append("g")
.attr("class", "stationTooltips");

function tooltipHandlerOnCircle(event){
  var selected_circle = d3.select(this);
  var cx = selected_circle.attr("cx");
  var cy = selected_circle.attr("cy");
  var data = [selected_circle.datum().name, selected_circle.datum().GroupID];
  var ID = data[0] + data[1];
  var transform = selected_circle.attr("transform");

  if(event.type == "mouseover"){
    showStationTooltip(event, data, ID ,cx, cy, transform);
  }
  else if(event.type == "mouseout"){
    hideStationTooltip(event, ID);
  }
}
function showStationTooltip(event, data, ID, x, y, transform, y_offset=20, x_offset=0){
  //var selected_circle = d3.select(this);

  //var data_stationTooltip = [selected_circle.datum().GroupID, selected_circle.datum().name]
  //var circle_cx = selected_circle.attr("cx")
  //var circle_cy = selected_circle.attr("cy")

  //var circle_transform = selected_circle.attr("transform");
  //var y_offset = 20;

  var y_col = y - y_offset / Math.cbrt(stationTooltipScale);
  var x_col = x - x_offset / Math.cbrt(stationTooltipScale);
  var scaled_fontsize = stationTooltipFontSize / Math.cbrt(stationTooltipScale);
  var dataN = data.length;

  stationTooltip = stationTooltips
      .append("g")
      .attr("class", "stationTooltip" + ID)
      .attr("transform", transform)
      .call(zoom);
  //console.log(stationTooltipZoom);
  stationTooltip.selectAll(".stationTooltipText")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "stationTooltipText")
      .attr("fill", "black")
      .attr("stroke", "none")
      .attr("text-anchor", "middle")
      .attr("x", x_col)
      .attr("y", function(d, i){return scaled_fontsize * i + y_col;})
      .attr("font-size", scaled_fontsize)
      .text(function(d){return d; })
      .call(zoom);
      //console.log(stationTooltip);
  
  stationTooltip
      .append("rect")
      .attr("class", "stationTooltipBg")
      .attr("width", stationTooltipBgWidth / Math.cbrt(stationTooltipScale))
      .attr("height", scaled_fontsize * dataN + 1)
      .attr("x", x_col - stationTooltipBgWidth/ Math.cbrt(stationTooltipScale) /2)
      .attr("y", y_col - scaled_fontsize)
      .attr("fill", "white")
      .attr("fill-opacity", 0.1)
      .attr("stroke", "black")
      .attr("stroke-width", 0.1);
}
function hideStationTooltip(event, ID){
  svg.selectAll(".stationTooltip" + ID).remove();
}
function resizeStationTooltip(event){
  stationTooltipScale = event.transform.k;
  var y_offset = 20;
  var scaled_fontsize = stationTooltipFontSize / Math.cbrt(stationTooltipScale);
  //console.log(scaled_fontsize);
  if(stationTooltip != undefined){
    var current_y = parseFloat(stationTooltip.selectAll(".stationTooltipText").attr("y"));
    var current_x = parseFloat(stationTooltip.selectAll(".stationTooltipBg").attr("x"));
    //console.log(current_y);
    stationTooltip.attr("transform", event.transform);
    stationTooltip.selectAll(".stationTooltipText")
              .attr("font-size", scaled_fontsize)
              .attr("y", function(d, i){
                return current_y - y_offset / Math.cbrt(stationTooltipScale) + y_offset / Math.cbrt(stationTooltipPreviousScale) + i * stationTooltipFontSize / Math.cbrt(stationTooltipScale);
              });
    stationTooltip.selectAll(".stationTooltipBg")
              .attr("x", current_x + stationTooltipBgWidth/ Math.cbrt(stationTooltipPreviousScale) /2 - stationTooltipBgWidth/ Math.cbrt(stationTooltipScale) /2)
              .attr("y", current_y - y_offset / Math.cbrt(stationTooltipScale) + y_offset / Math.cbrt(stationTooltipPreviousScale) - scaled_fontsize)
              .attr("width", stationTooltipBgWidth / Math.cbrt(stationTooltipScale))
              .attr("height", scaled_fontsize * stationTooltipDataN + 1);
  }
  stationTooltipPreviousScale = stationTooltipScale;
}