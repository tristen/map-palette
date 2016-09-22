// http://stackoverflow.com/questions/25333918/js-deep-map-function 
export function deepMap(obj, f, ctx) {
  if (Array.isArray(obj)) {
    return obj.map(function(val, key) {
      return (typeof val === 'object') ? deepMap(val, f, ctx) : f.call(ctx, val, key);
    });
  } else if (typeof obj === 'object') {
    var res = {};
    for (var key in obj) {
      var val = obj[key];
      if (typeof val === 'object') {
        res[key] = deepMap(val, f, ctx);
      } else {
        res[key] = f.call(ctx, val, key);
      }
    }
    return res;
  } else {
    return obj;
  }
}
