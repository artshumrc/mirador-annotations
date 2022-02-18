import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tool } from '@psychobolt/react-paperjs';
import { Rectangle } from 'paper';
import flatten from 'lodash/flatten';
import { mapChildren } from './utils';

class PointTool extends Component {
    constructor(props){
        super(props);
        // this.onMouseMove = this.onMouseMove.bind(this);
        // this.onMouseDown = this.onMouseDown.bind(this);
        // this.onMouseDrag = this.onMouseDrag.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    onMouseUp(e){
        const { onPathAdd, pathProps, paper } = this.props;
        const { project } = paper;
        const { Path, Point, CompoundPath } = paper;

        // Pin path
        console.log(e.point);
        var bottom = e.point;
        var top = new Point(e.point.x, e.point.y - 50)
        var arcFrom = new Point(top.x - 20, top.y + 20)
        var arcTo = new Point(top.x + 20, top.y + 20)
        var arc = new Path.Arc(arcFrom, top, arcTo)
        var leftLine = new Path.Line(arcFrom, bottom)
        var rightLine = new Path.Line(arcTo, bottom)
        
        var path = new CompoundPath({
          children: [
            arc,
            leftLine,
            rightLine
          ],
          strokeColor: pathProps.strokeColor,
          fillColor: pathProps.fillColor,
          strokeWidth: pathProps.strokeWidth
        })

        // need to flatten this so it can be edited and doesn't fill in the arc
        // path.flatten(0);
        path.smooth();
        onPathAdd(path);
    }

    render(){
        return (
            <Tool
                onMouseUp={this.onMouseUp}
            />
        );
    }
}

PointTool.propTypes = {
    onPathAdd: PropTypes.func.isRequired,
    paper: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}
export default React.forwardRef((props, ref) => <PointTool innerRef={ref} {...props} />); // eslint-disable-line
