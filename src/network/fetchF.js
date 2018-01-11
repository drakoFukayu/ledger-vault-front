//@flow
let fetchF;

// path for video demo
const mockAPI = require("../data/mock-api").default;

fetchF = (uri: string, options: Object): Promise<*> =>
  mockAPI(uri, options) || fetch(uri, options);


export default fetchF;
