import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

/** */
class CatchPyDataEditor extends Component {
  /** */
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.analysisData,
      visibleColorSelectedUuid: this.props.visibleColorSelectedUuid,
      analysisMethodologySelectedUuid: this.props.analysisMethodologySelectedUuid
    }
    this.handleVisibleColorChange = this.handleVisibleColorChange.bind(this);
    this.handleAnalysisMethodologyChange = this.handleAnalysisMethodologyChange.bind(this);
  }

  handleVisibleColorChange = event => {
    console.log(event.target.value);
    const { updateCatchPyData } = this.props;
    this.setState({
      visibleColorSelectedUuid: event.target.value,
      analysisMethodologySelectedUuid: null 
    }, () => {
      if(updateCatchPyData){
        updateCatchPyData({
          visibleColorSelectedUuid: this.state.visibleColorSelectedUuid,
          analysisMethodologySelectedUuid: this.state.analysisMethodologySelectedUuid
        })
      }
    })
  }

  handleAnalysisMethodologyChange = event => {
    console.log(event.target.value);
    const { updateCatchPyData } = this.props;
    this.setState({
      analysisMethodologySelectedUuid: event.target.value
    }, () => {
      if(updateCatchPyData){
        updateCatchPyData({
          visibleColorSelectedUuid: this.state.visibleColorSelectedUuid,
          analysisMethodologySelectedUuid: this.state.analysisMethodologySelectedUuid
        })
      }
    });
  }

  renderVisibleColorOptions(){
    return this.state.data.data.analysisByUuid.visiblecolorSet.map((vc, i) => {
      let pigments = vc.visiblecolorpigmentSet.map((p) => {
        return p.pigment.name
      }).join(", ");
      return (
        <MenuItem
          label="Select a Visible Color"
          value={vc.uuid}
          key={i}
          name={vc.color.name}
        >{ vc.color.name } ({ pigments})</MenuItem>
      )
    })
  }

  renderAnalysisMethodologyOptions(){
    if(this.state.visibleColorSelectedUuid){
      let selectedVisibleColor = this.state.data.data.analysisByUuid.visiblecolorSet.find((vc) => {
        return vc.uuid == this.state.visibleColorSelectedUuid;
      });
      return selectedVisibleColor.visiblecoloranalysismethodologySet.map((m, i) => {
        return (
          <MenuItem
            label="Select a Methodology"
            value={m.uuid}
            key={i}
            name={m.analysisMethodology.name}
          >{m.analysisMethodology.name}</MenuItem>
        )
      })
    } else {
      return [];
    }

  }

  render() {
    return (
      <div>
        <FormControl fullWidth>
          <InputLabel id="visible-color-select-label">Visible Color</InputLabel>
          <Select
            id="visible-color-select"
            label="Visible Color Select"
            value={ this.state.visibleColorSelectedUuid }
            onChange={ this.handleVisibleColorChange }
          >
            { this.renderVisibleColorOptions() }
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="analysis-methodology-select-label">Analysis Methodology</InputLabel>
            <Select
              id="analysis-methodology-select"
              label="Analysis Methodology Select"
              value={ this.state.analysisMethodologySelectedUuid}
              onChange={ this.handleAnalysisMethodologyChange }
            >
              { this.renderAnalysisMethodologyOptions() }
            </Select>
        </FormControl>
      </div>
    );
  }
}

CatchPyDataEditor.propTypes = {
  analysisData: PropTypes.object,
  visibleColorSelectedUuid: PropTypes.string,
  analysisMethodologySelectedUuid: PropTypes.string,
  updateCatchPyData: PropTypes.func
}

CatchPyDataEditor.defaultProps = {

}

export default CatchPyDataEditor;