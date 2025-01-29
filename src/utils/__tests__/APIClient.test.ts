import {describe, it, expect, vi, beforeEach, afterEach, Mock} from 'vitest';
import axios from 'axios';
import {fetchImages} from '@/utils/APIClient';

vi.mock('axios');

describe('fetchImages', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('returns images from localStorage when available', async () => {
        const mockStoredImages = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'];
        localStorage.setItem('catImages', JSON.stringify(mockStoredImages));

        const images = await fetchImages(2);
        expect(images).toEqual(mockStoredImages);
    });

    it('fetches new images when localStorage has insufficient images', async () => {
        localStorage.setItem('catImages', JSON.stringify(['https://example.com/image1.jpg']));

        const mockApiResponse = {
            data: [
                {url: 'https://example.com/image2.jpg'},
                {url: 'https://example.com/image3.jpg'},
            ],
        };
        (axios.get as Mock).mockResolvedValue(mockApiResponse);

        const images = await fetchImages(3);

        expect(axios.get).toHaveBeenCalledWith('https://api.thecatapi.com/v1/images/search');
        expect(images).toEqual([
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
            'https://example.com/image3.jpg',
        ]);

        const storedImages = JSON.parse(localStorage.getItem('catImages')!);
        expect(storedImages).toEqual([
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
            'https://example.com/image3.jpg',
        ]);
    });

    it('saves new images to localStorage', async () => {
        const mockApiResponse = {
            data: [
                {url: 'https://example.com/image1.jpg'},
                {url: 'https://example.com/image2.jpg'},
            ],
        };
        (axios.get as Mock).mockResolvedValue(mockApiResponse);

        const images = await fetchImages(2);
        expect(images).toEqual(['https://example.com/image1.jpg', 'https://example.com/image2.jpg']);

        const storedImages = JSON.parse(localStorage.getItem('catImages')!);
        expect(storedImages).toEqual(['https://example.com/image1.jpg', 'https://example.com/image2.jpg']);
    });
});
