export const getHoursFromTime = (time: number) => Math.floor(time / 3600)
export const getMinutesFromTime = (time: number) => Math.floor((time % 3600) / 60)
export const getSecondsFromTime = (time: number) => time % 60

const padZero = (num: number) => num.toString().padStart(2, "0");

export const formatTime = (time: number) => {
	const h = getHoursFromTime(time);
	const m = getMinutesFromTime(time);
	const s = getSecondsFromTime(time);

	return `${padZero(h)}:${padZero(m)}:${padZero(s)}`;
}

