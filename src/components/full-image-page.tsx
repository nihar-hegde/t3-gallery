import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { Id: number }) {
  const image = await getImage(props.Id);

  return <img src={image.url} alt={image.name} className="w-96" />;
}
