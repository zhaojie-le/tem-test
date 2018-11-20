import { connect } from 'react-redux'
import { actions } from '../modules'
import IndexContent from '../components/index'

const mapDispatchToProps = {
  ...actions,
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexContent)
