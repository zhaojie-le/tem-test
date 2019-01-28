import React from 'react'
import utils from 'utils'
import conf from './conf'
import { apis } from 'api/config'
import Detail from '../Detail/Detail'
import { Workbench } from 'byted-antx'
import './Workbench.less'

const {
  columnsConf,
  columnsInfo,
  filterBarOptions,
  refactorDataInBar,
  refactorDataInTable,
  onDrawerOpen,
  defaultVisibleCols,
  tabFilterConf
} = conf

const { setStateKey, apiConfig, setTableConf, setFilterConf } = Workbench

const getColumns = (columnsConf, columnsInfo) => cb => {
  const _columns = columnsInfo ? columnsInfo(cb) : {}
  return utils.buildColumns(columnsConf, _columns)
}

@apiConfig()            // api
@setStateKey('')        // key
@setTableConf({
  defaultVisibleCols,   // 是否开启自定义设置面板
  sortable: true        // 是否采用pro版的设置面板（支持拖拽排序）
})
@setFilterConf({
  defaultList: 3        // 可接收：true, number, [string,]
})
export default class extends React.Component {
  render () {
    return (
      <Workbench
        dataKey={''}    // key
        refactorDataInBar={refactorDataInBar}
        refactorDataInTable={refactorDataInTable}
        onDrawerOpen={onDrawerOpen}
        columnsConf={getColumns(columnsConf, columnsInfo)}
        filterBarConf={filterBarOptions()}
        tabFilterConf={tabFilterConf}
        {...this.props}
      >
        <Detail />
      </Workbench>
    )
  }
}
