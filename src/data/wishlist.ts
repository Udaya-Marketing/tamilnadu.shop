export interface WishlistSnapshot {
  ids: string[];
  loaded: boolean;
}

const STORAGE_KEY = "tamilnadu_wishlist";
const SERVER_SNAPSHOT: WishlistSnapshot = { ids: [], loaded: false };
const listeners = new Set<() => void>();
let currentSnapshot: WishlistSnapshot | null = null;

function readWishlist(): WishlistSnapshot {
  if (currentSnapshot) return currentSnapshot;

  let ids: string[] = [];
  try {
    const savedWishlist = localStorage.getItem(STORAGE_KEY);
    if (savedWishlist) {
      const parsedWishlist: unknown = JSON.parse(savedWishlist);
      if (Array.isArray(parsedWishlist) && parsedWishlist.every((id) => typeof id === "string")) {
        ids = parsedWishlist;
      } else {
        console.error("Saved wishlist data is invalid.");
      }
    }
  } catch (error) {
    console.error("Failed to load wishlist:", error);
  }

  currentSnapshot = { ids, loaded: true };
  return currentSnapshot;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function handleStorageChange(event: StorageEvent) {
  if (event.key !== STORAGE_KEY && event.key !== null) return;

  let ids: string[] = [];
  if (event.newValue) {
    try {
      const parsedWishlist: unknown = JSON.parse(event.newValue);
      if (Array.isArray(parsedWishlist) && parsedWishlist.every((id) => typeof id === "string")) {
        ids = parsedWishlist;
      } else {
        console.error("Saved wishlist data is invalid.");
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }

  currentSnapshot = { ids, loaded: true };
  notifyListeners();
}

export function subscribeToWishlist(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener("storage", handleStorageChange);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", handleStorageChange);
    }
  };
}

export function getWishlistSnapshot() {
  return readWishlist();
}

export function getServerWishlistSnapshot() {
  return SERVER_SNAPSHOT;
}

export function toggleWishlistProduct(productId: string) {
  const currentIds = readWishlist().ids;
  const ids = currentIds.includes(productId)
    ? currentIds.filter((id) => id !== productId)
    : [...currentIds, productId];

  currentSnapshot = { ids, loaded: true };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error("Failed to save wishlist:", error);
  }
  notifyListeners();
}
