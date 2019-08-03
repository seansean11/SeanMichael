//  ____  ____  __ _   __  ____    ____  ____   __   __ _
// / ___)(  __)(  ( \ /  \(  _ \  / ___)(  __) / _\ (  ( \
// \___ \ ) _) /    /(  O ))   /  \___ \ ) _) /    \/    /
// (____/(____)\_)__) \__/(__\_)  (____/(____)\_/\_/\_)__)
//
// senkmichael@gmail.com

'use strict';

/**
 * Data for the interest/skills chart
 * @type {Array}
 */
var DATA = [{
  key: "Skill",
  nonStackable: false,
  color: "#ef453d",
  values: [{
    x: "JavaScript",
    y: 90
  },
  {
    x: "React",
    y: 90
  },
  {
    x: "Node.js",
    y: 80
  },
  {
    x: "Blockchain",
    y: 60
  },
  {
    x: "Running",
    y: 60
  },
  {
    x: "CSS/HTML",
    y: 90
  },
  {
    x: "Spanish",
    y: 80
  },
  {
    x: "AngularJS",
    y: 70
  },
  {
    x: "FP",
    y: 45
  },
  {
    x: "UI/UX Design",
    y: 65
  },
  {
    x: "PHP",
    y: 40
  }]
},
{
  key: "Interest",
  nonStackable: false,
  color: "#fcae5c",
  values: [{
    x: "JavaScript",
    y: 100
  },
  {
    x: "React",
    y: 90
  },
  {
    x: "Node.js",
    y: 80
  },
  {
    x: "Blockchain",
    y: 100
  },
  {
    x: "Running",
    y: 90
  },
  {
    x: "CSS/HTML",
    y: 55
  },
  {
    x: "Spanish",
    y: 60
  },
  {
    x: "AngularJS",
    y: 70
  },
  {
    x: "FP",
    y: 80
  },
  {
    x: "UI/UX Design",
    y: 60
  },
  {
    x: "PHP",
    y: 30
  }]
}];

/**
 * Create/destroy chart
 * @type {Object}
 * @return module revealer
 */
var CHART = (function () {
  var chartEl = document.querySelector('.chart__boom');

  function ensurePositiveInteger(int) {
    return (int > 0) ? int : 0;
  }

  function init() {
    nv.addGraph({
      generate: function () {
        var width = chartEl.offsetWidth,
          height = ensurePositiveInteger(chartEl.offsetHeight - 22);


        var chart = nv.models.multiBarChart()
          .width(width)
          .height(height)
          .stacked(true);

        chart.reduceXTicks(false);
        if (width < 900) {
          chart.xAxis.rotateLabels(-45);
        } else {
          chart.xAxis.rotateLabels(0);
        }

        var svg = d3.select('#js-boom svg').datum(DATA);
        svg.transition().duration(0).call(chart);
        return chart;
      },
      callback: function (graph) {
        nv.utils.windowResize(function () {
          var width = chartEl.offsetWidth,
            height = ensurePositiveInteger(chartEl.offsetHeight - 26);

          graph.width(width).height(height);
          d3.select('#js-boom svg')
            .attr('width', width)
            .attr('height', height)
            .transition().duration(0)
            .call(graph);
        });
      }
    });
  }

  function destroy() {
    d3.selectAll("svg > *").remove();
    window.nv.charts = {};
    window.nv.graphs = [];
    window.nv.logs = {};
    window.onresize = null;
  }

  // Reveal module
  return {
    init: init,
    destroy: destroy
  };

})();

/**
 * Main functionality for site
 * @type {Object}
 * @return module revealer
 */
var SM = (function () {
  function activateChart(e) {
    document.body.classList.add('chart-active');
    CHART.init();
    e.preventDefault();
  }

  function destroyChart() {
    document.body.classList.add('animate');
    setTimeout(function () {
      document.body.classList.remove('chart-active');
      document.body.classList.remove('animate');
      CHART.destroy();
    }, 300);
  }

  function fadeIn() {
    document.documentElement.classList.remove('fade');
  }

  (function init() {
    var activate = document.getElementById('js-chart-activate'),
      destroy = document.getElementById('js-chart-destroy');

    activate.addEventListener('click', activateChart);
    destroy.addEventListener('click', destroyChart);
    document.addEventListener("DOMContentLoaded", fadeIn);
  })();

})();
