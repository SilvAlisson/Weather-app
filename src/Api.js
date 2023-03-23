export const getWeatherData = async (location) => {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&lang=pt_br`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
