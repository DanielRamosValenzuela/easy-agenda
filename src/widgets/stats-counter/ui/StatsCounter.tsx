"use client";

import { useEffect, useState, useRef } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 500, suffix: "+", label: "Clubes Asociados" },
  { value: 50000, suffix: "+", label: "Reservas Realizadas" },
  { value: 10000, suffix: "+", label: "Jugadores Activos" },
  { value: 4, suffix: "", label: "Deportes Disponibles" },
];

function useCountUp(target: number, isVisible: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [target, isVisible]);

  return count;
}

function StatCard({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const count = useCountUp(stat.value, isVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const formatted =
    count >= 1000 ? `${Math.floor(count / 1000).toLocaleString("es-CL")}.${String(count % 1000).padStart(3, "0").slice(0, 3)}` : count.toLocaleString("es-CL");

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-bold text-primary sm:text-5xl">
        {stat.suffix === "+" ? "+" : ""}
        {formatted.replace(/\.000$/, ".000")}
        {stat.suffix === "+" ? "" : stat.suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
    </div>
  );
}

export function StatsCounter() {
  return (
    <section className="border-y border-border/50 bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
