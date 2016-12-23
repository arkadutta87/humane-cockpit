import _ from 'lodash';
import React from 'react';
import QueryString from 'qs';
import * as d3  from 'd3';


export default class Axis extends React.Component{
    componentDidMount() {
        this.renderAxis();
    }

    componentDidUpdate() {
        this.renderAxis();
    }

    renderAxis() {
        var node  = this.refs.axis;
        if(this.props.xflag){
            d3.select(node).call(d3.axisBottom(this.props.setting.scale));
        }else{
            //var axis = d3.svg.axis().orient(this.props.orient).ticks(5).scale(this.props.scale);
            d3.select(node).call(d3.axisLeft(this.props.setting.scale).ticks(10, "%"))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Frequency");;
        }

    }

    render() {
        let { setting, classT} = this.props;

        return <g className={classT} ref="axis" transform={setting.translate} ></g>
    }
}