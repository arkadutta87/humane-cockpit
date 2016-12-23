import _ from 'lodash';
import React from 'react';
import QueryString from 'qs';
import * as d3  from 'd3';

export default class BarChartInternal  extends React.Component{

    render() {
        const propT = this.props;
        return <g>{ propT.data.map(function(d, index){
            const rectProps = {
                className : 'bar',
                x : propT.xScale(d.letter),
                y : propT.yScale(d.frequency),
                width: propT.xScale.bandwidth(),
                height: propT.height - propT.yScale(d.frequency)
            }
            return <rect {...rectProps} />;
        })
        }</g>
    }

}