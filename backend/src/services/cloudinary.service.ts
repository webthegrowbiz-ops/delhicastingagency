import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";

let isSdkConfigured = false;

/**
 * Ensures Cloudinary SDK is initialized if credentials exist in process.env
 */
function ensureCloudinaryConfigured(): boolean {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

  if (cloudName && apiKey && apiSecret) {
    if (!isSdkConfigured) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });
      isSdkConfigured = true;
    }
    return true;
  }
  return false;
}

/**
 * Returns true if Cloudinary credentials are fully configured in process.env
 */
export function isCloudinaryConfigured(): boolean {
  return ensureCloudinaryConfigured();
}

/**
 * Safe status getter for health check endpoints (Does NOT expose secrets)
 */
export function getCloudinaryHealthStatus(): "configured" | "not_configured" {
  return isCloudinaryConfigured() ? "configured" : "not_configured";
}

export interface CloudinaryUploadResult {
  url: string;
  public_id: string;
  bytes: number;
  format: string;
}

/**
 * Uploads a local file or buffer to Cloudinary with automatic optimization.
 */
export async function uploadToCloudinary(
  filePathOrBuffer: string | Buffer,
  folder: string = "dca/artists",
  publicId?: string,
): Promise<CloudinaryUploadResult | null> {
  if (!isCloudinaryConfigured()) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "Cloudinary service credentials missing in production environment",
      );
    }
    return null;
  }

  const options: Record<string, unknown> = {
    folder,
    resource_type: "image",
    overwrite: true,
  };

  if (process.env.CLOUDINARY_UPLOAD_PRESET) {
    options.upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET.trim();
  }

  if (publicId) {
    options.public_id = publicId;
  }

  return new Promise((resolve, reject) => {
    if (typeof filePathOrBuffer === "string") {
      cloudinary.uploader.upload(
        filePathOrBuffer,
        options,
        (error, result?: UploadApiResponse) => {
          if (error || !result) {
            return reject(error || new Error("Cloudinary upload failed"));
          }
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            bytes: result.bytes,
            format: result.format,
          });
        },
      );
    } else {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result?: UploadApiResponse) => {
          if (error || !result) {
            return reject(error || new Error("Cloudinary upload stream failed"));
          }
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            bytes: result.bytes,
            format: result.format,
          });
        },
      );
      uploadStream.end(filePathOrBuffer);
    }
  });
}

/**
 * Safely deletes a Cloudinary asset by public_id.
 */
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  if (!isCloudinaryConfigured() || !publicId) {
    return false;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
}
