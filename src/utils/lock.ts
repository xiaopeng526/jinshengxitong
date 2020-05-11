class Lock {
  private key = false;
  constructor() {}
  lock() {
    if (this.key) {
      return false;
    }
    this.key = true;
    return true;
  }
  unlock() {
    this.key = false;
  }
  autoUnlockLater() {
    if (this.key) {
      setTimeout(() => {
        this.key = false;
      }, 500);
    }
  }
  isLocked() {
    return this.key;
  }
}
export const innerLock = new Lock();

const LockPlugin: any = {};
LockPlugin.install = function(Vue: any) {
  Vue.prototype.$lock = innerLock;
};

export default LockPlugin;
