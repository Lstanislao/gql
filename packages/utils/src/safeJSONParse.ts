export function safeJSONParse(candidate: string) {
  let data: any = {};
  try {
    data = JSON.parse(candidate);
  } catch (err) {
    console.log(err);
  }
  return data;
}
