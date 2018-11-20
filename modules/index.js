import { call, takeLatest, put, select } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { SUCCESS } from 'api/config'
import { message } from 'antd'
import { singleton } from 'utils/single'
import { CONFIG } from '../conf'
const single = singleton.setKey('')
const PAGE_SIZE = 25
// ------------------------------------
// Constants
// ------------------------------------
const GET_LIST_DATA = single.add('GET_LIST_DATA')
const ADD_LIST_DATA = single.add('ADD_LIST_DATA')
const FETCH_ERROR = single.add('FETCH_ERROR')
// ------------------------------------
// Actions
// ------------------------------------
function setParamsAction (body) {
  return {
    type    : GET_LIST_DATA,
    payload : body,
  }
}
function addListAction (payload = {}) {
  return {
    type    : ADD_LIST_DATA,
    payload : payload,
  }
}
function fetchError () {
  return {
    type    : FETCH_ERROR,
    payload : '',
  }
}
export const actions = {
  setParamsAction,
}
// ------------------------------------
// Reducer
// ------------------------------------
let initialState = Immutable.fromJS({
  tab: 'statement',
  list: [],
  params: {},
  toggleID: null,
  loading: false,
  pagination: {
    pageSize: PAGE_SIZE,
  },
})
export default function Search (state = initialState, action) {
  let map = {
    [GET_LIST_DATA] () {
      let { params = {} } = action.payload
      return state.mergeIn(
        ['pagination'], {
          current: Number(params.page || 1),
          pageSize: Number(params.limit || PAGE_SIZE),
        }
      ).merge({
        params: params,
      }).set(
        'loading', true
      )
    },
    [ADD_LIST_DATA] () {
      let { list, total } = action.payload
      return state.mergeIn(
        ['pagination'], { total: total }
      ).merge({
        loading: false,
        list: list,
      })
    },
    [FETCH_ERROR] () {
      return state.mergeIn(
        ['pagination'], { total: 0 }
      ).merge({
        loading: false,
        list: [],
      })
    },
  }
  if (map[action.type]) {
    return map[action.type]()
  } else {
    return state
  }
}

// ------------------------------------
// Sagas
// ------------------------------------

function* getListSaga (type, body) {
  try {
    const state = yield select()
    const { params, tab } = state.invoice_manager.toJS()
    const _config = CONFIG[tab]
    params.page = params.page || 1
    params.limit = params.limit || PAGE_SIZE
    const repos = yield call(fetchAPI, _config.api, params)
    if (repos.code === SUCCESS) {
      yield put(addListAction({ list: repos.data.list, total: repos.data.total }))
    } else {
      yield put(fetchError())
      message.error(`${repos.msg}`)
    }
  } catch (e) {
    yield put(fetchError())
    message.error('获取数据失败')
  }
}

function* watchListSaga () {
  yield takeLatest([GET_LIST_DATA], getListSaga)
}

export const sagas = [
  getListSaga,
  watchListSaga,
]
