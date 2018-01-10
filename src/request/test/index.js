import test from 'ava';
import sinon from 'sinon';
import myFetch from '../index';

const URI = 'http://me';
const MODE = 'cors';
const HEADERS = {
  'Accept': 'application/json',
  'Content-type': 'application/json'
};
const handleError = t => e => {
  t.is(e.name, 'FetchError');
}

test.beforeEach('provide spy on "fetch"', t => {
  t.context.spy = sinon.spy(global, 'fetch');
});

test.afterEach('restore spy on "fetch"', t => {
  t.context.spy.restore();
});

test('methods exist', t => {
  t.is(typeof myFetch.get, 'function', 'Should have "get" method');
  t.is(typeof myFetch.post, 'function', 'Should have "post" method');
  t.is(typeof myFetch.put, 'function', 'Should have "put" method');
  t.is(typeof myFetch.delete, 'function', 'Should have "delete" method');
});

test('.get()', t => {
  myFetch.get(URI).catch(handleError(t));
  t.true(t.context.spy.calledWith(URI, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  }))
});

test('.get() with some header', t => {
  myFetch.get(URI, {
    headers: {
      extra: {
        'Custom-Header': 'custom-header'
      }
    }
  }).catch(handleError(t));
  t.true(t.context.spy.calledWith(URI, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Custom-Header': 'custom-header'
    }
  }))
});

test('.post() with token', t => {
  myFetch.post(URI, {
    headers: {
      token: 'myToken'
    }
  }).catch(handleError(t));
  t.true(t.context.spy.calledWith(URI, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': 'Bearer myToken'
    }
  }))
});

test('.put() with body', t => {
  myFetch.put(URI, {
    headers: {
      token: 'myToken'
    },
    body: {
      a: 1
    }
  }).catch(handleError(t));
  t.true(t.context.spy.calledWith(URI, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': 'Bearer myToken'
    },
    body: '{"a":1}'
  }))
});

test('.delete()', t => {
  myFetch.delete(URI).catch(handleError(t));
  t.true(t.context.spy.calledWith(URI, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  }))
});