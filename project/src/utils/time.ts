export const formatOnlineTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
      return `${remainingMinutes}m`;
    }
    
    return `${hours}h ${remainingMinutes}m`;
  };
  
  export const formatLastAccess = (date: string): string => {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  export const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
  
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    if (hours < 24) {
      return `${hours}h ${remainingMinutes}m`;
    }
  
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
  
    return `${days}d ${remainingHours}h ${remainingMinutes}m`;
  };