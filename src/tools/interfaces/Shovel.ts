export interface ConfigurableOptions {
  maxNum?: number; // 数据累计多少条上报一次
  time?: number; // 多久上报一次，这里是5000ms
}
export interface BasicParams {
  ua: string; // 数据累计多少条上报一次
  title: string; // 页面标题
  resolution: string; // 设备分辨率
  deviceType: string | null; // 设备类型
  language: string; // 客户端语言
  userId: number | null; // 用户唯一标识
  link: string; // 页面链接
}
export interface Options extends ConfigurableOptions {
  _exposureItem: NodeListOf<Element> | null; // 统计页面中需要添加眼球曝光埋点的DOM元素
  _showExposureData: object[]; // 添加眼球曝光的埋点数据
}
