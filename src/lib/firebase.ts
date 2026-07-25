import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Values are read from environment variables — see .env.example.
// Create a `.env.local` file with your Firebase project credentials.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/**
 * True only when every required Firebase env var has been supplied. Auth and
 * Firestore calls will otherwise fail with cryptic SDK errors (e.g.
 * `auth/invalid-api-key`) — this flag lets the UI surface a clear,
 * actionable message instead (see AuthContext's `mapFirebaseError`).
 */
export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => typeof value === "string" && value.length > 0
);

if (!isFirebaseConfigured && import.meta.env.DEV) {
  const missing = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  // eslint-disable-next-line no-console
  console.warn(
    `[FlexCore] Missing Firebase configuration: ${missing.join(", ")}. ` +
      "Copy .env.example to .env.local and fill in your Firebase project credentials, then restart the dev server."
  );
}

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
// Storage can be unavailable in some contexts (e.g. private browsing, embedded
// iframes) — swallow the rejection so it never surfaces as an unhandled
// promise rejection; auth will simply fall back to in-memory persistence.
auth.setPersistence(browserLocalPersistence).catch(() => {
  console.warn("[FlexCore] Could not persist auth session to local storage; falling back to in-memory session.");
});

export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
