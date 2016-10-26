//topology.js
// Constructor
var Topology = function() {
    this.update = "hello";
};

Topology.prototype = function () {
    // private member
    var init = function (svg) {
        var updateTopologyJson;

        d3.json("./api/TopologyStat.json", function(json) {
            updateTopologyJson = json
        });

        d3.json("./api/Topology.json", function(json) {
            var lib = new drawLib();
            var allData = json;
            allData.forEach(function(data) {
                if (data._type === "node") {
                    var nodeName = data.name;
					var nodeClass = data.nodeClass;
					var node1FilterData = allData.filter(function (node1FilterData) {
						return node1FilterData.name === nodeClass;
					})[0];

					var node2Name = allData.filter(function (node2Name) {
						return node2Name.node1 === nodeName;
					});

					if (node2Name.length) {
						node2Name.map(function(obj) {
							var nodeConnectObj = obj;
                            var nodeLineLinkName = nodeConnectObj.name;
                            var nodeLineName = "." + nodeLineLinkName + ".";
                            var rate = nodeLineLinkName + ".Rate";
                            var badRate = nodeLineLinkName + ".Result.Failed.Rate";
							var rateValue = "";
							var badRateValue = "";
							var node2Class = allData.filter(function (node2Class) {
								return node2Class.name === nodeConnectObj.node2;
							})[0].nodeClass;

							var node2FilterData = allData.filter(function (node2FilterData) {
								return node2FilterData.name === node2Class;
							})[0];

                            Object.keys(updateTopologyJson).map(function (key) {
								var keyName = key;
								var keyData = updateTopologyJson[key];
                                if (keyName.indexOf(nodeLineName) > -1) {
                                    if (keyName.indexOf(rate) > -1) {
										Object.keys(keyData).map(function(key){
											rateValue = keyData[key];
										});
									} else if (keyName.indexOf(badRate) > -1) {
										Object.keys(keyData).map(function(key){
											badRateValue = keyData[key];
										});
									}
                                }
                            });

							if (rateValue === "0.00") {
								lib.drawLine(svg, { x1: node1FilterData.x, y1: node1FilterData.y, x2: node2FilterData.x, y2: node2FilterData.y }, SETTINGS.COLOR.BLACK, SETTINGS.STROKE.WIDTH.EXTRA_SMALL, SETTINGS.STROKE.OPACITY)
                                .transition()
                                .duration(2000)
                                .ease("linear")
                                .attr("stroke-width", 1)
                                .delay(800)
								.attr("stroke-dasharray", ("3, 3"));
							} else {
								lib.drawLine(svg, { x1: node1FilterData.x, y1: node1FilterData.y, x2: node2FilterData.x, y2: node2FilterData.y }, SETTINGS.COLOR.BLACK, SETTINGS.STROKE.WIDTH.EXTRA_SMALL, SETTINGS.STROKE.OPACITY)
                                .transition()
                                .duration(2000)
                                .ease("linear")
                                .attr("stroke-width", rateValue)
                                .delay(800);
							}

						});
					}

                    lib.setNodeLabel(svg, data.name, node1FilterData.x + 25, node1FilterData.y);
                    lib.drawCircle(svg, node1FilterData.x, node1FilterData.y);
                }
            });
        });
    };
    // public members
    return {
        init: init
    };
} ();
