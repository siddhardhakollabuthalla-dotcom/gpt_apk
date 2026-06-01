import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-D65QmHBM.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getAuthenticationParametersFn_createServerFn_handler = createServerRpc({
  id: "e53645915faeefe9ec8a5c659425f2bbf5f82db1bdf3dce4274b132f7cb4a596",
  name: "getAuthenticationParametersFn",
  filename: "src/services/imageKitAuth.ts"
}, (opts) => getAuthenticationParametersFn.__executeServer(opts));
const getAuthenticationParametersFn = createServerFn({
  method: "GET"
}).handler(getAuthenticationParametersFn_createServerFn_handler, async () => {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || "";
  if (!privateKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not configured on the server.");
  }
  const {
    default: nodeCrypto
  } = await import("crypto");
  const token = nodeCrypto.randomUUID();
  const expire = Math.floor(Date.now() / 1e3) + 1800;
  const signature = nodeCrypto.createHmac("sha1", privateKey).update(token + expire.toString()).digest("hex");
  return {
    token,
    expire,
    signature
  };
});
export {
  getAuthenticationParametersFn_createServerFn_handler
};
