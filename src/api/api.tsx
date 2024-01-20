export type APOD = {
  copyright: string,
  date: string,
  explanation: string,
  hdurl: string,
  media_type: string,
  service_version: string,
  title: string,
  url: string,
}

export type ApiDateParams = {
  start: string | null,
  end: string | null
}

const BASE_URL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
}

export function getImage(date: ApiDateParams): Promise<APOD[]> {
  return new Promise((resolve, reject) => {
    if (date.start === null) {
      resolve([]);
      return;
    }

    fetch(`${BASE_URL}&start_date=${date.start}${date.end !== null ? `&end_date=${date.end}` : `&end_date=${date.start}`}`, options)
      .then((result) => {
        resolve(result.json());
      })
      .catch(() => {
        reject();
      });
  });
}
