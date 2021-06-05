const mapSeries = (iterable: any, mapper: any): Promise<any> => {
  var reducer: any;
  var initial: any;
  return Promise.all(iterable).then(
    ((reducer = (results: any, value: any, key: any, values: any) =>
      Promise.resolve(value)
        .then((resolved) => mapper(resolved, key, values))
        .then((resolved) => (results.push(resolved), results))),
    (initial = []),
    (iterable) =>
      iterable.reduce(
        (chain: Promise<any>, value, key) => chain.then((results) => reducer(results, value, key, iterable)),
        Promise.resolve(initial),
      )),
  );
};
export default mapSeries;
