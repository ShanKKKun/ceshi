/**
 * 开发与生产环境的基本参数
 */
export const DEV_BASE_ORIGIN = 'https://cdds30.hubeta.com'; // 开发环境接口域名前缀
export const IS_DEV = process.env.NODE_ENV === 'production';
export const ORIGIN = IS_DEV ? window.location.origin : DEV_BASE_ORIGIN;

/**
 * 接口请求配置
 */
export const REQUEST_TIMEOUT = 8000; // 接口超时时限
export const NEED_AUTH = false; // 是否需要接口鉴权
export const AUTH_HEADER_NAME = 'Authorization'; // 鉴权字段名
export const tipList = { // 返回码所对应的提示语
  '-1': '查无数据',
};

/**
 *  loading 配置
 */
export const LOADING_DELAY = 600; // loading显示阈值
export const LOADING_DURATION = 500; // loading显示持续时间
export const DURATION_TOP_LIMIT = 12000; // loading显示时间上限，超过此时长清除

/**
 *  本地sessionId缓存字段设置
 */
export const STORAGE_KEY_SESSION = 'sessionIdZKTC';

/**
 *  是否开放礼品功能
 */
export const ENABLE_GIFTS = false;

/**
 *  登录白名单，该列表中的页面可使用游客身份访问。注：此处使用对象存储给页面名单生成索引，方便查询。
 */
export const WHITE_PAGE_LIST = {
  home: true,
  index: true,
  production: true,
  login: true,
  cart: true,
  center: true,
  register: true,
  follow: true,
  debug: true,
};

/**
 *  登录页
 */
export const ENABLE_PASSWORD = false; // 开放用户名密码登录
export const RECODE_DELAY = 60; // 再次获取验证码时间间隔，单位秒
export const ENABLE_THIRD = false; // 是否开放第三方登录

/**
 *  debug后门页面
 */
export const ENABLE_DEBUG_TOOLS = true; // 是否开启debug工具页面
const date = new Date();
export const DEBUG_PSD = `cdkj${date.getMonth() + 1}${date.getDate()}`; // 开启调试页面的密码
