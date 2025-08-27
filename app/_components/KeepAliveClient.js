"use client";

import { useEffect } from "react";
import { pingKeepAlive } from "../_lib/keepalive";

// Pings once on mount, then every 72 hours. Silent failures only.
export default function KeepAliveClient() {
  useEffect(() => {
    // Run once immediately
    pingKeepAlive();

    // 72 hours in milliseconds
    const intervalMs = 72 * 60 * 60 * 1000;
    const id = setInterval(() => {
      pingKeepAlive();
    }, intervalMs);

    return () => clearInterval(id);
  }, []);

  return null;
}
