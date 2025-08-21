/**
 * Utility function to generate responsive Pexels image URLs
 * @param pexelsId - The numeric ID from the Pexels URL (e.g., "1170412" from "pexels-photo-1170412.jpeg")
 * @param width - The desired width for the image
 * @returns Optimized Pexels image URL
 */
export const getPexelsImageUrl = (pexelsId: string, width: number): string => {
  return `https://images.pexels.com/photos/${pexelsId}/pexels-photo-${pexelsId}.jpeg?auto=compress&cs=tinysrgb&w=${width}&dpr=1`;
};

/**
 * Generate responsive image sources for Pexels images
 * @param pexelsId - The numeric ID from the Pexels URL
 * @returns Object with different sized image URLs
 */
export const getPexelsResponsiveImages = (pexelsId: string) => {
  return {
    small: getPexelsImageUrl(pexelsId, 480),
    medium: getPexelsImageUrl(pexelsId, 800),
    large: getPexelsImageUrl(pexelsId, 1200)
  };
};