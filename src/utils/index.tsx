export const daysLeft = (deadline: number) => {
    const endAt = deadline;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const differenceInSeconds = endAt - currentTimeInSeconds;
    const daysLeft = Math.ceil(differenceInSeconds / 86400);
    // console.log(daysLeft);

    return daysLeft;
};
