import { skillsList } from "@/lib/content";

const ROW_1 = skillsList;
const ROW_2 = [...skillsList].reverse();

export function Marquee() {
  return (
    <div className="overflow-hidden border-t border-border py-10">
      <MarqueeRow items={ROW_1} direction="left" />
      <MarqueeRow items={ROW_2} direction="right" className="mt-4" />
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  className,
}: {
  items: string[];
  direction: "left" | "right";
  className?: string;
}) {
  const doubled = [...items, ...items];
  const animationClass =
    direction === "left"
      ? "animate-[marquee-left_28s_linear_infinite]"
      : "animate-[marquee-right_32s_linear_infinite]";

  return (
    <div
      className={`flex w-max gap-10 whitespace-nowrap ${animationClass} ${className ?? ""}`}
    >
      {doubled.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="font-display text-2xl uppercase tracking-tight text-muted md:text-4xl"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
