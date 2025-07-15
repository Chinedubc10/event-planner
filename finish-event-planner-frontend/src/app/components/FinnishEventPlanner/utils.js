export const isWithinFiveDays = (dateString) => {
  const eventDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 5;
};

export const findForecastForDate = (forecasts, targetDate) => {
  const target = new Date(targetDate).setHours(12, 0, 0, 0);
  return forecasts.find((f) => {
    const forecastDate = new Date(f.dt_txt).setHours(12, 0, 0, 0);
    return forecastDate === target;
  });
};
