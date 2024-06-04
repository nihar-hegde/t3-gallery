//import { Modal } from "./modal";

import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = parseInt(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid id");

  const image = await getImage(idAsNumber);

  return (
    <div>
      <img src={image.url} alt={image.name} className="w-96" />
    </div>
  );
}
