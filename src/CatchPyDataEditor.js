import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Editor, EditorState, RichUtils } from 'draft-js';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { getAnalysisData } from './getAnalysisData';
// import BoldIcon from '@material-ui/icons/FormatBold';
// import ItalicIcon from '@material-ui/icons/FormatItalic';
// import { withStyles } from '@material-ui/core/styles';
// import { stateToHTML } from 'draft-js-export-html';
// import { stateFromHTML } from 'draft-js-import-html';

// Sample data response from MCIH
// Need to map each visibleColorSet item to a visibleColor and an analysisMethodology
// VisibleColor: `${color.name} ($all items in visibleColorPigmentSet)`
// {
//   "data": {
//     "analysisByUuid": {
//       "uuid": "0b48ba14-8ca6-49a7-9eb7-0f0a321b5128",
//       "description": "Harvard pigment study",
//       "visiblecolorSet": [
//         {
//           "description": "In South Asian material, organic red is likely to be madder or lac dye.",
//           "color": {
//             "name": "Pink",
//             "hexCode": "D1548D",
//             "hexCodeLeftGradient": "",
//             "hexCodeRightGradient": ""
//           },
//           "substrate": true,
//           "visiblecolorpigmentSet": [
//             {
//               "pigment": {
//                 "name": "Lac dye"
//               }
//             },
//             {
//               "pigment": {
//                 "name": "Vermilion"
//               }
//             },
//             {
//               "pigment": {
//                 "name": "Lead white"
//               }
//             }
//           ],
//           "visiblecoloranalysismethodologySet": [
//             {
//               "locationDescription": null,
//               "analysisPoint": "",
//               "analysisMethodology": {
//                 "name": "Video Spectral Comparator",
//                 "acronym": "VSC"
//               },
//               "visibleColor": {
//                 "color": {
//                   "name": "Pink"
//                 }
//               }
//             },
//             {
//               "locationDescription": null,
//               "analysisPoint": "",
//               "analysisMethodology": {
//                 "name": "Raman Spectroscopy",
//                 "acronym": "Raman"
//               },
//               "visibleColor": {
//                 "color": {
//                   "name": "Pink"
//                 }
//               }
//             },
//             {
//               "locationDescription": null,
//               "analysisPoint": "",
//               "analysisMethodology": {
//                 "name": "X-ray Fluorescence",
//                 "acronym": "XRF"
//               },
//               "visibleColor": {
//                 "color": {
//                   "name": "Pink"
//                 }
//               }
//             }
//           ]
//         },
//       ]
//     }
//   }
// }

/** */
class CatchPyDataEditor extends Component {
  /** */
  constructor(props) {
    super(props);
    this.state = {
      data: getAnalysisData(),
      visibleColorSelected: null,
      analysisMethodologySelected: null
    }
    // this.state = {
    //   editorState: EditorState.createWithContent(stateFromHTML(props.annoHtml)),
    // };
    // this.onChange = this.onChange.bind(this);
    // this.handleKeyCommand = this.handleKeyCommand.bind(this);
    // this.handleFormating = this.handleFormating.bind(this);
  }

  handleVisibleColorChange = event => {
    this.setState({ visibleColorSelected: event.target.value })
  }

  // handleAnalysisMethodologyChange = event => {
  //   this.setState({ analysisMethodologySelected: event.target.value })
  // }

  renderVisibleColorOptions(){
    return this.state.data.data.analysisByUuid.visiblecolorSet.map((vc, i) => {
      return (
        <MenuItem
          label="Select a Visible Color"
          value={vc.color.name} // This should be uuid
          key={i}
          name={vc.color.name}
        >{ vc.color.name }</MenuItem>
      )
    })
  }

  // renderAnalysisMethodologyOptions(){
  //   return this.state.data.data.analysisByUuid.visiblecolorSet
  // }

  /** */
  // onChange(editorState) {
  //   const { updateAnnotationBody } = this.props;
  //   this.setState({ editorState });
  //   if (updateAnnotationBody) {
  //     const options = {
  //       inlineStyles: {
  //         BOLD: { element: 'b' },
  //         ITALIC: { element: 'i' },
  //       },
  //     };
  //     updateAnnotationBody(stateToHTML(editorState.getCurrentContent(), options).toString());
  //   }
  // }

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
            value={ this.state.visibleColorSelected }
            onChange={ this.handleVisibleColorChange}
          >
            { this.renderVisibleColorOptions() }
          </Select>
          <Select
            id=""
            lable=""
          >

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