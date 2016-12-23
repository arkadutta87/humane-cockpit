import _ from 'lodash';
import React from 'react';
import QueryString from 'qs';
import * as d3  from 'd3';

import BarChartInternal from './BarChartInternal';
import Axis from './Axis';

export default class DataSeries extends React.Component{

    render() {
        let { data, xScale, yScale, width, height , margin} = this.props;

        let gTranslate = "translate(" + margin.left + "," + margin.top + ")";

        xScale.domain(data.map(function(d) { return d.letter; }));
        yScale.domain([0, d3.max(data, function(d) { return d.frequency; })]);

        const classX = "axis axis--x";
        const classY = "axis axis--y";
        let gTranslateT = "translate(0," + height + ")";

        const xSettings = {
            translate: gTranslateT,
            scale: xScale,
            orient: 'bottom'
        };

        const ySettings = {
            translate : '',
            scale: yScale,
            orient: 'left'
        };

        return (
            <g transform={gTranslate}>
                <BarChartInternal
                    xScale={xScale}
                    yScale={yScale}
                    data={data}
                    width={width}
                    height={height}
                    margin={margin}
                />
                <Axis setting={xSettings} classT={classX} xflag={true} />
                <Axis setting={ySettings} classT={classY} xflag={false} />
            </g>
        );
    }

}