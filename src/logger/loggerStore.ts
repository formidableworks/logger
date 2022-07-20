import create from 'zustand/vanilla';
import { SplunkLogEvent } from './logger.types';

const postToSplunk = async (splunklogEvents: SplunkLogEvent[]): Promise<string[]> => {
  let forwardedIds: string[] = [];
  if (splunklogEvents.length < 1) return forwardedIds;
  try {
    const { VITE_SPLUNK_HEC_URL, VITE_SPLUNK_HEC_TOKEN } = import.meta.env;
    // odd http body format documented here ( there is no enveloping array):
    // https://docs.splunk.com/Documentation/Splunk/8.2.2/Data/FormateventsforHTTPEventCollector#Example_3:_Batched_data
    const body = splunklogEvents
      .map(({ time, host, source, event }) => ({ time, host, source, event })) // only inc permitted keys.
      .map((event) => JSON.stringify(event))
      .join('');
    const response = await fetch(VITE_SPLUNK_HEC_URL, {
      method: 'post',
      body,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Splunk ${VITE_SPLUNK_HEC_TOKEN}`,
      },
    });
    if (response.ok) {
      forwardedIds = splunklogEvents.map((e) => e.local_id);
    } else {
      // eslint-disable-next-line no-console
      console.error('postToSplunk unexpected response', response);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('postToSplunk network failure', error);
  }
  return forwardedIds;
};

interface LoggerState {
  events: SplunkLogEvent[];
  forwardedEventIds: string[];
  addEntry: (event: SplunkLogEvent) => void;
  forwardEventsToSplunk: () => void;
}
export const loggerStore = create<LoggerState>()((set, get) => ({
  events: [],
  forwardedEventIds: [],
  addEntry: (event) => set((state) => ({ events: [...state.events, event] })),
  forwardEventsToSplunk: async () => {
    const notForwardedEvents = get().events.filter(
      (e) => !get().forwardedEventIds.includes(e.local_id)
    );
    const forwardedIds = await postToSplunk(notForwardedEvents);
    set((state) => ({ forwardedEventIds: [...state.forwardedEventIds, ...forwardedIds] }));
  },
}));

export const { getState: getLoggerState } = loggerStore;
