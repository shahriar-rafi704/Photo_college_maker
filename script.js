document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById("upload-form");
    const makeCollageButton = document.getElementById("make-collage");
    const collageCanvas = document.getElementById("collage-canvas");
    const collageWrapper = document.getElementById("collage-wrapper");
    const downloadButton = document.getElementById("download-button");
    const ctx = collageCanvas.getContext("2d");
    let collageDataURL = null; // Store the collage data URL

    makeCollageButton.addEventListener("click", makeCollage);
    downloadButton.addEventListener("click", downloadCollage);

    function makeCollage() {
        const photo1 = document.getElementById("photo1").files[0];
        const photo2 = document.getElementById("photo2").files[0];
        const photo3 = document.getElementById("photo3").files[0];

        if (!photo1 || !photo2) {
            alert("Please upload at least two photos.");
            return;
        }

        const img1 = new Image();
        const img2 = new Image();
        const img3 = new Image();

        img1.onload = function () {
            img2.src = URL.createObjectURL(photo2);
        };

        img2.onload = function () {
            if (photo3) {
                img3.src = URL.createObjectURL(photo3);
            }
        };

        img3.onload = function () {
            const maxWidth = collageWrapper.clientWidth;
            const maxHeight = collageWrapper.clientHeight;

            const collageWidth = img1.width + img2.width + (img3.width || 0);
            const collageHeight = Math.max(img1.height, img2.height, img3.height || 0);

            const scale = Math.min(maxWidth / collageWidth, maxHeight / collageHeight);

            collageCanvas.width = collageWidth * scale;
            collageCanvas.height = collageHeight * scale;

            ctx.clearRect(0, 0, collageCanvas.width, collageCanvas.height);

            ctx.drawImage(img1, 0, 0, img1.width * scale, img1.height * scale);
            ctx.drawImage(img2, img1.width * scale, 0, img2.width * scale, img2.height * scale);

            if (img3.src) {
                ctx.drawImage(img3, (img1.width + img2.width) * scale, 0, img3.width * scale, img3.height * scale);
            }

            collageDataURL = collageCanvas.toDataURL(); // Store collage data URL
        };

        img1.src = URL.createObjectURL(photo1);
    }

    function downloadCollage() {
        if (collageDataURL) {
            const a = document.createElement("a");
            a.href = collageDataURL;
            a.download = "collage.png";
            a.click();
        }
    }
});