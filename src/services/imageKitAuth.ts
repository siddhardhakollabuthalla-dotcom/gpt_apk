import { createServerFn } from "@tanstack/react-start";

type ImageKitAuthResponse = {
  signature: string;
  token: string;
  expire: number;
};

export const getAuthenticationParametersFn = createServerFn({ method: "GET" })
  .handler(async (): Promise<ImageKitAuthResponse> => {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || "";
    if (!privateKey) {
      throw new Error("IMAGEKIT_PRIVATE_KEY is not configured on the server.");
    }

    // Dynamic import to avoid client-side bundling issues in Vite/Rollup
    const { default: nodeCrypto } = await import("crypto");

    const token = nodeCrypto.randomUUID();
    const expire = Math.floor(Date.now() / 1000) + 1800; // 30 minutes from now

    const signature = nodeCrypto
      .createHmac("sha1", privateKey)
      .update(token + expire.toString())
      .digest("hex");

    return {
      token,
      expire,
      signature,
    };
  });
