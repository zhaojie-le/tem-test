import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'

export default (store) => ({
  path: 'manager',
  breadcrumbName: '',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'System.import' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    Promise.all([
      import('./containers/'),
      import('./modules'),
    ]).then(([Container, modules]) => {
      const reducer = modules.default
      const sagas = modules.sagas

      injectReducer(store, { key: '', reducer })
      injectSagas(store, { key: '', sagas })

      /*  Return getComponent   */
      cb(null, Container.default)
    })
  },
})
