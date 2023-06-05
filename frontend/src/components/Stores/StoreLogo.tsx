type StoreLogoProps = {
  src: string;
  alt: string;
};

export function StoreLogo({ src, alt }: StoreLogoProps) {
  return <img className="object-contain h-full" src={src} alt={alt} />;
}
