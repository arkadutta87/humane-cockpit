import _ from 'lodash';
import React from 'react';
import QueryString from 'qs';
import * as d3  from 'd3';

import DataSeries from './DataSeries';

export default class BarChart extends React.Component{

    render() {
        let { width, height, data , margin } = this.props;

        const widthT = width - margin.left - margin.right;
        const heightT = height - margin.top - margin.bottom;

        let x = d3.scaleBand().rangeRound([0, widthT]).padding(0.1),
            y = d3.scaleLinear().rangeRound([heightT, 0]);

        return (
            <svg width={width} height={height}>
                <DataSeries
                    xScale={x}
                    yScale={y}
                    data={data}
                    width={widthT}
                    height={heightT}
                    margin={margin}
                />
            </svg>
        );
    }

}