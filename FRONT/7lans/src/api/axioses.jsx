import axios from "axios";
import getEnv from "../utils/getEnv"

const urlInfo = getEnv('API_URL')


export const getMeetingDetail = async (meetingId) => {
  try {
    const response = await axios.get(`${urlInfo}/meetingSchedue/${meetingId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const postMeetingImage = async (meetingId, meetingImagePath) => {
  try {
    const response = await axios.post(`${urlInfo}/meetingImage/save`, { meetingId, meetingImagePath });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}