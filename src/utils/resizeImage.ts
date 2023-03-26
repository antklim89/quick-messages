

export function resizeImage(imageFile: File) {
    return new Promise<Blob>((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = 128;
            canvas.height = 128;

            ctx?.drawImage(img, 0, 0, 128, 128);

            // const dataurl = canvas.toDataURL(imageFile.type);
            // console.log('===== \n dataurl', dataurl);

            return canvas.toBlob((blob) => {
                if (!blob) throw reject(new Error('Error while converting image.'));
                resolve(blob);
            });
        };
        img.src = URL.createObjectURL(imageFile);
    });
}
