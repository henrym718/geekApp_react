import { useCallback, useEffect, useRef, useState } from "react";

const useimageLoader = () => {
  const loadImage = useCallback((file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(new Error("Error loading image" + err));
    });
  }, []);

  return { loadImage };
};

const useCanvasDrawer = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const drawImage = useCallback(
    (img: HTMLImageElement, x: number, y: number, scale: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (canvas && ctx && img) {
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = 300 * pixelRatio;
        canvas.height = 300 * pixelRatio;
        canvas.style.width = "300px";
        canvas.style.height = "300px";

        ctx.scale(pixelRatio, pixelRatio);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.beginPath();
        ctx.arc(150, 150, 150, 0, Math.PI * 2);
        ctx.clip();

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        ctx.restore();
      }
    },
    [canvasRef]
  );

  return { drawImage };
};

interface State {
  image: HTMLImageElement | null;
  position: { x: number; y: number };
  isDragging: boolean;
  scale: number;
}

export default function ImageCropper() {
  const [isDragging, setIsDragging] = useState<State["isDragging"]>(false);
  const [image, setImage] = useState<State["image"]>(null);
  const [position, setPosition] = useState<State["position"]>({ x: 0, y: 0 });
  const [scale, setScale] = useState<State["scale"]>(1);
  const [minScale, setMinScale] = useState(1);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { loadImage } = useimageLoader();
  const { drawImage } = useCanvasDrawer(canvasRef);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      try {
        const img = await loadImage(file);
        setImage(img);

        const initialScale = canvasRef.current!.width / img.width;
        setMinScale(initialScale);
        setScale(initialScale);
        setPosition({ x: 0, y: 0 });
        drawImage(img, 0, 0, initialScale);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    }
  };

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (image && isDragging) {
      const canvasRadius = 150;
      const halfImageWidth = (image.width * scale) / 2;
      const halfImageHeight = (image.height * scale) / 2;

      // Calcular los límites de movimiento en función del nivel de zoom
      let newX = position.x + event.movementX;
      let newY = position.y + event.movementY;

      const xMin = canvasRadius - halfImageWidth;
      const xMax = canvasRadius + halfImageWidth - canvasRef.current!.width / 2;

      const yMin = canvasRadius - halfImageHeight;
      const yMax = canvasRadius + halfImageHeight - canvasRef.current!.height / 2;

      // Restringir posición en X si la imagen es más grande que el canvas
      if (halfImageWidth > canvasRadius) {
        newX = Math.min(Math.max(newX, xMin), xMax);
      } else {
        newX = canvasRadius - halfImageWidth;
      }

      // Restringir posición en Y si la imagen es más grande que el canvas
      if (halfImageHeight > canvasRadius) {
        newY = Math.min(Math.max(newY, yMin), yMax);
      } else {
        newY = canvasRadius - halfImageHeight;
      }

      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleOnWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
    const zoomIntensity = 0.0015;
    const newScale = scale + event.deltaY * -zoomIntensity;
    const maxScale = 3;
    const constrainedScale = Math.min(Math.max(newScale, minScale), maxScale);

    if (image && canvasRef.current) {
      const centerX = canvasRef.current.width / 2 / (window.devicePixelRatio || 1);
      const centerY = canvasRef.current.height / 2 / (window.devicePixelRatio || 1);

      const scaleChange = constrainedScale / scale;
      const newPosX = centerX - (centerX - position.x) * scaleChange;
      const newPosY = centerY - (centerY - position.y) * scaleChange;

      setPosition({ x: newPosX, y: newPosY });
      setScale(constrainedScale);
    }
  };

  useEffect(() => {
    image && drawImage(image, position.x, position.y, scale);
  }, [position, scale, image]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return new Error("Error");

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "miimage.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center">
      <input id="file-upload" className="hidden" type="file" accept="image/*" onChange={handleImageUpload} />
      <label htmlFor="file-upload" className="cursor-pointer">
        <p>Sube una imagen para tu perfil</p>
      </label>
      <div className="relative mt-4">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="rounded-full border-2 border-gray-400"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleOnWheel}
        ></canvas>
      </div>
      <button onClick={download}>Descargar</button>
    </div>
  );
}
