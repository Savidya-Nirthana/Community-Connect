import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

export const useMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.VITE_BASE_MAP_API_KEY}`,
    libraries,
  });
  return { isLoaded, loadError };
};
