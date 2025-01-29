import axios from "axios";
import {APICatImage} from "@/types/APICatImage.ts";

export const fetchImages = async (numImages: number): Promise<string[]> => {
    console.log('fetching images')
    const storedImages = JSON.parse(localStorage.getItem('catImages') || '[]');
    if (storedImages.length >= numImages) {
        return storedImages.slice(0, numImages);
    }

    const response = await axios.get(`https://api.thecatapi.com/v1/images/search`);
    const newImages = response.data.map((img: APICatImage) => img.url);
    console.log(newImages);

    const updatedImages = [...storedImages, ...newImages];
    localStorage.setItem('catImages', JSON.stringify(updatedImages));

    return updatedImages.slice(0, numImages);
};