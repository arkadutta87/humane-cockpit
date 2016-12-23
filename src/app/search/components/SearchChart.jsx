import _ from 'lodash';
import React from 'react';
import QueryString from 'qs';
import * as d3  from 'd3';

export default class SearchChart extends React.Component {

    render() {
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var parseTime = d3.timeParse("%d-%b-%y");

        // set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        var valueline = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });

        const pie = d3.pie()
            .value(d => d.value);
        const arc = d3.arc()
            .outerRadius(50);

        return (
            <svg viewBox="0 0 100 100">
                <g transform={`translate(50,50)`}>
                    {pie(this.props.data).map((slice, index) =>
                        <path
                            key={index}
                            d={arc(slice)}
                            fill={this.props.data[index].color}
                        />
                    )}
                </g>
            </svg>
        );
    }

    // componentDidMount() {
    //     const { data, ...props } = this.props
    //     const { chart } = this.refs
    //
    //     this.chart = new Chart({
    //         target: chart,
    //         valueFormat,
    //         ...props
    //     })
    //
    //     this.chart.render(data)
    // }

    // componentWillUpdate({ data, ...props }) {
    //     const { chart } = this.refs
    //
    //     this.chart.set({
    //         target: chart,
    //         valueFormat,
    //         ...props
    //     })
    //
    //     this.chart.render(data)
    // }

}

