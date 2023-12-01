/** Min and Max included */
export const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

export const clearObject = (obj: { [key: string]: unknown }) => Object.keys(obj).forEach(key => delete obj[key])
