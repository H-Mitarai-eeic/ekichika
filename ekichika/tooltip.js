var stationTooltip;
var stationTooltipZoom = d3.zoom().scaleExtent([1, 200]);
var stationTooltipScale = 1;

stationTooltipZoom.on("zoom", function(event){
    stationTooltipScale = event.transform.k;
    console.log(stationTooltipScale);
    stationTooltip.attr("transform", event.transform)
                .attr("font-size", fontsize * Math.cbrt(event.transform.k));
});

function showStaionTooltip(event){
    //console.log(d3.select(this));
    var selected_circle = d3.select(this);

    var data_stationTooltip = [selected_circle.datum().GroupID, selected_circle.datum().name]
    var circle_cx = selected_circle.attr("cx")
    var circle_cy = selected_circle.attr("cy")
    var circle_r = selected_circle.attr("r")

    var circle_transform = selected_circle.attr("transform");
    //var circle_scale = selected_circle.attr("scale");
    var y_col = circle_cy - circle_r * 10;

    var fontsize = 10;
    console.log(stationTooltipScale);

    stationTooltip = svg.selectAll(".stationTooltip")
        .data(data_stationTooltip)
        .enter()
        .append("g")
        .attr("class", "stationTooltip")
        .attr("transform", circle_transform);
    stationTooltip.append("text")
        .attr("class", "stationTooltipText")
        .attr("fill", "black")
        .attr("stroke", "none")
        .attr("text-anchor", "end")
        .attr("x", circle_cx)
        .attr("y", function(d, i){return fontsize / Math.cbrt(stationTooltipScale) * i + y_col;})
        .attr("font-size", fontsize / Math.cbrt(stationTooltipScale))
        .text(function(d){return d; });
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

    function resizeStationTooltip(event){
        d3.selectAll()
    }
}
function hideStationTooltip(event){
//d3.select(this).attr("fill", function (d){ return color(d.region)})
    svg.selectAll(".stationTooltip").remove();
}
/*
  function dragstarted(){
    drag_delta = 0;
  }
  function dragged(event){

    drag_delta += event.dx;
    year_delta = Math.floor(drag_delta / drag_threshold);

    if(year_delta != 0){
      nextYear = currentYear + year_delta;
      if(nextYear < 1800) nextYear = 1800;
      else if(nextYear > 2009) nextYear = 2009;

      currentYear = nextYear;
      yearLabel.text(currentYear);
      circle.data(interpolateData(), function(d){ return d.name;})
            .call(position).sort(order);
      drag_delta = 0;
    }
  }
  function dragended(){
    //do nothing
  }


  function order(a, b){
    return b.population - a.population;
  }

  function position(p)
  {

    p.attr("cx", function(d){ return incomeScale(d.income); });
    p.attr("cy", function(d){ return lifeScale(d.lifeExpectancy); });
    p.attr("r", function(d){ return populationScale(d.population); });
  }
*/