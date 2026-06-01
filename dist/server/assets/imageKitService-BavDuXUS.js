import ImageKit from "imagekit-javascript";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, a as createServerFn } from "./server-D65QmHBM.js";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getAuthenticationParametersFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("e53645915faeefe9ec8a5c659425f2bbf5f82db1bdf3dce4274b132f7cb4a596"));
const imagekit = new ImageKit({
  publicKey: "public_Sm9E8Osz1rkUyYRlAyM6N/povW0=",
  urlEndpoint: "https://ik.imagekit.io/Siddhardha"
});
const getAuthenticationParameters = async () => {
  return getAuthenticationParametersFn();
};
const uploadSingleImage = async (file, onProgress) => {
  const auth = await getAuthenticationParameters();
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file,
        fileName: `${Date.now()}-${file.name}`,
        signature: auth.signature,
        token: auth.token,
        expire: auth.expire
      },
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        onProgress?.(100);
        resolve(result?.url || "");
      }
    );
  });
};
const uploadMultipleImages = async (files, onProgress) => {
  const urls = [];
  for (let i = 0; i < files.length; i++) {
    const url = await uploadSingleImage(files[i]);
    urls.push(url);
    const progress = Math.round((i + 1) / files.length * 100);
    onProgress?.(progress);
  }
  return urls;
};
export {
  uploadSingleImage as a,
  uploadMultipleImages as u
};
