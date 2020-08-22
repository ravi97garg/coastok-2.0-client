import {
  DEFAULT_STATUS,
  CREATE_AREA_FAILED,
  CREATE_AREA_SUCCESS,
  CREATE_AREA_STARTED,
} from '../constants/area';

export const createAreaStarted = () => (dispatchEvent) => {
  dispatchEvent({
    type: CREATE_AREA_STARTED,
  });
};

export const createAreaSuccess = (areaData) => (dispatchEvent) => {
  dispatchEvent({
    type: CREATE_AREA_SUCCESS,
    payload: areaData,
  });
  setTimeout(() => {
    dispatchEvent({ type: DEFAULT_STATUS });
  }, 3000);
};

export const createAreaFailed = (error) => (dispatchEvent) => {
  dispatchEvent({
    type: CREATE_AREA_FAILED,
    error,
  });
  setTimeout(() => {
    dispatchEvent({ type: DEFAULT_STATUS });
  }, 3000);
};
