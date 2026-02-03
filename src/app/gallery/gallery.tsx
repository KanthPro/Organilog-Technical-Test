import "./gallery.css";

import { map } from "lodash";

interface GalleryProps {
  images: string[];
}

export const Gallery = ({ images }: GalleryProps) => {
  return (
    <div className="gallery">
      {map(images, (img, index) => (
        <img key={index} src={img} style={{ maxWidth: "50px" }} />
      ))}
    </div>
  );
};
