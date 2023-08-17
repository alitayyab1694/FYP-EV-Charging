export const RESERVATION_STATUS = {
  Completed: 'Completed',
  Expired: 'Expired',
  Pending: 'Pending',
  Rejected: 'Rejected'
};
export const RESERVE_NOW = {
  started: 'Reservation has been made.',
  faulted:
    'Reservation has not been made, because connectors or specified connector are in a faulted state',
  occupied:
    'Reservation has not been made. All connectors or the specified connector are occupied.',
  notConfigured:
    'Reservation has not been made. C harge Point is not configured to accept reservations.',
  unavailable:
    'Reservation has not been made, because connectors or specified connector are in an unavailable state.',
  wrongRequest: 'Reservation request was sent but something went wrong'
};
