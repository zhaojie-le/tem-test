import React from 'react'
import { Link } from 'react-router'
import { apis } from 'api/config'
import _ from 'lodash'

const columnsConf = [
  'example_name:60'
]

const defaultVisibleCols = [
  'example_id'
]

const columnsInfo = cb => ({
})

const itemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const filterBarOptions = () => {
  return [
    {
      label: '名称',
      field: 'name',
      type: 'input',
      formItemLayout: itemLayout
    },
  ]
}

const deleteUndefined = value => {
  _.forEach(value, (item, key) => {
    if (_.isUndefined(item)) {
      delete value[key]
    }
  })
}
// 无需返回值 非必须：查询之前对搜索框产出数据进行预处理。接收FilterBar->data的引用。
// eg: 对日期组件产出的moment数据进行格式化处理
const refactorDataInBar = value => {
  if (value.create_time && value.create_time.length) {
    const start = value.create_time[0].format('YYYY-MM-DD')
    const end = value.create_time[1].format('YYYY-MM-DD')
    value.create_time_start = new Date(start + ' 00:00:00').getTime() / 1000
    value.create_time_end = new Date(end + ' 23:59:59').getTime() / 1000 + 1
    delete value.create_time
  }
}

// 无需返回值 非必须：排序数据格式化
const refactorDataInTable = (_params, pagination, filters, sorter) => {
  _params.order_by = sorter.columnKey
  _params.order_type = sorter.columnKey
    ? sorter.order === 'ascend'
      ? 1
      : 2
    : undefined
  deleteUndefined(_params)
}

/**
 * 非必须
 * 抽屉打开前的事件回调，用于从record中获取参数到抽屉
 * function(record:Object)=>({
 *    targetId: String,
 *    targetName: String,
 *    data: Object
 *    })
 * default: {
 *   targetId: record.id + '',
 *   targetName: record.name,
 *   data: {},
 * }
 */
const onDrawerOpen = record => {
  return {
    targetName: record.example_id
  }
}

const tabFilterConf = {
}

export default {
  columnsConf,
  columnsInfo,
  filterBarOptions,
  refactorDataInBar,
  refactorDataInTable,
  onDrawerOpen,
  defaultVisibleCols,
  tabFilterConf
}

