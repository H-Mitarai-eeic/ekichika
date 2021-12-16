var stationTooltip;

var stationTooltipScale = 1;  //for tooltip
var stationTooltipPreviousScale = 1;
var stationTooltipFontSize = 10;

//var stationTooltipBgWidth = 60;
//var stationTooltipBgHeight = 20;

//var stationTooltipDataN = 2;

var stationTooltips = svg.append("g")
.attr("class", "stationTooltips")
.attr("transform", "translate(0, 0) scale(1)");

function tooltipHandlerOnCircle(event){
  var selected_circle = d3.select(this);
  var cx = selected_circle.attr("cx");
  var cy = selected_circle.attr("cy");
  var data = [selected_circle.datum().name];
  var ID = data[0] + data[1];
  var transform = selected_circle.attr("transform");

  if(event.type == "mouseover"){
    showStationTooltip(event, data, ID ,cx, cy, transform);
  }
  else if(event.type == "mouseout"){
    hideStationTooltip(event, ID);
  }
}
function showStationTooltip(event, data, ID, x, y, transform, y_offset=-10, x_offset=0){
  //var selected_circle = d3.select(this);

  //var data_stationTooltip = [selected_circle.datum().GroupID, selected_circle.datum().name]
  //var circle_cx = selected_circle.attr("cx")
  //var circle_cy = selected_circle.attr("cy")

  //var circle_transform = selected_circle.attr("transform");
  //var y_offset = 20;

  var y_col = parseFloat(y) + y_offset / Math.cbrt(stationTooltipScale);
  var x_col = parseFloat(x) + x_offset / Math.cbrt(stationTooltipScale);
  var scaled_fontsize = stationTooltipFontSize / Math.cbrt(stationTooltipScale);
  var dataN = data.length;
  var textMaxLength = 0;
  var stationTooltipBgWidth;
  for(var i = 0; i < dataN; i++){
    if (textMaxLength < data[i].length){
      textMaxLength = data[i].length;
    }
  }
  stationTooltipBgWidth = scaled_fontsize * textMaxLength * 1.2;

  stationTooltip = stationTooltips
      .append("g")
      .attr("class", "stationTooltip" + ID)
      .call(zoom);
  //console.log(stationTooltipZoom);
  stationTooltip.selectAll(".stationTooltipText")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "stationTooltipText")
      .attr("fill", "white")
      .attr("stroke", "none")
      .attr("text-anchor", "middle")
      .attr("x", x_col)
      .attr("y", y_col)
      .attr("dy", function(d, i){return - scaled_fontsize * (dataN - i - 1); })
      .attr("font-size", scaled_fontsize)
      .text(function(d){return d; })
      .call(zoom);
      //console.log(stationTooltip);
  
  stationTooltip
      .append("rect")
      .attr("class", "stationTooltipBg")
      .attr("width", stationTooltipBgWidth)
      .attr("height", scaled_fontsize * dataN * 1.2)
      .attr("x", x_col - stationTooltipBgWidth /2)
      .attr("y", y_col - scaled_fontsize * dataN)
      .attr("rx", 1)
      .attr("rx", 1)
      .attr("fill", "black")
      .attr("fill-opacity", 0.1)
      .attr("stroke", "white")
      .attr("stroke-width", 0.1);
}
function hideStationTooltip(event, ID){
  svg.selectAll(".stationTooltip" + ID).remove();
}
function resizeStationTooltip(event){
  stationTooltipScale = event.transform.k;
  var y_offset = -10;

  var scaled_fontsize = stationTooltipFontSize / Math.cbrt(stationTooltipScale);
  var scaled_previous_fontsize = stationTooltipFontSize / Math.cbrt(stationTooltipPreviousScale);

  var scaled_y_offset = y_offset / Math.cbrt(stationTooltipScale);
  var scaled_previous_y_offset = y_offset / Math.cbrt(stationTooltipPreviousScale);

  if (stationTooltips != undefined){
    stationTooltips.attr("transform", event.transform);
  }
  if(stationTooltips != undefined && stationTooltips.selectAll(".stationTooltipText").empty() != true){
    var dataN = 1.0;
    stationTooltips.selectAll(".stationTooltipText")
              .attr("font-size", scaled_fontsize)
              .attr("y", function(d, i){
                var current_y = parseFloat(d3.select(this).attr("y"));
                return current_y + scaled_y_offset - scaled_previous_y_offset;
              })
              .attr("dy", function(d, i){return - scaled_fontsize * (dataN - i - 1); });
    stationTooltips.selectAll(".stationTooltipBg")
              .attr("width", function(){
                var current_width = parseFloat(d3.select(this).attr("width"));
                return current_width * scaled_fontsize / scaled_previous_fontsize; 
              })
              .attr("height", scaled_fontsize * dataN * 1.2)
              .attr("x", function(){
                var current_x = parseFloat(d3.select(this).attr("x"));
                var current_width = parseFloat(d3.select(this).attr("width"));
                return current_x - current_width * scaled_fontsize /scaled_previous_fontsize/2 + current_width / 2;
              })
              .attr("y", function(){
                var current_y = parseFloat(d3.select(this).attr("y"));
                return current_y + scaled_y_offset - scaled_previous_y_offset - scaled_fontsize * dataN + scaled_previous_fontsize * dataN;
              })
  }
  stationTooltipPreviousScale = stationTooltipScale;
}