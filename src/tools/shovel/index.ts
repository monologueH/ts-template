/* eslint-disable no-underscore-dangle */
import qs from 'qs';
import { Options, BasicParams, ConfigurableOptions } from '../interfaces/Shovel';

const defaultOpt: Options = {
  _exposureItem: null,
  _showExposureData: [],
  maxNum: 5,
  time: 5000,
};
// 客户端基本信息

class Shovel {
  options: Options;

  params: BasicParams;

  constructor(options: ConfigurableOptions = {}) {
    this.options = { ...options, ...defaultOpt };
    this.params = {
      ua: window.navigator.userAgent, // 浏览器信息
      title: document.title, // 页面标题
      resolution: `${window.screen.width}x${window.screen.height}(px)`, // 设备分辨率
      deviceType: null, // 设备类型
      language: navigator.language, // 客户端语言
      userId: null, // 用户唯一标识
      link: window.location.href, // 页面链接
    };
  }

  init(): void {
    console.log('====>init');
    this.initErrorListener();
    this.dotPageReadyData();
  }

  dotPageReadyData(): void {
    this.options._exposureItem = document.querySelectorAll('.shovel-exposure');
    // this.options._exposureItem.forEach((item) => {
    // });
    this.params.deviceType = this.getDeviceType();
    // this.postPv(this.params);
  }

  setUserId(id: number): void {
    this.params.userId = id;
  }

  splicingStr(params: object): string {
    return qs.stringify(params);
  }

  parseStr(params: string): object {
    return qs.parse(params);
  }

  /**
     * @description: 获取设备类型
     * @return: 返回设备类型
     */
  getDeviceType(): string {
    const flag: RegExpMatchArray | null = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    const deviceType = flag ? flag[0] : 'pc';
    return deviceType;
  }

  initErrorListener(): void {
    window.onerror = (msg, url, line, col, error): void => {
      const time = {
        timestamp: new Date().getTime(), // 错误上报时间
      };
      const errData = {
        act: 'error', // 上报类型
        key: 'details_123_error',
        msg, // 错误的具体信息
        line, // 错误所在的行
        col, // 错误所在的列
        error, // 具体的error对象
      };
      const params = { ...time, ...errData, ...this.params };
      console.log(params);
      // this.analytics(this.splicingStr(Object.assign({}, time, errData, this.params)))
    };
  }

  /**
     * @description: 返回白屏时间,dom渲染完成时间,页面onload时间等
     * @return: 返回白屏时间,dom渲染完成时间,页面onload时间等
     */
  getAllTime(): object {
    const { timing } = performance;
    const start = timing.navigationStart;
    const loadTimes = {
      dnsTime: 0, // DNS解析时间
      tcpTime: 0, // TCP建立连接时间
      firstPaintTime: 0, // 白屏时间
      domRenderTime: 0, // dom渲染完成时间
    };
    loadTimes.dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
    loadTimes.tcpTime = timing.connectEnd - timing.connectStart;
    loadTimes.firstPaintTime = timing.responseStart - start;
    loadTimes.domRenderTime = timing.domContentLoadedEventEnd - start;
    return loadTimes;
  }
}
export { Shovel };
