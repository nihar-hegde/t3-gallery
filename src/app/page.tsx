import { db } from "~/server/db";
export const dynamic = "force-dynamic";

const mockUrl = [
  "https://utfs.io/f/41f930aa-3881-4dc8-bf26-7acf7a6c7af3-mytqph.png",
  "https://utfs.io/f/b31fb7ef-f3a0-4b01-acd4-e2a31148d21d-mytqqc.png",
  "https://utfs.io/f/caff3b54-c6cf-475c-a37f-dbad1aaa1ac5-dqz4bk.jpeg",
  "https://utfs.io/f/29fabb98-7c70-4f9c-a6f3-9629837d6e85-dqyhc1.jpeg",
];

const mockImages = mockUrl.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div className="w-48" key={image.id}>
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
