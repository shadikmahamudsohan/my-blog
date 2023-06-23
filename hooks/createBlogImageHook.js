import React from 'react';
import imageCompression from "browser-image-compression";

const createBlogImageHook = async (image) => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920
    };
    try {
        const compressedFile = await imageCompression(image[0], options);
        var file = new File([compressedFile], image[0]?.name, {
            type: image[0]?.type,
        });
        const imageFile = new FormData();
        imageFile.append('image', file);


        fetch('/api/upload_image_blog', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
            },
            body: imageFile,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });


    } catch (error) {
        console.log(error);
    }
};

export default createBlogImageHook;