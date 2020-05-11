//为空的时候显示 "无"
function empty(value: any) {
  if (value == "" || value == undefined || value == null) return "无";
  return value;
}

export default empty;
