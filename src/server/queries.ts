import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";
import { utapi } from "./uploadthing";

export const getMyImages = async () => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized!");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
};

export const getImage = async (id: number) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized!");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found");
  if (image.userId !== user.userId) throw new Error("Unauthorized!");
  return image;
};

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) {
    throw new Error("Image not found");
  }
  const extractedPart = image.url.split("/f/")[1];
  if (!extractedPart) throw new Error("Image Url Not Found");

  const deleteFileInUploadthingServer = await utapi.deleteFiles(extractedPart);
  console.log(deleteFileInUploadthingServer);

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });
  revalidatePath("/");
  redirect("/");
}
