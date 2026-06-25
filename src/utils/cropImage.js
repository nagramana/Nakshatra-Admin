export default async function getCroppedImg(
  imageSrc,
  pixelCrop
) {

  const image =
    document.createElement("img");

  image.src = imageSrc;

  await new Promise(
    resolve =>
      image.onload = resolve
  );

  const canvas =
    document.createElement("canvas");

  canvas.width = 800;
  canvas.height = 800;

  const ctx =
    canvas.getContext("2d");

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    800,
    800
  );

  return new Promise(resolve => {

    canvas.toBlob(blob => {

      resolve(
        new File(
          [blob],
          "cropped.jpg",
          {
            type: "image/jpeg"
          }
        )
      );

    }, "image/jpeg");

  });

}