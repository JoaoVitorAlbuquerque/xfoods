export function formatDate(date: Date) {
  return Intl.DateTimeFormat('pt-br',).format(date);
}

// export function formatDate(date: Date) {
//   const day = new Intl.DateTimeFormat('pt-br', { day: 'numeric' }).format(date);
//   const month = new Intl.DateTimeFormat('pt-br', { month: 'short' }).format(date);
//   return `${day} de ${month}`;
// }
