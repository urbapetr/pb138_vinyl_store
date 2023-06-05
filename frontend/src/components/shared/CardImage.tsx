type CardImageProps = {
  src: string;
  alt: string;
};

export function CardImage({ src, alt }: CardImageProps) {
  return <img className="object-cover w-full h-full" src={src} alt={alt} />;
}
