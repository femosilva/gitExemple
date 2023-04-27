const bannerElementSup = [
  document.querySelector("#fotos_cabecalhos_sup1"),
  document.querySelector("#fotos_cabecalhos_sup2"),
  document.querySelector("#fotos_cabecalhos_sup3"),
  document.querySelector("#fotos_cabecalhos_sup4"),
];

const bannerElementInf = [
  document.querySelector("#fotos_cabecalhos_inf1"),
  document.querySelector("#fotos_cabecalhos_inf2"),
  document.querySelector("#fotos_cabecalhos_inf3"),
  document.querySelector("#fotos_cabecalhos_inf4"),
];
const changeImageInterval = 4000;

function preloadImages(images) {
  const promises = [...images].map((img, i) => {
    const { src } = new Image();
    return new Promise((resolve, reject) => {
      const onload = () => {
        images[i].img = src;
        resolve();
      };
      const onerror = reject;
      const imgObj = { src, onload, onerror };
      imgObj.src = img;
    });
  });
  return Promise.all(promises);
}

function startBanner(bannerImages, bannerElements) {
  let bannerIndex = 0;
  setInterval(() => {
    const { name } = images[bannerIndex];
    bannerElements.forEach((element) => {
      element.style.backgroundImage = `url(${name.src})`;
    });
    bannerIndex = (bannerIndex + 1) % bannerImages.length;
  }, changeImageInterval);
}

async function initBanner() {
  const images = await fetch("/json/banner.json").then((res) => res.json());
  await preloadImages(images);
  startBanner(images, bannerElementSup);
  startBanner(images, bannerElementInf);
}

initBanner();
