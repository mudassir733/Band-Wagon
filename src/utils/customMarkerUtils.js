export const createCustomMarkerBitmap = async ({
    imagePath,
    glowSize = 3,
    glowColor = "rgba(0, 255, 0, 0.5)",
    imageScale = 40,
    stemLength = 20,
    stemWidth = 28,
    stemColor = "rgba(0, 255, 0, 0.8)",
}) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const canvasWidth = 120;
    const canvasHeight = 150 + stemLength;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Draw the glow effect
    context.fillStyle = glowColor;
    context.shadowBlur = glowSize;
    context.shadowColor = glowColor;
    const glowCenterX = canvasWidth / 2;
    const glowCenterY = 50;
    context.beginPath();
    context.arc(glowCenterX, glowCenterY, imageScale / 2 + glowSize, 0, Math.PI * 2);
    context.fill();

    // Load and draw the image
    const image = await loadImage(imagePath);
    const imageX = (canvasWidth - imageScale) / 2;
    const imageY = glowCenterY - imageScale / 2;
    context.drawImage(image, imageX, imageY, imageScale, imageScale);

    // Draw the stem
    const stemBaseY = glowCenterY + imageScale / 2 + glowSize;
    const stemTipY = stemBaseY + stemLength;
    const halfStemWidth = stemWidth / 2;
    context.fillStyle = stemColor;
    context.beginPath();
    context.moveTo(glowCenterX - halfStemWidth, stemBaseY);
    context.lineTo(glowCenterX, stemTipY);
    context.lineTo(glowCenterX + halfStemWidth, stemBaseY);
    context.closePath();
    context.fill();

    return canvas.toDataURL(); // Convert canvas to data URL for marker icon
};

const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Enable CORS for cross-origin images
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = src;
    });
};
