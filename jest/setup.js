const fetchPolifill = require('whatwg-fetch')
global.fetch = fetchPolifill.fetch
global.Request = fetchPolifill.Request
global.Headers = fetchPolifill.Headers
global.Response = fetchPolifill.Response
const xhrMockClass = () => ({
    open            : jest.fn()
  , send            : jest.fn()
  , setRequestHeader: jest.fn()
  })
  
  global.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass)