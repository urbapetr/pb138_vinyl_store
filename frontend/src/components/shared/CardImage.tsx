type CardImageProps = {
  src: string;
  alt: string;
};

export function CardImage({ src, alt }: CardImageProps) {
  return <img className="object-contain w-full h-full" src={src} alt={alt} />;
}
