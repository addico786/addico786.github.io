import { images } from "@/data/site";

/**
 * The source used a custom <image-slot> element backed by a JSON state file.
 * Here the slot reads src/data/site.ts: give a key a path and it renders the
 * image, leave it undefined and you get the striped linen placeholder naming
 * what belongs there.
 */
export default function ImageSlot({
  id,
  src: srcProp,
  placeholder,
  alt,
}: {
  id: string;
  src?: string;
  placeholder: string;
  /* what the image shows, for search and screen readers — the placeholder
     text is a design instruction and makes poor alt text */
  alt?: string;
}) {
  /* a project carries its own image; the hero still reads the shared map */
  const src = srcProp ?? images[id];

  return (
    <div className="slot" data-image-slot={id}>
      {src ? (
        <img src={src} alt={alt ?? placeholder} loading="lazy" decoding="async" />
      ) : (
        <span>{placeholder}</span>
      )}
    </div>
  );
}
