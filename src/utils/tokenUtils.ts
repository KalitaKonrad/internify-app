import { REFRESH_TOKEN_STORAGE_KEY, TOKEN_STORAGE_KEY } from '../const/auth.const';
import { TOKEN_CHANGED_EVENT } from '../const/events.const';
import { EventBus } from './eventBus';

export const getToken = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }
};

export const setToken = async (token: string) => {
  if (typeof localStorage !== 'undefined') {
    await localStorage.setItem(TOKEN_STORAGE_KEY, token);
    EventBus.emit(TOKEN_CHANGED_EVENT);
  }
};

export const deleteToken = async () => {
  if (typeof localStorage !== 'undefined') {
    await localStorage.removeItem(TOKEN_STORAGE_KEY);
    EventBus.emit(TOKEN_CHANGED_EVENT);
  }
};

export const deleteRefreshToken = async () => {
  if (typeof localStorage !== 'undefined') {
    await localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    EventBus.emit(TOKEN_CHANGED_EVENT);
  }
};
