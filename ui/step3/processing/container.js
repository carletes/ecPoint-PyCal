import { connect } from 'react-redux'

import Processing from './component'

const mapStateToProps = state => ({
  predictand: state.predictand,
  predictors: state.predictors,
  parameters: state.parameters,
  computations: state.computations,
})

export default connect(mapStateToProps)(Processing)
