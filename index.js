import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'

export default store => ({
  path: '',  // path
  breadcrumbName: '', // title
  breadcrumbCode: 'breadcrumb.workbench',
  getComponent (nextState, cb) {
    Promise.all([import('./Workbench.js')]).then(([Containers]) => {
      const { reducer, sagas } = Containers.default
      const key = Containers.default.stateKey
      injectReducer(store, { key, reducer })
      injectSagas(store, { key, sagas })
      /*  Return getComponent   */
      cb(null, Containers.default)
    })
  }
})
