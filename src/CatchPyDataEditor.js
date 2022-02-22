import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import ToggleButton from '@material-ui/lab/ToggleButton';
// import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { getAnalysisData } from './getAnalysisData';

/** */
class CatchPyDataEditor extends Component {
  /** */
  constructor(props) {
    super(props);
    this.state = {
      data: getAnalysisData(),
      visibleColorSelectedUuid: null,
      analysisMethodologySelectedUuid: null
    }
    this.handleVisibleColorChange = this.handleVisibleColorChange.bind(this);
    this.handleAnalysisMethodologyChange = this.handleAnalysisMethodologyChange.bind(this);

    // this.state = {
    //   editorState: EditorState.createWithContent(stateFromHTML(props.annoHtml)),
    // };
    // this.onChange = this.onChange.bind(this);
    // this.handleKeyCommand = this.handleKeyCommand.bind(this);
    // this.handleFormating = this.handleFormating.bind(this);
  }

  handleVisibleColorChange = event => {
    console.log(event.target.value);
    this.setState({
      visibleColorSelectedUuid: event.target.value,
      analysisMethodologySelectedUuid: null 
    })
  }

  handleAnalysisMethodologyChange = event => {
    this.setState({ analysisMethodologySelectedUuid: event.target.value })
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

  /** */
  render() {
    // const { classes } = this.props;
    // const { editorState } = this.state;
    // const currentStyle = editorState.getCurrentInlineStyle();

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

/** */
// const styles = (theme) => ({
//   editorRoot: {
//     borderColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
//     borderRadius: theme.shape.borderRadius,
//     borderStyle: 'solid',
//     borderWidth: 1,
//     fontFamily: theme.typography.fontFamily,
//     marginBottom: theme.spacing(1),
//     marginTop: theme.spacing(1),
//     minHeight: theme.typography.fontSize * 6,
//     padding: theme.spacing(1),
//   },
// });

// TextEditor.propTypes = {
//   annoHtml: PropTypes.string,
//   classes: PropTypes.shape({
//     editorRoot: PropTypes.string,
//   }).isRequired,
//   updateAnnotationBody: PropTypes.func,
// };

// TextEditor.defaultProps = {
//   annoHtml: '',
//   updateAnnotationBody: () => {},
// };

// export default withStyles(styles)(TextEditor);
export default CatchPyDataEditor;