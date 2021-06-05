const qs = (obj: any): string => {
  var list = [] as any[];
  return 'object' == typeof obj && null !== obj && Object.keys(obj).map(it), list.join('&');
  function it(key: string) {
    var val = obj[key];
    if (null != val && !(val instanceof Function)) {
      var pair = encodeURIComponent(key) + '=' + encodeURIComponent(val);
      list.push(pair);
    }
  }
};
export default qs;
