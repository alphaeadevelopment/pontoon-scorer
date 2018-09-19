export default js => JSON.stringify(js).replace(/</g, '\\u003c');
