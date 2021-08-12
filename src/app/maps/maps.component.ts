import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";

declare const google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.css"],
})

export class MapsComponent implements OnInit {
  constructor() {}
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq = 0;
  }

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq2 = 0;
  }

  ngOnInit() {
    // Sector wise PF breakdown
    const sectorBreakdown: any = {
      labels: ["Finance", "IT", "Infra", "Pharma"],
      series: [[23, 15, 48, 14]],
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 100,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    var sectorBreakdownChart = new Chartist.Bar(
      "#dailySalesChart",
      sectorBreakdown,
      optionsDailySalesChart
    );

    this.startAnimationForBarChart(sectorBreakdownChart);

    // Market cap wise PF breakdown
    var mcBreakdown = {
      labels: ["Small", "Mid", "Large"],
      series: [[5, 45, 50]],
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 100,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
    };
    var responsiveOptions: any[] = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            },
          },
        },
      ],
    ];
    var mcBreakdownChart = new Chartist.Bar(
      "#websiteViewsChart",
      mcBreakdown,
      optionswebsiteViewsChart,
      responsiveOptions
    );
    this.startAnimationForBarChart(mcBreakdownChart);

    // Projected invested amount growth
    const dataCompletedTasksChart: any = {
      labels: ["1Y", "2Y", "3Y", "4Y", "5Y", "6Y", "7Y", "8Y"],
      series: [[2.3, 3.5, 4.5, 6.0, 7.8, 8.4, 9.0, 10.9]],
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 20, // Y-axis
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    var completedTasksChart = new Chartist.Line(
      "#completedTasksChart",
      dataCompletedTasksChart,
      optionsCompletedTasksChart
    );
    this.startAnimationForLineChart(completedTasksChart);
  }
}
