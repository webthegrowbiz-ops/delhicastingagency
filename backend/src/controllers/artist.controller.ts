import type { Response } from "express";
import fs from "node:fs";
import { prisma } from "../config/prisma.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { uploadToCloudinary, isCloudinaryConfigured } from "../services/cloudinary.service.js";
import { normalizeIndianPhone } from "../utils/phone.js";
import { sendProfileSubmittedEmail } from "../services/email.service.js";

// ==========================================
// CREATE / SUBMIT ARTIST PROFILE
// ==========================================

export async function createArtistProfile(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  try {
    // Check authentication
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // Only ARTIST can create artist profile
    if (req.user.role !== "ARTIST") {
      res.status(403).json({
        success: false,
        message: "Only ARTIST users can create an artist profile",
      });
      return;
    }

    const {
      fullName,
      phone,
      gender,
      dateOfBirth,
      city,
      state,
      bio,
      height,
      weight,
      chest,
      waist,
      hips,
      languages,
      skills,
      specialAbilities,
      profilePhoto,
      headshots,
    } = req.body as {
      fullName?: string;
      phone?: string;
      gender?: string;
      dateOfBirth?: string;
      city?: string;
      state?: string;
      bio?: string;
      height?: string;
      weight?: string;
      chest?: string;
      waist?: string;
      hips?: string;
      languages?: string;
      skills?: string;
      specialAbilities?: string;
      profilePhoto?: string;
      headshots?: string;
    };

    // Required field
    if (!fullName?.trim()) {
      res.status(400).json({
        success: false,
        message: "Full name is required",
      });
      return;
    }

    // Check if profile already exists
    const existingProfile = await prisma.artistProfile.findUnique({
      where: {
        userId: req.user.userId,
      },
    });

    if (existingProfile) {
      res.status(409).json({
        success: false,
        message: "Artist profile already exists",
      });
      return;
    }

    // Phone Normalization and Cross-Profile Uniqueness Check
    let normalizedPhone: string | null = null;
    if (phone && typeof phone === "string" && phone.trim() !== "") {
      normalizedPhone = normalizeIndianPhone(phone);
      if (normalizedPhone) {
        const [existingArtistPhone, existingBrandPhone] = await Promise.all([
          prisma.artistProfile.findFirst({ where: { phone: normalizedPhone } }),
          prisma.brandProfile.findFirst({ where: { phone: normalizedPhone } }),
        ]);

        if (existingArtistPhone || existingBrandPhone) {
          res.status(409).json({
            success: false,
            message: "Phone number is already registered.",
          });
          return;
        }
      }
    }

    // Create artist profile
    const profile = await prisma.artistProfile.create({
      data: {
        userId: req.user.userId,

        fullName: fullName.trim(),

        phone: normalizedPhone,
        gender: gender ?? null,

        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,

        city: city ?? null,
        state: state ?? null,

        bio: bio ?? null,

        height: height ?? null,
        weight: weight ?? null,

        chest: chest ?? null,
        waist: waist ?? null,
        hips: hips ?? null,

        languages: languages ?? null,
        skills: skills ?? null,
        specialAbilities: specialAbilities ?? null,

        profilePhoto: profilePhoto ?? null,
        headshots: headshots ?? null,

        verificationStatus: "PENDING_REVIEW",
        submittedAt: new Date(),
      },
    });

    // Send profile submitted confirmation email safely
    const userRec = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { email: true },
    });
    if (userRec?.email) {
      void sendProfileSubmittedEmail({
        to: userRec.email,
        name: profile.fullName,
        role: "ARTIST",
      }).catch((err) => console.error("Profile submitted email delivery error:", err));
    }

    res.status(201).json({
      success: true,
      message: "Profile submitted for DCA verification",
      profile,
    });
  } catch (error) {
    console.error("Create artist profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create artist profile",
    });
  }
}


// ==========================================
// GET ARTIST PROFILE
// ==========================================

