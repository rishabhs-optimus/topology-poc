(function() {
    // svg canvas - this will be used to draw topology
    var svg = d3.select("#draw")
      .append("svg")
      .attr("width", SETTINGS.DRAWING_CANVAS.WIDTH)
      .attr("height", SETTINGS.DRAWING_CANVAS.HEIGHT);

    // Creating an instance of toplogy
    var topo = new Topology();

    topo.init(svg);
})();
