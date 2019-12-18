export function conversionData(data) {
  for (let i = 0; i < data.length; i++) {
    data[i].key = data[i]._id;
  }
  return data;
}
