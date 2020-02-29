import React from 'react';
import ReactDOM from 'react-dom';
import { set, get } from 'idb-keyval';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();

async function testIDBKeyval() {
    await set('hello', 'world');
    const whatDoWeHave = await get('hello');
    console.log(`When we queried idb-keyval for 'hello', we found: ${whatDoWeHave}`);
}

testIDBKeyval();