var drawLib = function() {
    this.line= '';
};

drawLib.prototype = (function() {
    // function to draw a line
    var drawLine = function (svg, coordinates, stroke, strokeWidth, strokeOpacity) {
        this.line = svg.append("line")
            .style("stroke", stroke)
            .attr("stroke-width", strokeWidth)
            .attr("stroke-opacity", strokeOpacity)
            .attr("x1", coordinates.x1)
            .attr("y1", coordinates.y1)
            .attr("x2", coordinates.x2)
            .attr("y2", coordinates.y2);
            return this.line;
    },

    // function to draw a circle
    drawCircle = function (svg, xc, yc) {
        svg.append("g")
            .attr("transform", "translate(" + xc + "," + yc + ")")
            .append("circle").attr({
                r: SETTINGS.RADIUS,
            })
            .style("fill", SETTINGS.COLOR.WHITE)
            .attr("stroke", SETTINGS.COLOR.BLACK);
    },

    // function that display the node text
    setNodeLabel = function (svg, label, x, y) {
        svg.append("text")
            .text(label)
            .attr("x", x)
              .attr("y", y)
    };

    return {
        drawLine: drawLine,
        drawCircle: drawCircle,
        setNodeLabel: setNodeLabel
    }
})();