export async function getArtistProfile(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  try {
    // Check authentication
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // Only ARTIST can access artist profile
    if (req.user.role !== "ARTIST") {
      res.status(403).json({
        success: false,
        message: "Only ARTIST users can access this profile",
      });
      return;
    }

    // Find profile using logged-in user's ID
    const profile = await prisma.artistProfile.findUnique({
      where: {
        userId: req.user.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!profile) {
      res.status(404).json({
        success: false,
        message: "Artist profile not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Get artist profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch artist profile",
    });
  }
}

// ==========================================
// UPDATE ARTIST PROFILE
// ==========================================

export async function updateArtistProfile(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  try {
    // Check authentication
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // Only ARTIST can update artist profile
    if (req.user.role !== "ARTIST") {
      res.status(403).json({
        success: false,
        message: "Only ARTIST users can update an artist profile",
      });
      return;
    }

    const {
      fullName,
      phone,
      gender,
      dateOfBirth,
      city,
      state,
      bio,
      height,
      weight,
      chest,
      waist,
      hips,
      languages,
      skills,
      specialAbilities,
      profilePhoto,
      headshots,
    } = req.body as {
      fullName?: string;
      phone?: string | null;
      gender?: string | null;
      dateOfBirth?: string | null;
      city?: string | null;
      state?: string | null;
      bio?: string | null;
      height?: string | null;
      weight?: string | null;
      chest?: string | null;
      waist?: string | null;
      hips?: string | null;
      languages?: string | null;
      skills?: string | null;
      specialAbilities?: string | null;
      profilePhoto?: string | null;
      headshots?: string | null;
    };

    // Find existing profile
    const existingProfile = await prisma.artistProfile.findUnique({
      where: {
        userId: req.user.userId,
      },
    });

    if (!existingProfile) {
      res.status(404).json({
        success: false,
        message: "Artist profile not found",
      });
      return;
    }

    // Build update data
    const updateData: {
      fullName?: string;
      phone?: string | null;
      gender?: string | null;
      dateOfBirth?: Date | null;
      city?: string | null;
      state?: string | null;
      bio?: string | null;
      height?: string | null;
      weight?: string | null;
      chest?: string | null;
      waist?: string | null;
      hips?: string | null;
      languages?: string | null;
      skills?: string | null;
      specialAbilities?: string | null;
      profilePhoto?: string | null;
      headshots?: string | null;
      verificationStatus?: "PENDING_REVIEW";
      submittedAt?: Date;
      approvedAt?: Date | null;
    } = {};

    if (fullName !== undefined) {
      if (!fullName.trim()) {
        res.status(400).json({
          success: false,
          message: "Full name cannot be empty",
        });
        return;
      }

      updateData.fullName = fullName.trim();
    }

    if (phone !== undefined) {
      if (phone === null || (typeof phone === "string" && phone.trim() === "")) {
        updateData.phone = null;
      } else {
        const normalizedPhone = normalizeIndianPhone(phone);
        if (normalizedPhone) {
          const [existingArtistPhone, existingBrandPhone] = await Promise.all([
            prisma.artistProfile.findFirst({
              where: {
                phone: normalizedPhone,
                NOT: { userId: req.user.userId },
              },
            }),
            prisma.brandProfile.findFirst({
              where: {
                phone: normalizedPhone,
                NOT: { userId: req.user.userId },
              },
            }),
          ]);

          if (existingArtistPhone || existingBrandPhone) {
            res.status(409).json({
              success: false,
              message: "Phone number is already registered.",
            });
            return;
          }
          updateData.phone = normalizedPhone;
        } else {
          updateData.phone = null;
        }
      }
    }
    if (gender !== undefined) updateData.gender = gender;

    if (dateOfBirth !== undefined) {
      updateData.dateOfBirth = dateOfBirth
        ? new Date(dateOfBirth)
        : null;
    }

    if (city !== undefined) updateData.city = city;
    if (state !== undefined) updateData.state = state;
    if (bio !== undefined) updateData.bio = bio;

    if (height !== undefined) updateData.height = height;
    if (weight !== undefined) updateData.weight = weight;

    if (chest !== undefined) updateData.chest = chest;
    if (waist !== undefined) updateData.waist = waist;
    if (hips !== undefined) updateData.hips = hips;

    if (languages !== undefined) updateData.languages = languages;
    if (skills !== undefined) updateData.skills = skills;

    if (specialAbilities !== undefined) {
      updateData.specialAbilities = specialAbilities;
    }

    if (profilePhoto !== undefined) {
      updateData.profilePhoto = profilePhoto;
    }

    if (headshots !== undefined) {
      updateData.headshots = headshots;
    }

    // If an approved/rejected profile is edited,
    // send it back for admin review.
    if (
      existingProfile.verificationStatus === "APPROVED" ||
      existingProfile.verificationStatus === "REJECTED"
    ) {
      updateData.verificationStatus = "PENDING_REVIEW";
      updateData.submittedAt = new Date();
      updateData.approvedAt = null;
    }

    const profile = await prisma.artistProfile.update({
      where: {
        userId: req.user.userId,
      },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      message: "Artist profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Update artist profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update artist profile",
    });
  }
}

// ==========================================
// UPLOAD ARTIST PHOTOS
// ==========================================

export async function uploadArtistPhotos(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Please log in to upload your profile photo.",
      });
      return;
    }

    if (req.user.role !== "ARTIST") {
      res.status(403).json({
        success: false,
        message: "You do not have permission to update this profile.",
      });
      return;
    }

    const files = req.files as Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
    if (
      !files ||
      (Array.isArray(files) && files.length === 0) ||
      (typeof files === "object" && Object.keys(files).length === 0)
    ) {
      res.status(400).json({
        success: false,
        message: "No image files uploaded",
      });
      return;
    }

    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    const fileList: Express.Multer.File[] = Array.isArray(files)
      ? files
      : Object.values(files).flat();

    // Validate MIME types & File sizes
    for (const file of fileList) {
      if (!allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
        res.status(400).json({
          success: false,
          message: "Please upload a valid JPG, PNG, or WebP image.",
        });
        return;
      }
      if (file.size > maxFileSize) {
        res.status(413).json({
          success: false,
          message: "Image exceeds maximum allowed size of 5MB.",
        });
        return;
      }
    }

    const fileMap: Record<string, string> = {};
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const cloudinaryFolder = `dca/artists/${req.user.userId}`;
    const isConfigured = isCloudinaryConfigured();

    for (const file of fileList) {
      if (isConfigured) {
        try {
          const cldResult = await uploadToCloudinary(file.path, cloudinaryFolder);
          if (cldResult?.url) {
            fileMap[file.fieldname] = cldResult.url;
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          } else {
            if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
            res.status(500).json({
              success: false,
              message: "Cloudinary upload failed to return a secure URL",
            });
            return;
          }
        } catch (err: unknown) {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
          console.error("Cloudinary upload attempt error:", err);
          const errorObj = err as { message?: string; http_code?: number };
          const errorMessage = errorObj?.message || (err instanceof Error ? err.message : String(err));
          res.status(500).json({
            success: false,
            message: `Cloudinary upload failed: ${errorMessage || "Unknown error"}`,
          });
          return;
        }
      } else {
        // Development local fallback ONLY when Cloudinary is genuinely not configured
        if (process.env.NODE_ENV === "production") {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
          res.status(500).json({
            success: false,
            message: "Cloudinary media service is not configured in production environment",
          });
          return;
        }
        fileMap[file.fieldname] = `${baseUrl}/uploads/${file.filename}`;
      }
    }

    res.status(200).json({
      success: true,
      message: "Photos uploaded successfully",
      urls: fileMap,
      storage: isConfigured ? "cloudinary" : "local_fallback",
    });
  } catch (error) {
    console.error("Upload artist photos error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to upload image right now. Please try again.",
    });
  }
}