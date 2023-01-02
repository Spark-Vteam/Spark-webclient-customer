const paymentModule = {
  checkStatus: function checkStatus(status: number): string {
    if (status === 10) {
      return 'Invoice is created';
    } else if (status === 20) {
      return 'Invoice is paid';
    } else if (status === 30) {
      return 'Invoice is late';
    } else if (status === 50) {
      return 'Parking';
    } else return 'Invoice is cancelled';
  },
};

export default paymentModule;