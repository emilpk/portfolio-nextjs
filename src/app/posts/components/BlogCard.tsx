import type { FC } from "react";
import Image from "next/image";
interface BlogCardProps {
  title: string;
  date: string;
  slug: string;
  coverImage: string;

  key: string;
}

const BlogCard: FC<BlogCardProps> = ({
  title,
  date,
  slug,
  coverImage,
  key,
}) => {
  return (
    <article key={key}>
      <h2>{title}</h2>
      <Image
        src={coverImage}
        alt={title}
        width={500}
        height={300}
        priority={true}
      />
      <p>{slug}</p>
      <p>{date}</p>
    </article>
  );
};

export default BlogCard;
