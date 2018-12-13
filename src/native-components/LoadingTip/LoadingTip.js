import { LOADING_DELAY, LOADING_DURATION, DURATION_TOP_LIMIT } from '@/config';
/* eslint-disable */

const LoadingTip = function (content = '加载中...', bindEl) {
  if (!(this instanceof LoadingTip)) {
    return new LoadingTip();
  }
  this.content = content;
  // 创建loading元素
  this.element = document.createElement('div');
  this.element.className = 'loading-wrap';
  this.element.innerHTML = `
            <div class="loading-mask"></div>
            <div class="loading-content">
                <div class="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p class="loading-tip">${this.content}</p>
            </div>
        </div>
    `;

  this.timer = null;
  this.destroyTimer = null; // 达到时间上限后清除loading
  this.startTime = null;
  this.LOADING_DELAY = LOADING_DELAY;
  this.LOADING_DURATION = LOADING_DURATION;
  this.DURATION_TOP_LIMIT = DURATION_TOP_LIMIT;
  this.loadingList = {};

  LoadingTip.prototype.init = function init(element) {
    this.bindElement = element || document.body;
    this.bindElement.appendChild(this.element);
    return this;
  };

  this.init(bindEl);
};

const fadeIn = (el) => {
  el.style.display = 'block';
  el.style.opacity = 1;
};

const fadeOut = (el) => {
  el.style.opacity = 0;
  setTimeout(() => {
    el.style.display = 'none';
  }, 800);
};

LoadingTip.prototype.show = function show(id) {
  if (!id) {
    console.warn('展示loading时需要指定id');
    return false;
  }
  const date = new Date();
  this.startTime = date.getTime();
  this.loadingList[id] = true;
  if (this.element.style.display !== 'block') {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      fadeIn(this.element);
      this.destroyTimer = setTimeout(() => {
        fadeOut(this.element);
      }, this.DURATION_TOP_LIMIT);
    }, this.LOADING_DELAY);
  }
  return this;
};

LoadingTip.prototype.hide = function hide(id) {
  if (!id) {
    console.warn('取消loading时需要指定id');
    return false;
  }
  if (this.loadingList[id]) {
    delete this.loadingList[id];
  }
  const date = new Date();
  const durationTime = date.getTime() - this.startTime;
  if (JSON.stringify(this.loadingList) !== '{}') {
    return false;
  }
  if (durationTime < this.LOADING_DELAY) { // 未达到loading的显示阈值时，清空定时器
    clearTimeout(this.timer);
    this.startTime = null;
    return this;
  }
  if (durationTime - this.LOADING_DELAY < this.LOADING_DURATION) {
    const restTime = this.LOADING_DURATION - durationTime; // 计算剩余应显示时间，并设置定时器在该时间后再调用关闭
    setTimeout(() => {
      this.hide(id);
    }, restTime);
    return false;
  }
  fadeOut(this.element);
  clearTimeout(this.destroyTimer);
  this.destroyTimer = null;
  this.startTime = null;
  return this;
};

export default LoadingTip;
