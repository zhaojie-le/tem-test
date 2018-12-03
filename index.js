import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'

export default (store) => ({
  path: '',           // path
  breadcrumbName: '', // title
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

      injectReducer(store, { key: '', reducer }) // key
      injectSagas(store, { key: '', sagas })     // key

      /*  Return getComponent   */
      cb(null, Container.default)
    })
  },
})
