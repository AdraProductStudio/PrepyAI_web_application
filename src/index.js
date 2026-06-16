import "@mcp-b/global";

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'Stylesheet/Css/index.css';
import 'Stylesheet/Css/App.css';
import 'Stylesheet/Css/auth.css';
import store from 'StoreIndex';

import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { McpClientProvider } from "@mcp-b/react-webmcp";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { TabClientTransport } from "@mcp-b/transports";

const client = new Client({
  name: "prepyai-voice-agent",
  version: "1.0.0",
});

// const transport = new TabClientTransport("mcp", {
//   clientInstanceId: "prepyai-web",
//   requestTimeout:300000,
// });
// console.log("TRANSPORT KEYS:", Object.keys(transport));
//console.log("TRANSPORT:", transport);

const transport = new TabClientTransport({
  requestTimeout: 300000,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <McpClientProvider client={client} transport={transport}>
        <App />
      </McpClientProvider>
    </Router>
  </Provider>
);
