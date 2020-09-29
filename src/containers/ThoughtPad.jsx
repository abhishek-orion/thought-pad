import React from "react";
import Box from "@material-ui/core/Box";
import ToolBar from "./../components/ToolBar.jsx";
import CanvasWrap from "./../components/CanvasWrap.jsx";
import Popover from "@material-ui/core/Popover";
import HighlighterCanvas from "./../components/HighlighterCanvas";
import Slider from "@material-ui/core/Slider";
import { GithubPicker } from "react-color";

export default class ThoughtPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawingMode: false,
      tool: "pen",
      color: "black",
      size: 3,
      markerSizerOpen: false,
      linecap: "round",
      undoHighlight: [],
      displayMarketTools: false,
    };
  }

  changeTool = (tool) => {
    this.setState({
      tool: tool,
    });
  };

  changeMarkerSize = (event, value) => {
    this.setState({
      size: value,
    });
  };

  handleMarkerSizerOpen = (event) => {
    this.setState({
      markerSizerOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  handleMarkerSizerClose = () => {
    this.setState({
      markerSizerOpen: false,
    });
  };

  valuetext = (value) => {
    return `${value} px`;
  };

  changeColor = (color) => {
    this.setState({
      color: color.hex,
    });
  };

  openTools = () => {
    this.setState({
      displayMarketTools: true,
    });
  };

  handleClose = () => {
    this.setState({
      displayMarketTools: false,
    });
  };

  render() {
    const {
      drawingMode,
      tool,
      color,
      size,
      linecap,
      displayMarketTools,
    } = this.state;
    return (
      <Box>
        <ToolBar setTool={this.changeTool} openTools={this.openTools} />
        <div>
          <CanvasWrap
            isDrawing={tool === "highlighter" ? false : drawingMode}
            tool={tool}
            color={tool === "eraser" ? "white" : color}
            size={size}
            linecap={linecap}
          />
          {tool === "highlighter" ? (
            <HighlighterCanvas
              isDrawing={drawingMode}
              color={color}
              linecap={linecap}
            />
          ) : null}
        </div>
        <Popover
          id="markerTools"
          anchorEl={null}
          onClose={this.handleClose}
          open={displayMarketTools}
        >
          <div style={{ padding: "10px" }}>
            <h3>Marker Width</h3>
            <Slider
              disabled={tool === "highlighter"}
              value={tool === "highlighter" ? 5 : size}
              onChange={this.changeMarkerSize}
              defaultValue={3}
              getAriaValueText={this.valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={2}
              marks
              min={1}
              max={40}
            />
            <h3>Pick Color</h3>
            <GithubPicker
              color={this.state.color}
              onChange={this.changeColor}
            />
          </div>
        </Popover>
      </Box>
    );
  }
}
