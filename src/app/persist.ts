import type { AppState } from "./store";
import { debounce } from "lodash";

type PersistConfig = {
  key: string;
  storage: Storage;
  version: number;
};

type PersistedState = {
  _config: {
    version: number;
  };
  state: Partial<AppState>;
};

export const createPersist = (config: PersistConfig) => {
  const storageKey = `${config.key}:${config.version}`;

  const subscribe = (getState: () => AppState) =>
    debounce(
      () =>
        savePersistedState(
          config.storage,
          storageKey,
          config.version,
          getState(),
        ),
      200,
    );

  return {
    loadState: () =>
      loadPersistedState(config.storage, storageKey, config.version),
    subscribe,
  };
};

const parsePersistedState = (raw: string, version: number) => {
  const parsed = JSON.parse(raw) as PersistedState;

  if (!parsed?.state || parsed._config?.version !== version) {
    return undefined;
  }

  return parsed.state;
};

const loadPersistedState = (
  storage: Storage,
  storageKey: string,
  version: number,
): Partial<AppState> | undefined => {
  try {
    const raw = storage.getItem(storageKey);

    if (raw) {
      return parsePersistedState(raw, version);
    }

    return undefined;
  } catch {
    return undefined;
  }
};

const savePersistedState = (
  storage: Storage,
  storageKey: string,
  version: number,
  state: AppState,
) => {
  try {
    const payload: PersistedState = {
      _config: { version },
      state,
    };

    storage.setItem(storageKey, JSON.stringify(payload));
  } catch (error) {
    console.warn("Persist save failed:", error);
  }
};
