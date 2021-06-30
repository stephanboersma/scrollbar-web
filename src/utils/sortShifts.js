export const sortShifts = (a, b) => {
  if (a.start > b.start) {
    return 1;
  } else if (a.start < b.start) {
    return -1;
  } else {
    return 0;
  }
};
