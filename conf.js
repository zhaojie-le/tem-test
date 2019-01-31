import React from 'react'
// import { Link } from 'react-router'
// import { apis } from 'api/config'

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
  onDrawerOpen,
  defaultVisibleCols,
  tabFilterConf
}

