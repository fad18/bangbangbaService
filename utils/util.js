/**
 * 根据创建订单需要修改了formatTime函数，只返回小时和分钟
 * 添加了formatDate函数，返回日期，分隔符改为'-'
 */
const formatTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  //const second = date.getSeconds()

  return [hour, minute].map(formatNumber).join(':')
}

const formatDate=date=>{
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('/')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate:formatDate
}
