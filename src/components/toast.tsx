"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number; // default: 3 seconds
};

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-600 border-green-400"
      : "bg-red-600 border-red-400";

  const Icon = type === "success" ? CheckCircle : XCircle;

  return (
    <div
      className={`fixed top-6 right-6 flex items-center gap-3 text-white px-4 py-3 rounded-lg shadow-lg border ${bgColor} animate-slide-in z-[9999]`}
    >
      <Icon className="w-5 h-5" />
      <p className="font-medium">{message}</p>
    </div>
  );
}
