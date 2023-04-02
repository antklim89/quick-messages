
const AVATAR_SIZE = 128;


export function resizeImage(imageFile: File) {
    return new Promise<Blob>((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = AVATAR_SIZE;
            canvas.height = AVATAR_SIZE;

            if (img.width > img.height) {
                const width = (img.width / img.height) * AVATAR_SIZE;
                const widthOffset = (width - AVATAR_SIZE) / 2;
                ctx?.drawImage(img, -widthOffset, 0, width, AVATAR_SIZE);
            } else {
                const height = (img.height / img.width) * AVATAR_SIZE;
                const heightOffset = (height - AVATAR_SIZE) / 2;
                ctx?.drawImage(img, 0, -heightOffset, AVATAR_SIZE, height);
            }

            return canvas.toBlob((blob) => {
                if (!blob) throw reject(new Error('Error while converting image.'));
                resolve(blob);
            });
        };
        img.src = URL.createObjectURL(imageFile);
    });
}
