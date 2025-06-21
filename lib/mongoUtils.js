export function convertDocToPlainObject(doc) {
  if (!doc) return null;
  
  const converted = { ...doc };
  if (doc._id) {
    converted._id = doc._id.toString();
  }
  return converted;
}