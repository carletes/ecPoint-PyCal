import { connect } from 'react-redux'

import PredictantsComponent from './component'

import {
  setPredictantType,
  setPredictantPath,
  setPredictorsPath,
  setDateStartField,
  setDateEndField,
  setAccField,
  setLimSUField,
  setRangeField,
  setOutPath,
  addComputation,
  updateComputationName,
  updateComputationField,
  updateComputationInputs,
  removeComputation,
  setScaleOp,
  setScaleValue,
} from './actions'

const mapStateToProps = state => ({
  predictant: state.predictant,
  parameters: state.parameters,
  computations: state.computations,
  page: state.page.page,
})

const mapDispatchToProps = dispatch => ({
  onPredictantTypeChange: type => dispatch(setPredictantType(type)),

  onPredictantPathChange: path => dispatch(setPredictantPath(path)),

  onPredictorsPathChange: path => dispatch(setPredictorsPath(path)),

  onOutPathChange: path => dispatch(setOutPath(path)),

  onParametersDateStartFieldChange: (value, pattern) =>
    dispatch(setDateStartField(value, pattern)),

  onParametersDateEndFieldChange: (value, pattern) =>
    dispatch(setDateEndField(value, pattern)),

  onParametersAccFieldChange: (value, pattern) =>
    dispatch(setAccField(value, pattern)),

  onParametersLimSUFieldChange: (value, pattern) =>
    dispatch(setLimSUField(value, pattern)),

  onParametersRangeFieldChange: (value, pattern) =>
    dispatch(setRangeField(value, pattern)),

  onComputationNameChange: (index, name) =>
    dispatch(updateComputationName(index, name)),

  onComputationFieldChange: (index, field) =>
    dispatch(updateComputationField(index, field)),

  onComputationInputsChange: (index, inputs) =>
    dispatch(updateComputationInputs(index, inputs)),

  addEmptyComputation: () => dispatch(addComputation('', '', [])),

  onComputationRemove: index => dispatch(removeComputation(index)),

  setScaleOp: (index, op) => dispatch(setScaleOp(index, op)),
  setScaleValue: (index, value) => dispatch(setScaleValue(index, value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PredictantsComponent)
