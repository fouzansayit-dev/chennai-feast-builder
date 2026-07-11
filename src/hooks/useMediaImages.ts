// src/hooks/useMediaImages.ts
//
// Shared hook: fetches the CRM-managed image map once per session.
// Website components use `getImg(key, fallback)` to get the uploaded URL,
// falling back to the bundled static asset if none has been uploaded yet.

import { useState, useEffect } from "react";
import { mediaAPI } from "@/services/crmApi";

// Module-level cache so multiple components on the same page don't fire duplicate requests
let _cache: Record<string, string> | null = null;
let _loading = true;
let _listeners: Array<(data: Record<string, string>) => void> = [];
let _fetched = false;

function fetchOnce() {
  if (_fetched) return;
  _fetched = true;

  mediaAPI
    .listPublic()
    .then((res) => {
      _cache = res?.data || {};
      _loading = false;
      _listeners.forEach((fn) => fn(_cache!));
      _listeners = [];
    })
    .catch(() => {
      _cache = {};
      _loading = false;
      _listeners.forEach((fn) => fn({}));
      _listeners = [];
    });
}

/**
 * Returns the uploaded media image map from the CRM.
 * Use `getImg(key, fallbackStaticImport)` to resolve an image URL.
 *
 * Example:
 *   const { getImg } = useMediaImages();
 *   <img src={getImg("hero_slide_1", banner2)} />
 */
export function useMediaImages() {
  const [images, setImages] = useState<Record<string, string>>(_cache || {});
  const [loading, setLoading] = useState(_loading);

  useEffect(() => {
    if (_cache !== null) {
      setImages(_cache);
      setLoading(false);
      return;
    }
    _listeners.push((data) => {
      setImages(data);
      setLoading(false);
    });
    fetchOnce();
  }, []);

  /**
   * Returns the CRM-uploaded image URL for `key`, or `fallback` if not set.
   */
  function getImg(key: string, fallback: string): string {
    return images[key] || fallback;
  }

  return { images, loading, getImg };
}
