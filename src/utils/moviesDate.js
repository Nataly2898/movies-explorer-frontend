export const moviesDate = (time) => {
    const hours = Math.floor(time / 60);
    const min = time % 60;
  
    return `${hours ? `${hours}ч` : ''} ${min ? `${min}м` : ''}`;
  };