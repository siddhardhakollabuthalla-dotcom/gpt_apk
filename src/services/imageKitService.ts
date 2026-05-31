import ImageKit from "imagekit-javascript";
import { getAuthenticationParametersFn } from "./imageKitAuth";

const imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
});

type ImageKitAuthResponse = {
  signature: string;
  token: string;
  expire: number;
};

const getAuthenticationParameters = async (): Promise<ImageKitAuthResponse> => {
  const authEndpoint = import.meta.env.VITE_IMAGEKIT_AUTH_ENDPOINT;

  if (authEndpoint && authEndpoint.trim() !== "" && authEndpoint !== "/api/imagekit-auth") {
    const response = await fetch(authEndpoint);

    if (!response.ok) {
      throw new Error("Failed to get ImageKit authentication parameters");
    }

    return (await response.json()) as ImageKitAuthResponse;
  }

  return getAuthenticationParametersFn();
};

export const uploadSingleImage = async (file: File, onProgress?: (progress: number) => void) => {
  const auth = await getAuthenticationParameters();

  return new Promise<string>((resolve, reject) => {
    imagekit.upload(
      {
        file,
        fileName: `${Date.now()}-${file.name}`,
        signature: auth.signature,
        token: auth.token,
        expire: auth.expire,
      },
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        onProgress?.(100);

        resolve(result?.url || "");
      },
    );
  });
};

export const uploadSingleImageRobust = async (
  file: File,
  onProgress?: (progress: number) => void,
): Promise<string> => {
  // 1. Try ImageKit
  try {
    const authEndpoint = import.meta.env.VITE_IMAGEKIT_AUTH_ENDPOINT;
    const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
    if (publicKey) {
      const url = await uploadSingleImage(file, onProgress);
      if (url) return url;
    }
  } catch (err) {
    console.warn("ImageKit upload failed, trying Firebase Storage...", err);
  }

  // 2. Try Firebase Storage
  try {
    const { storage } = await import("@/firebase/config");
    const { uploadImage: uploadToFirebase } = await import("./imageService");
    if (storage) {
      onProgress?.(50);
      const url = await uploadToFirebase(file);
      onProgress?.(100);
      return url;
    }
  } catch (err) {
    console.warn("Firebase Storage upload failed, falling back to base64...", err);
  }

  // 3. Fallback to Base64 (Local Data URL)
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onProgress?.(100);
      resolve(reader.result as string);
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};

export const uploadMultipleImages = async (
  files: File[],
  onProgress?: (progress: number) => void,
) => {
  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const url = await uploadSingleImage(files[i]);

    urls.push(url);

    const progress = Math.round(((i + 1) / files.length) * 100);

    onProgress?.(progress);
  }

  return urls;
};

export const uploadMultipleImagesRobust = async (
  files: File[],
  onProgress?: (progress: number) => void,
): Promise<string[]> => {
  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const url = await uploadSingleImageRobust(files[i]);

    urls.push(url);

    const progress = Math.round(((i + 1) / files.length) * 100);

    onProgress?.(progress);
  }

  return urls;
};

export const deleteImage = async (fileId: string) => {
  const response = await fetch(`${import.meta.env.VITE_IMAGEKIT_AUTH_ENDPOINT}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileId }),
  });

  return response.json();
};

